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

export default {
    download,
    touch
}