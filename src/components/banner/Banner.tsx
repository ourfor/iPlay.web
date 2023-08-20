import React, { useState, CSSProperties, useEffect, ReactNode, useRef } from 'react'
import { useTransition, animated, AnimatedProps, useSpringRef, useSpring } from '@react-spring/web'

import styles from './Banner.module.scss'
import { Pagination } from 'antd'

function Page(props: AnimatedProps<{ style: CSSProperties, children: ReactNode }>) {
    return (
        <animated.div style={props.style} onClick={e => e.stopPropagation()}>
            {props.children}
        </animated.div>
    )
}

export interface BannerProps {
    children?: ReactNode
    className?: string
    banners: React.ReactElement[]
}

export function Banner({ children, banners, className }: BannerProps) {
    const count = banners.length
    const [index, setIndex] = useState(0)
    const [hover, setHover] = useState(false)
    const hoverRef = useRef(hover)
    const transRef = useSpringRef()
    const transitions = useTransition(index, {
        ref: transRef,
        keys: null,
        from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
        leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
    })

    const springs = useSpring({
        from: {
            strokeDashoffset: 120,
        },
        to: {
            strokeDashoffset: 0,
        },
        config: {
            duration: 3000,
        },
        loop: true,
        ref: transRef,
    })

    useEffect(() => {
        hoverRef.current = hover;
    }, [hoverRef, hover]) 

    useEffect(() => {
        const id = setInterval(() => {
            if (hoverRef.current) return
            setIndex(i => (i + 1) % count)
        }, 3000)
        return () => {
            clearInterval(id)
        }
    }, [hoverRef, count])

    useEffect(() => {
        transRef.start()
    }, [index])

    return (
        <div className={`flex fill ${styles.container} ${className}`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
            {children}
            {transitions((style, i) => {
                return <Page style={style}>{banners[i]}</Page>
            })}
            <Pagination className={styles["select"]}
                showSizeChanger={false}
                defaultPageSize={1}
                total={count}
                current={index + 1}
                onChange={(page) => setIndex(page - 1)} />
            <div className={styles.ticker}>
                <div />
                <animated.svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    style={springs}>
                    <path d="M19.9999 38.5001C17.5704 38.5001 15.1648 38.0216 12.9203 37.0919C10.6758 36.1622 8.63633 34.7995 6.91845 33.0816C5.20058 31.3638 3.83788 29.3243 2.90817 27.0798C1.97846 24.8353 1.49995 22.4296 1.49995 20.0002C1.49995 17.5707 1.97846 15.1651 2.90817 12.9206C3.83788 10.6761 5.20058 8.63663 6.91846 6.91875C8.63634 5.20087 10.6758 3.83818 12.9203 2.90847C15.1648 1.97876 17.5705 1.50024 19.9999 1.50024C22.4293 1.50024 24.835 1.97876 27.0795 2.90847C29.324 3.83818 31.3635 5.20088 33.0813 6.91876C34.7992 8.63663 36.1619 10.6761 37.0916 12.9206C38.0213 15.1651 38.4998 17.5707 38.4998 20.0002C38.4998 22.4296 38.0213 24.8353 37.0916 27.0798C36.1619 29.3243 34.7992 31.3638 33.0813 33.0816C31.3635 34.7995 29.324 36.1622 27.0795 37.0919C24.835 38.0216 22.4293 38.5001 19.9999 38.5001L19.9999 38.5001Z" />
                </animated.svg>
            </div>
        </div>
    )
}
