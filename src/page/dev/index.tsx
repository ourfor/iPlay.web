import { useEffect, useState } from "react"
import style from "./index.module.scss"
import { Spin } from "@components/animation/Spin"
import { Button, TextField } from "@radix-ui/themes"

export default function Page() {
    const [videoUrl, setVideoUrl] = useState("")
    const play = () => {
        try {
            const source = videoUrl;
            const video_url = source;
            const audio_url = source;
            const url = "iplay://play/any";
            const video = new URL(url);
            const origin = new URL(window.location.href).origin;
            const http_option = {
                "demuxer-lavf-o": `headers=Referer:${origin}`,
                "http-header-fields": `Referer:${origin}`
            };
            const extra = {
                "Referer": origin
            };
            video.searchParams.set("option", JSON.stringify(http_option));
            video.searchParams.set("source", JSON.stringify({
                "video": video_url,
                "audio": audio_url,
                "extra": extra
            }));
            // for mobile: window.bridge.postMessage
            // for desktop: window.chrome.webview.postMessage
            const bridge = (window.chrome as any).webview
            bridge.postMessage(JSON.stringify({
                "type": "play",
                "data": video.href
            }));
        } catch (error) {
            if (`${error}`.includes("postMessage")) {
                window.location.reload();
            }
        }
    }
    return (
        <div className={style.page}>
            <div className={style.container}>
                <div className={style.title}>视频播放</div>
            <TextField.Input
                        className={style["input"]}
                        required
                        id="outlined-required"
                        placeholder="请输入视频地址"
                        // label="Username"
                        value={videoUrl}
                        onChange={e => setVideoUrl(e.target.value)}
                        // sx={customStyle}
                    />
            <Button className={style["action"]}
                onClick={play}
                variant="soft">
                播放
            </Button>
            </div>
        </div>
    )
}