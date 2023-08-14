interface LoginResponse {
    AccessToken: string
    ServerId: string
    User: {
        Name: string
        Id: String
        ServerId: string

    }
}

export async function login(username: string, password: string) {
    const response = await fetch("https://media.endeny.me/emby/Users/authenticatebyname?X-Emby-Client=Emby%20Web&X-Emby-Device-Name=Microsoft%20Edge%20macOS&X-Emby-Device-Id=feed8217-7abd-4d2d-a561-ed21c0b9c30e&X-Emby-Client-Version=4.7.13.0&X-Emby-Language=zh-cn", {
        "headers": {
          "accept": "application/json",
          "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Microsoft Edge\";v=\"114\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"macOS\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin"
        },
        "referrer": "https://media.endeny.me/web/index.html",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": `Username=${username}&Pw=${password}`,
        "method": "POST",
        "mode": "cors",
        "credentials": "omit"
      });
    const data = await response.json() as LoginResponse
    return data
}