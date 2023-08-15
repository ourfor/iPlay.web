import { Info } from "@model/Info"

export async function publicInfo() {
    const response = await fetch("https://media.endeny.me/emby/system/info/public", {
        "method": "GET"
    })
    const info = await response.json() as Info
    return info
}