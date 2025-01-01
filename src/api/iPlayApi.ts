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

export interface SiteModel {
    id: string
    remark: string
    type: string
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

export interface AddNewSiteModel {
    type: string,
    remark: string,
    data: string
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

    async getAllSites() {
        if (!this.server) return;
        const url = new URL(this.server)
        url.pathname = "/sites"
        const res = await fetch(url, {
            headers: {
                "Authorization": `Basic ${btoa(`${this.username}:${this.password}`)}`
            }
        })
        return await res.json() as Response<SiteModel[]>
    }

    async getAllAlbums(siteId = "1") {
        if (!this.server) return;
        const url = new URL(this.server)
        url.pathname = "/media/albums"
        url.searchParams.set("id", `${siteId}`)
        const res = await fetch(url, {
            headers: {
                "Authorization": `Basic ${btoa(`${this.username}:${this.password}`)}`
            }
        })
        return await res.json() as Response<AlbumModel[]>
    }

    async getLatestAlbumMedia(album: AlbumModel) {
        if (!this.server) return;
        const url = new URL(this.server)
        url.pathname = `/media/album/${album.id}`
        url.searchParams.set("siteId", album.parentId)
        const res = await fetch(url, {
            headers: {
                "Authorization": `Basic ${btoa(`${this.username}:${this.password}`)}`
            }
        })
        return await res.json() as Response<MediaModel[]> 
    }

    async addNewSite(model: AddNewSiteModel) {
        if (!this.server) return;
        const url = new URL(this.server)
        url.pathname = `/sites`
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Basic ${btoa(`${this.username}:${this.password}`)}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(model)
        })
        return await res.json() as Response<object> 
    }
}