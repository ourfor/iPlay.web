import { imageUrl, playUrl } from "@api/config"
import { PlaybackInfo } from "@model/PlaybackInfo"
import 'vidstack/styles/defaults.css';
import 'vidstack/styles/community-skin/video.css';
import { MediaCommunitySkin, MediaOutlet, MediaPlayer, MediaPoster } from '@vidstack/react';


export interface PlayerProps {
    vid: string | number
    model: PlaybackInfo
}

export function Player({ vid, model }: PlayerProps) {
    const source = {
        type: "video",
        title: model.MediaSources[0].Name,
        sources: model.MediaSources.map(item => ({
            src: item.Path.startsWith("http") ? item.Path : playUrl(item.DirectStreamUrl),
            title: item.Name,
            type: "video/mp4"
        })),
        poster: imageUrl(String(vid ?? ""), { maxWidth: 1920, maxHeight: 1080 }, "Backdrop/0")
    }
    return (
        <MediaPlayer
            title={source.title}
            src={source.sources}
            poster={source.poster}
            // thumbnails="https://media-files.vidstack.io/sprite-fight/thumbnails.vtt"
            aspectRatio={16 / 9}
            crossorigin=""
            >
            <MediaOutlet>
                <MediaPoster alt="Girl walks into sprite gnomes around her friend on a campfire in danger!" />
                {/* {source.sources.map((media, i) => <source key={`source-${i}`} type={media.type} src={media.src} />)} */}
                {/* <track
                    src="https://media-files.vidstack.io/sprite-fight/subs/english.vtt"
                    label="English"
                    srcLang="en-US"
                    kind="subtitles"
                    default
                /> */}
            </MediaOutlet>
            <MediaCommunitySkin />
        </MediaPlayer>

    )
}