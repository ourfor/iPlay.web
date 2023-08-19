import { usePromise } from "@hook/usePromise"
import { Episode } from "@model/Episode"
import style from "./Episode.module.scss"
import { imageUrl, playUrl } from "@api/config"
import { Api } from "@api/emby"
import { ExternalPlayer } from "./ExternalPlayer"
import { InternalPlayer } from "./InternalPlayer"
import { Select } from "antd"
import { useEffect, useState } from "react"

export function EpisodeCard(episode: Episode) {
    const { data } = usePromise(() => Api.emby?.getPlaybackInfo?.(Number(episode.Id)), [episode.Id])
    const sources = data?.MediaSources.map(item => ({label: item.Name, value: item.DirectStreamUrl}))
    const [source, setSource] = useState<string|null>(null)
    useEffect(() => {
        if (sources) setSource(sources[0].value)
    }, [data, sources])
    return (
        <div className={style.card}>
        <div className={style["root"]} 
            key={episode.Id}>
            <img src={imageUrl(episode.Id, episode.ImageTags.Primary)} />
            <div className={style.text}>
                <span className={style.title}>{episode.Name}</span>
                <article className={style.overview}>{episode.Overview}</article>
                <div className={style["action"]}>
                    <div className={style["source-select"]}>
                    {sources && <Select size="small"
                            style={{minWidth: "5rem", fontSize: "0.75rem"}}
                            onChange={e => setSource(e)}
                            defaultValue={sources[0].value} options={sources} />}
                    </div>
                    <div className={style["players"]}>
                        <InternalPlayer id={episode.Id} />
                        {source && <ExternalPlayer src={playUrl(source)} />}
                    </div>
                </div>
            </div>
        </div>
        <article className={style.mobileOverview}>{episode.Overview}</article>
        </div>
    )
}

export interface EpisodeListProps {
    vid: string
    sid: string
}
export function EpisodeList(props: EpisodeListProps) {
    const {data} = usePromise(() => Api.emby?.getEpisodes?.(Number(props.vid), Number(props.sid)), [props.sid, props.vid])
    if (!data) return null
    return (
        <div>
            {data.map(episode => <EpisodeCard key={episode.Id} {...episode} />)}
        </div>
    )
}