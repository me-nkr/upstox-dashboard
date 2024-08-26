import { NextPage } from "next";
import { cookies } from "next/headers";

const Dashboard: NextPage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <span>{"the cookie: " + cookies().get("testcookie")?.value}</span>
        </main>
    )
}

export default Dashboard;