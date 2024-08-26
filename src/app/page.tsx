import { NextPage } from "next";
import LinkButton from "@/components/LinkButton";

const Home: NextPage  = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <LinkButton
        content="Login with Upstox"
        href="https://api.upstox.com/v2/login/authorization/dialog"
        query={new Map([
          ["client_id", process.env.UPSTOX_AUTH_CLIENT_ID],
          ["redirect_uri", process.env.UPSTOX_AUTH_REDIRECT_URL],
          ["response type", "code"],
          ["state", "samplesecurestate"]
        ])}
      />
    </main>
  );
}

export default Home;