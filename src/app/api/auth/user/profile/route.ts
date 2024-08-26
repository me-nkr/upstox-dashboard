import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";


export async function GET(request: NextRequest) {

    const session_id = cookies().get("session")?.value;
    
    if (!session_id) return new NextResponse("401 Unathorized", { status: 401 });

    const redis = new Redis({
        url: process.env.UPSTASH_SESSION_REDIS_ENDPOINT,
        token: process.env.UPSTASH_SESSION_REDIS_SECRET,
    })
    
    const access_token = await redis.hget(session_id, "access_token")
    
    if (!access_token) return new NextResponse("401 Unathorized", { status: 401 });
    
    const user = await fetch("https://api.upstox.com/v2/user/profile", {
        headers: {
            "Authorization": "Bearer " + access_token,
            "Accept": "application/json"
        }
    })
    .then(response => response.json())
    .then(json => json);
    
    return NextResponse.json(user);

}
