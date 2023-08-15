import { User } from "@model/User";
import { View } from "@model/View";

export async function viewByUser(user: User) {
    const token = user.AccessToken
    const uid = user.User.Id
    const did = "feed8217-7abd-4d2d-a561-ed21c0b9c30e"
    const response = await fetch(`https://media.endeny.me/emby/Users/${uid}/Views?X-Emby-Client=Emby%20Web&X-Emby-Device-Name=Microsoft%20Edge%20macOS&X-Emby-Device-Id=${did}&X-Emby-Client-Version=4.7.13.0&X-Emby-Token=${token}&X-Emby-Language=zh-cn`);
    const data = await response.json() as View
    return data
}