import React, { useState, CSSProperties, useEffect, ReactNode } from 'react'
import { useTransition, animated, AnimatedProps, useSpringRef } from '@react-spring/web'

import styles from './Banner.module.scss'

function Page(props: AnimatedProps<{ style: CSSProperties, children: ReactNode }>) {
    return (
        <animated.div style={props.style} onClick={e => e.stopPropagation()}>
            {props.children}
        </animated.div>
    )
}

export interface BannerProps {
    className?: string
    banners: React.ReactElement[]
}

export function Banner({ banners, className }: BannerProps) {
    const [index, set] = useState(0)
    const [hover, setHover] = useState(false)
    const onClick = () => set(state => (state + 1) % banners.length)
    const transRef = useSpringRef()
    const transitions = useTransition(index, {
        ref: transRef,
        keys: null,
        from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
        leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
    })
    useEffect(() => {
        const id = setInterval(() => !hover && set(i => (i+1)%banners.length), 3000)
        return () => {
            clearInterval(id)
        }
    }, [hover])
    useEffect(() => {
        transRef.start()
    }, [index])
    return (
        <div className={`flex fill ${styles.container} ${className}`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={onClick}>
            {transitions((style, i) => {
                return <Page style={style}>{banners[i]}</Page>
            })}
        </div>
    )
}
