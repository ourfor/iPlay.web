import { useEffect, useRef } from 'react';
import { init } from './explosions.js';

export function Explosion(){

    const dom = useRef(null)
    useEffect(() => {
        init(dom.current);
    }, [])

    const style = {
        position: 'fixed',
        left: '0',
        top: '0',
        zIndex: '1',
        pointerEvents: "none"
    }

    return (
    <canvas ref={dom} 
        className='fireworks' 
        style={style as any} />
    )
}
