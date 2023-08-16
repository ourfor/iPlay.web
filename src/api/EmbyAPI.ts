import { User } from "@model/User";
import { playbackInfo } from "./play";

class EmbyAPI {
    private user!: User;

    constructor(user: User) {
        this.user = user
    }

    public getPlaybackInfo = playbackInfo.bind(this, this.user,)
}