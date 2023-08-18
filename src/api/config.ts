import { Map } from "@model/Map";

export const config = {
    host: "media.endeny.me",
    protocol: "https",
    port: 443
}

export function makeUrl(params: Map<string, any>|null, path: string) {
    const url = new URL(`${config.protocol}://${config.host}/${path}`)
    params && Object.entries(params).forEach(([key, value]) => {
        if (typeof value === "string") {
            url.searchParams.set(key, value)
        } else {
            url.searchParams.set(key, String(value))
        }
    })
    return url
}

export interface ImageProps {
    maxHeight: number
    maxWidth: number
    tag: string
    quality: number
}

export function imageUrl(id: string|number, options: string|Partial<ImageProps>, type: "Primary"|string = "Primary") {
    if (typeof options === "string") {
        return `${config.protocol}://${config.host}/emby/Items/${id}/Images/${type}?maxHeight=338&maxWidth=600&tag=${options}&quality=90`
    } else {
        const url = new URL(`${config.protocol}://${config.host}/emby/Items/${id}/Images/${type}`)
        Object.entries(options).forEach(([key, value]) => {
            url.searchParams.set(key, String(value))
        })
        return url.href
    }
}

export function avatorUrl(id: string, options: string|Partial<ImageProps>, type: "Primary" = "Primary") {
    return `${config.protocol}://${config.host}/emby/Users/${id}/Images/${type}?height=152&tag=${options}&quality=90`
}

export function playUrl(path: string) {
    return `${config.protocol}://${config.host}/emby${path}`
}