import { redirect, RedirectType } from "next/navigation";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";


export async function GET(request: NextRequest) {
    
    const code = request.nextUrl.searchParams.get("code");
    const state = request.nextUrl.searchParams.get("state");
    
    if (!code || !state) return new NextResponse("400 Bad request", { status: 400 });
    if (state !== "samplesecurestate") return new NextResponse("403 Forbidden", { status: 403 });
    
    const session_id = randomString(20);
    
    const { access_token }: { access_token: string } = await fetch(process.env.UPSTOX_AUTH_TOKEN_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json"
        },
        body: new URLSearchParams({
            code: code,
            client_id:  process.env.UPSTOX_AUTH_CLIENT_ID,
            client_secret: process.env.UPSTOX_AUTH_CLIENT_SECRET,
            redirect_uri: process.env.UPSTOX_AUTH_REDIRECT_URL,
            grant_type: "authorization_code"
        })
    })
    .then(response => response.json())
    .then(json => json);
    
    const redis = new Redis({
        url: process.env.UPSTASH_SESSION_REDIS_ENDPOINT,
        token: process.env.UPSTASH_SESSION_REDIS_SECRET,
    })
    
    await redis.hset(session_id, {
        session_id,
        access_token
    })
    
    cookies().set("session", session_id);
    redirect("/dashboard", RedirectType.replace);
    
}

function randomString(length: number) {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}