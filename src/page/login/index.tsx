import { Button, Checkbox, Stack, TextField } from "@mui/material"
import style from "./index.module.scss"

const customStyle = {
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: '#B2BAC2',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#B2BAC2',
        },
    }
}

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
                        placeholder="用户名"
                        label="Username"
                        sx={customStyle}
                    />
                    <TextField
                        className={style["input"]}
                        id="outlined-password-input"
                        label="Password"
                        placeholder="密码"
                        type="password"
                        autoComplete="current-password"
                        sx={customStyle}
                    />

                    <Button className={style["login"]} variant="contained">Sign in</Button>
                    <Stack className={style["items"]} direction="row" justifyContent="flex-start" alignItems="center">
                        <Checkbox className={style["remember-me"]} defaultChecked sx={{ color: "#737373", '&.Mui-checked': { color: "white" } }} /> Remember me
                    </Stack>
                </div>
            </div>
        </div>
    )
}