"use client"

import { useRouter } from "next/navigation"

type LoginButtonProps = {
    content: string;
    href: string;
    query?: Map<string, string>
}

export default function LinkButton({ content, href, query }: LoginButtonProps): JSX.Element {
    const router = useRouter();
    let queryString = "?";

    if (query) {
        for (let [key, value] of query) {
            queryString += key + "=" + value + "&";
        }
    }

    return (
        <button className="bg-[#5A2989] text-white font-bold px-4 py-2 rounded-full"
            onClick={() => router.push(href + queryString)}
        >{content}</button>
    )
}