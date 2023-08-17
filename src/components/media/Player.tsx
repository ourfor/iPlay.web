import { imageUrl, playUrl } from "@api/config"
import Plyr from "plyr-react"
import "plyr-react/plyr.css"
import { PlaybackInfo } from "@model/PlaybackInfo"

export interface PlayerProps {
    vid: string|number
    model: PlaybackInfo
}

export function Player({vid, model}: PlayerProps) {
    const source: Plyr.SourceInfo = {
        type: "video",
        sources: model.MediaSources.map(item => ({
            src: playUrl(item.DirectStreamUrl),
            title: item.Name,
        })),
        poster: imageUrl(String(vid ?? ""), {maxWidth: 1920, maxHeight: 1080})
        // sources: []
    }
    const options: Plyr.Options = {
        autoplay: true
    }
    return (
        <Plyr source={source} options={options} />
    )
}