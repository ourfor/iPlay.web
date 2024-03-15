export async function download(url: string, path: string) {
    const response = await fetch(url)
    const buffer = await response.arrayBuffer()
    Deno.writeFileSync(path, new Uint8Array(buffer))
}

export async function touch(path: string, content = '') {
    const i = path.lastIndexOf('/')
    let dir = path
    if (i != -1) {
        dir = path.substring(0, i)
    }
    await Deno.mkdir(dir, { recursive: true })
    await Deno.writeTextFile(path, content, { create: true })
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
    request
}