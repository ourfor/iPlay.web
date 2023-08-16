import { User } from "@model/User";
import { View } from "@model/View";
import { emby, makeUrl } from "./config";
import { Media } from "@model/Media";
import { MediaDetail } from "@model/MediaDetail";
import { Season } from "@model/Season";
import { EmbyResponse } from "@model/EmbyResponse";
import { Episode } from "@model/Episode";

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
        "X-Emby-Token": user.AccessToken,
        "X-Emby-Language": "zh-cn"
    }
    const uid = user.User.Id
    const url = makeUrl(params, `emby/Users/${uid}/Items/Latest`)
    const response = await fetch(url)
    const data = await response.json() as Media[]
    return data
}

export async function getMedia(user: User, id: number) {
    const params = {
        "X-Emby-Client": "Emby Web",
        "X-Emby-Device-Name": "Microsoft Edge macOS",
        "X-Emby-Device-Id": "feed8217-7abd-4d2d-a561-ed21c0b9c30e",
        "X-Emby-Client-Version": "4.7.13.0",
        "X-Emby-Token": user.AccessToken,
        "X-Emby-Language": "zh-cn"
    }
    const uid = user.User.Id
    const url = makeUrl(params, `emby/Users/${uid}/Items/${id}`)
    const response = await fetch(url)
    const data = await response.json() as MediaDetail
    return data
}

export async function getSeasons(user :User, id: number) {
    const params = {
        UserId: user.User.Id,
        Fields: "BasicSyncInfo,CanDelete,Container,PrimaryImageAspectRatio",
        EnableTotalRecordCount: false,
        "X-Emby-Client": "Emby Web",
        "X-Emby-Device-Name": "Microsoft Edge macOS",
        "X-Emby-Device-Id": "feed8217-7abd-4d2d-a561-ed21c0b9c30e",
        "X-Emby-Client-Version": "4.7.13.0",
        "X-Emby-Token": user.AccessToken,
        "X-Emby-Language": "zh-cn"
    }
    const url = makeUrl(params, `emby/Shows/${id}/Seasons`)
    const response = await fetch(url)
    const data = await response.json() as EmbyResponse<Season>
    return data.Items
}

export async function getEpisodes(user: User, vid: number, sid: number) {
    const params = {
        UserId: user.User.Id,
        SeasonId: sid,
        Fields: "Overview,PrimaryImageAspectRatio",
        EnableTotalRecordCount: false,
        "X-Emby-Client": "Emby Web",
        "X-Emby-Device-Name": "Microsoft Edge macOS",
        "X-Emby-Device-Id": "feed8217-7abd-4d2d-a561-ed21c0b9c30e",
        "X-Emby-Client-Version": "4.7.13.0",
        "X-Emby-Token": user.AccessToken,
        "X-Emby-Language": "zh-cn"
    }
    const url = makeUrl(params, `emby/Shows/${vid}/Episodes`)
    const response = await fetch(url)
    const data = await response.json() as EmbyResponse<Episode>
    return data.Items
}