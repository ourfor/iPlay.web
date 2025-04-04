import { ENV } from "@helper/env"
import { logger } from "@helper/log"
import { useEffect, useRef } from "react"
import style from "./Adsense.module.scss"

export function Adsense() {
    if (!ENV.adsense.id || !ENV.adsense.slot) return null
    return <AdsenseFixedArea />
}

export function AdsenseFixedArea() {
    const dom = useRef<HTMLDivElement>(null)
    const src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ENV.adsense.id}`
    const onLoad = () => {
        const adsbygoogle = (window as any).adsbygoogle || [];
        adsbygoogle.push({});
    }
    useEffect(() => {
        const script = document.createElement("script")
        script.onload = onLoad
        script.src = src
        script.crossOrigin = "anonymous"
        script.async = true
        document.head.appendChild(script)
        logger.info("load adsense")
    }, [])
    
    return (
        <div ref={dom} className={style.adsense}>
            <ins className="adsbygoogle"
                style={{display:"block", textAlign:"center"}}
                data-ad-layout="in-article"
                data-ad-format="fluid"
                data-ad-client={ENV.adsense.id}
                data-ad-slot={ENV.adsense.slot} />
        </div>
    )
}