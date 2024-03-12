import { ENV } from "@helper/env"
import { useEffect } from "react"

export function Adsense() {
    if (!ENV.adsense.id || !ENV.adsense.slot) return null

    const src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ENV.adsense}`
    const onLoad = () => {
        const adsbygoogle = (window as any).adsbygoogle || [];
        adsbygoogle.push({});
    }
    return (
        <div className="ads-holder">
            <script async 
                src={src}
                onLoad={onLoad}
                crossOrigin="anonymous" />
            <ins className="adsbygoogle"
                style={{display:"block", textAlign:"center"}}
                data-ad-layout="in-article"
                data-ad-format="fluid"
                data-ad-client={ENV.adsense.id}
                data-ad-slot={ENV.adsense.slot} />
        </div>
    )
}