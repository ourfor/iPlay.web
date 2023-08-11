import { Button, TextField } from "@mui/material"
import style from "./index.module.scss"

export default function Page() {
    return (
        <div className={style["page"]}>
            <div className={style["wrap"]}>
                <div className={style["container"]}>
                    <p className={style["title"]}>Sign In</p>
                    <TextField
                        className={style["input"]}
                        required
                        id="outlined-required"
                        label="Username"
                    />
                    <TextField
                        className={style["input"]}
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                    />

                    <Button className={style["login"]} variant="contained">Sign in</Button>
                </div>
            </div>
        </div>
    )
}