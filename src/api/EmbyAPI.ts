import { User } from "@model/User";
import { playbackInfo } from "./play";
import { getMedia } from "./view";

export class EmbyAPI {
    private _user?: User;
    get user() {
        if (!this._user) throw Error("user can't be null")
        return this._user;
    }
    set user(user: User) {
        this._user = user
        this.bind()
    }

    constructor(user?: User) {
        this._user = user
        this.bind()
    }

    bind() {
        this.getMedia = getMedia.bind(this, this.user)
    }

    public getPlaybackInfo = this._user ? playbackInfo.bind(this, this.user) : null
    public getMedia = this._user ? getMedia.bind(this, this.user) : null
}

export const Api = {
    emby: null as EmbyAPI|null
};