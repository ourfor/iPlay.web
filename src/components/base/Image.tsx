import { AspectRatio } from "@radix-ui/themes";
import { CSSProperties } from "react";

export interface ImageProps {
    className?: string
    ratio?: number
    src: string
    alt?: string,
    style?: CSSProperties
}

export function Image({ className, ratio, src, alt, style }: ImageProps) {
    return (
        <AspectRatio className={className} ratio={ratio}>
            <img
                draggable={false}
                src={src}
                alt={alt}
                style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                    borderRadius: 'var(--radius-2)',
                    ...style
                }}
            />
        </AspectRatio>
    )
}