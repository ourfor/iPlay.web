import style from "./Footer.module.scss"

export function Footer() {
    return (
        <div className={style.root}>
            <div className={style.tel}>有疑問嗎？致電 <a href="tel:1-404-666-0011">1-404-666-0011</a></div>
            <ul className={style.nav}>
                <li>Q&A</li>
                <li>隐私条款</li>
                <li>服务条款</li>
                <li>关于我们</li>
            </ul>
            <div className={style.copyright}>
                <span>
                    Copyright © 2024 iPlay Inc. 保留所有权利。
                </span>
                <span>
                    Powered by <a href="https://github.com/ourfor/iplay">iplay</a>
                </span>
            </div>
        </div>
    )
}