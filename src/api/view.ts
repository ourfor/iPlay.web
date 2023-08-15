import { User } from "@model/User";
import { View } from "@model/View";
import { emby, makeUrl } from "./config";
import { Media } from "@model/Media";

export async function viewByUser(user: User) {
    const token = user.AccessToken
    const uid = user.User.Id
    const did = "feed8217-7abd-4d2d-a561-ed21c0b9c30e"
    const params = {
        "X-Emby-Device-Id": did,
        "X-Emby-Token": token,
        "X-Emby-Language": "zh-cn"
    }
    const url = makeUrl(params, `emby/Users/${uid}/Views`)
    const response = await fetch(url);
    const data = await response.json() as View
    return data
}

export async function latestMedia(user: User, parentId: number) {
    const params = {
        Limit: 16,
        Fields: "BasicSyncInfo,CanDelete,Container,PrimaryImageAspectRatio,ProductionYear,Status,EndDate",
        ImageTypeLimit: 1,
        EnableImageTypes: "Primary,Backdrop,Thumb",
        ParentId: parentId,
        "X-Emby-Client": "Emby Web",
        "X-Emby-Device-Name": "Microsoft Edge macOS",
        "X-Emby-Device-Id": "feed8217-7abd-4d2d-a561-ed21c0b9c30e",
        "X-Emby-Client-Version": "4.7.13.0",
        "X-Emby-Token": "59bfbb27bbb04f89aa1f1c021ab303a5",
        "X-Emby-Language": "zh-cn"
    }
    const uid = user.User.Id
    const url = makeUrl(params, `emby/Users/${uid}/Items/Latest`)
    const response = await fetch(url)
    const data = await response.json() as Media[]
    return data
}