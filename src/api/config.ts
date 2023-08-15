import { Map } from "@model/Map";

export const emby = {
    host: "media.endeny.me",
    protocol: "https",
    port: 443
}

export function makeUrl(params: Map<string, any>, path: string) {
    const url = new URL(`${emby.protocol}://${emby.host}/${path}`)
    Object.entries(params).forEach(([key, value]) => {
        if (typeof value === "string") {
            url.searchParams.set(key, value)
        } else {
            url.searchParams.set(key, String(value))
        }
    })
    return url
}

export function imageUrl(id: string, etag: string, type: "Primary" = "Primary") {
    return `${emby.protocol}://${emby.host}/emby/Items/${id}/Images/${type}?maxHeight=338&maxWidth=600&tag=${etag}&quality=90`
}

export function avatorUrl(id: string, etag: string, type: "Primary" = "Primary") {
    return `${emby.protocol}://${emby.host}/emby/Users/${id}/Images/${type}?height=152&tag=${etag}&quality=90`
}