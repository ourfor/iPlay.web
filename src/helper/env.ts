export interface EmbyConfig {
    host: string
    protocol: "http"|"https"
    port: number
    path: string
}

export interface Env {
    emby: EmbyConfig
}

export const ENV: Env = {
    emby: {
        host: process.env.REACT_APP_EMBY_HOST ?? "127.0.0.1",
        port: Number(process.env.REACT_APP_EMBY_PORT) ?? 443,
        protocol: process.env.REACT_APP_EMBY_PROTOCOL as any ?? "https",
        path: process.env.REACT_APP_EMBY_PATH ?? "/"
    }
}