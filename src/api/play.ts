import { User } from "@model/User";
import { makeUrl } from "./config";
import { PlaybackInfo } from "@model/PlaybackInfo";

export async function playbackInfo(user: User, id: number) {
    const params = {
        StartTimeTicks: 0,
        IsPlayback: true,
        AutoOpenLiveStream: true,
        MaxStreamingBitrate: 140000000,
        UserId: user.User.Id,
        "X-Emby-Client": "Emby Web",
        "X-Emby-Device-Name": "Microsoft Edge macOS",
        "X-Emby-Device-Id": "feed8217-7abd-4d2d-a561-ed21c0b9c30e",
        "X-Emby-Client-Version": "4.7.13.0",
        "X-Emby-Token": user.AccessToken,
        "X-Emby-Language": "zh-cn"
    }
    const url = makeUrl(params, `emby/Items/${id}/PlaybackInfo`)
    const response = await fetch(url, {method: "POST"})
    return await response.json() as PlaybackInfo
}