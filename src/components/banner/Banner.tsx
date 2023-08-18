import React, { useState, CSSProperties, useEffect, ReactNode } from 'react'
import { useTransition, animated, AnimatedProps, useSpringRef } from '@react-spring/web'

import styles from './Banner.module.scss'
import { Pagination } from '@mui/material'
import { log } from '@helper/log'

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
    const count = banners.length
    const [index, setIndex] = useState(0)
    const [hover, setHover] = useState(false)
    const onClick = () => setIndex(state => (state + 1) % banners.length)
    const transRef = useSpringRef()
    const transitions = useTransition(index, {
        ref: transRef,
        keys: null,
        from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
        leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
    })
    useEffect(() => {
        const id = setInterval(() => {
            if (hover) return
            setIndex(i => (i+1)%count)
        }, 3000)
        return () => {
            clearInterval(id)
        }
    }, [hover, count])
    useEffect(() => {
        transRef.start()
    }, [index])
    return (
        <div className={`flex fill ${styles.container} ${className}`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
            {transitions((style, i) => {
                return <Page style={style}>{banners[i]}</Page>
            })}
            <Pagination className={styles["select"]} 
                count={count} 
                page={index+1}
                onChange={(e, page) => setIndex(page-1)}
                variant="outlined" 
                color="secondary" />
        </div>
    )
}
