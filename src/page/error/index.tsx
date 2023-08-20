import { logger } from "@helper/log"
import { useNavigate, useRouteError } from "react-router-dom"
import style from "./index.module.scss"
import { Exception, ExceptionType } from "@error/Exception"
import { useEffect } from "react"

export default function Page() {
    const error = useRouteError() as Exception
    const navigate = useNavigate()
    logger.error(error, error.code === ExceptionType.NO_USER)
    useEffect(() => {
        if (error.code === ExceptionType.NO_USER) {
            logger.info(`go to login page`)
            navigate(`/login`)
        }
    }, [])
    return (
        <div className={style.page}>
            <div id="error-page">
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>{error.message}</i>
                </p>
            </div>
        </div>
    )
}