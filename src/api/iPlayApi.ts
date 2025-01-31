import { Media } from "@model/Media"

export interface ActorModel {
    id: string
    name: string
    avatar: string
}

export interface ImageModel {
    primary: string,
    backdrop: string,
    logo: string
}
export interface AlbumModel {
    id: string
    parentId: string
    name: string

    image: ImageModel
}

export interface SiteModel {
    id: string
    remark: string
    type: string
}

export interface SourceModel {
    name: string;
    type: string;
    url: string;
}

export interface MediaModel {
    id: string
    siteId: string
    type: string
    parentId: string
    title: string
    description: string
    actors: ActorModel[]
    sources?: SourceModel[]
    
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

    async getAllAlbums(siteId = "-1") {
        if (!this.server) return;
        const url = new URL(this.server)
        url.pathname = "/media/albums"
        url.searchParams.set("siteId", `${siteId}`)
        const res = await fetch(url, {
            headers: {
                "Authorization": `Basic ${btoa(`${this.username}:${this.password}`)}`
            }
        })
        return await res.json() as Response<AlbumModel[]>
    }

    async getMedia(siteId = "-1", id: string) {
        if (!this.server) return;
        const url = new URL(this.server)
        url.pathname = "/media/detail"
        url.searchParams.set("siteId", `${siteId}`)
        url.searchParams.set("id", `${id}`)
        const res = await fetch(url, {
            headers: {
                "Authorization": `Basic ${btoa(`${this.username}:${this.password}`)}`
            }
        })
        let result = await res.json() as Response<MediaModel>
        result.data?.sources?.forEach(source => {
            if (source.url.startsWith("/")) {
                source.url = `${this.server}${source.url}`
            }
        }) 
        return result;
    }

    async getMediaSource(siteId = "-1", id: string) {
        if (!this.server) return;
        const url = new URL(this.server)
        url.pathname = "/media/source"
        url.searchParams.set("siteId", `${siteId}`)
        url.searchParams.set("id", `${id}`)
        const res = await fetch(url, {
            headers: {
                "Authorization": `Basic ${btoa(`${this.username}:${this.password}`)}`
            }
        })
        let sources =  await res.json() as Response<SourceModel[]>
        sources.data?.forEach(source => {
            if (source.url.startsWith("/")) {
                source.url = `${this.server}${source.url}`
            }
        })
        return sources
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

    async search(keyword: string, siteId = -1) {
        if (!this.server) return;
        const url = new URL(this.server)
        url.pathname = `/media/search`
        url.searchParams.set("keyword", keyword)
        url.searchParams.set("siteId", siteId.toString())
        const res = await fetch(url, {
            headers: {
                "Authorization": `Basic ${btoa(`${this.username}:${this.password}`)}`
            }
        })
        return await res.json() as Response<MediaModel[]>  
    }

    async getConfig(key: string) {
        if (!this.server) return;
        const url = new URL(this.server)
        url.pathname = `/config`
        url.searchParams.set("key", key)
        const res = await fetch(url, {
            headers: {
                "Authorization": `Basic ${btoa(`${this.username}:${this.password}`)}`
            }
        })
        return await res.json() as Response<string>
    }

    async setConfig(key: string, value: string) {
        if (!this.server) return;
        const url = new URL(this.server)
        url.pathname = `/config`
        const res = await fetch(url, {
            headers: {
                "Authorization": `Basic ${btoa(`${this.username}:${this.password}`)}`,
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                key,
                value
            })
        })
        return await res.json() as Response<string>
    }
}