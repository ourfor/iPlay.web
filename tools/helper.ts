import { dirname } from "https://deno.land/std@0.220.0/path/mod.ts";
import { sleep } from "https://deno.land/x/sleep/mod.ts"

export async function download(url: string, path: string) {
    const response = await fetch(url)
    const buffer = await response.arrayBuffer()
    const dir = dirname(path)
    Deno.mkdirSync(dir, { recursive: true })
    Deno.writeFileSync(path, new Uint8Array(buffer), { create: true })
}

export function touch(path: string, content = '') {
    const dir = dirname(path)
    Deno.mkdirSync(dir, { recursive: true })
    Deno.writeTextFileSync(path, content, { create: true })
}

async function request<T>(uri: string) {
    const url = `https://proxyall.endemy.me${uri}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        "X-HOST": "api.themoviedb.org"
      }
    };
    
    try {
        const response = await fetch(url, options)
        const data = await response.json() as T
        return data
    } catch (err) {
        console.error(err)
    }
    return null 
}

export default {
    download,
    touch,
    request,
    sleep
}