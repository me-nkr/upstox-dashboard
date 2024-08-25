import { NextPage } from "next";

type RedirectProps = {
    searchParams: {
        code: string;
    } & Record<string, string | string[] | undefined>
}

const Redirect: NextPage<RedirectProps> = ({ searchParams }) => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <span>{ searchParams.code }</span>
        </main>
    );
}

export default Redirect;