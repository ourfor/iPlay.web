import { usePromise } from "@hook/usePromise"
import { Episode } from "@model/Episode"
import style from "./Episode.module.scss"
import { imageUrl, playUrl } from "@api/config"
import { Api } from "@api/emby"
import { ExternalPlayer } from "./ExternalPlayer"
import { InternalPlayer } from "./InternalPlayer"
import { MouseEvent, useEffect, useMemo, useState } from "react"
import { Select } from "@radix-ui/themes"
import { logger } from "@helper/log"
import { Image } from "@components/base/Image"

const stopEvent = (e: MouseEvent) => e.stopPropagation()

export function EpisodeCard(episode: Episode) {
    const { data } = usePromise(() => Api.emby?.getPlaybackInfo?.(Number(episode.Id)), [episode.Id])
    const sources = useMemo(() => 
        data?.MediaSources.map(item => ({
            label: item.Name, 
            value: item.Path.startsWith("http") ? item.Path : item.DirectStreamUrl
        })), [data])
    const [source, setSource] = useState<string|null>(null)
    useEffect(() => {
        if (sources) setSource(sources?.[0].value)
        logger.info("sources", sources)
    }, [sources])
    const posterUrl = imageUrl(episode.Id, episode.ImageTags.Primary)
    return (
        <div id={`episode-card-${episode.Id}`} className={style.card}>
        <div className={style["root"]} 
            key={episode.Id}>
            <div className={style.preview}>
            <Image ratio={episode.PrimaryImageAspectRatio} 
                src={posterUrl} />
            </div>
            <div className={style.text}>
                <span className={style.title}>{episode.Name}</span>
                <article className={style.overview}>{episode.Overview}</article>
                <div className={style["action"]}>
                    <div className={style["source-select"]} onClick={stopEvent}>
                    {source && sources && (
                        <Select.Root size="1"
                            value={source}
                            onValueChange={v => setSource(v)}
                            defaultValue={source ?? ""}>
                            <Select.Trigger placeholder="选择媒体文件" />
                            <Select.Content>
                            {sources.map(({value, label}, i) => 
                                <Select.Item key={`${i}`} value={value}>{label}</Select.Item>)}
                            </Select.Content>
                        </Select.Root>
                    )}
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