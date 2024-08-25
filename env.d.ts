declare global {
    namespace NodeJS {
        interface ProcessEnv {
            UPSTOX_AUTH_CLIENT_ID: string;
            UPSTOX_AUTH_REDIRECT_URL: string;
            UPSTOX_AUTH_CLIENT_SECRET: string;
        }
    }
}

export {}