export interface AlbumModel {
    id: string
    parentId: string
    name: string

    image: {
        primary: string,
        backdrop: string,
        logo: string
    }
}

export interface MediaModel {
    id: string
    type: string
    parentId: string
    title: string

    image: {
        primary: string,
        backdrop: string,
        logo: string
    }
}

export interface Response<T> {
    code: number
    msg: string
    data?: T
}

export class iPlayApi {
    server: string | undefined;
    username: string | undefined
    password: string | undefined

    public constructor(server: string, username: string, password: string) {
        this.server = server;
        this.username = username;
        this.password = password;
    }

    async getAllAlbums() {
        if (!this.server) return;
        const url = new URL(this.server)
        url.pathname = "/media/albums"
        url.searchParams.set("id", "1")
        const res = await fetch(url)
        return await res.json() as Response<AlbumModel[]>
    }

    async getLatestAlbumMedia(album: AlbumModel) {
        if (!this.server) return;
        const url = new URL(this.server)
        url.pathname = `/media/album/${album.id}`
        url.searchParams.set("siteId", album.parentId)
        const res = await fetch(url)
        return await res.json() as Response<MediaModel[]> 
    }
}