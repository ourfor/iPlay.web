import { Button, TextField } from "@radix-ui/themes";
import style from "./Search.module.scss"
import { useState } from "react";
import React from "react";

interface SearchProps {
    initValue?: string,
    className?: string,
    onValueChange?: (value: string) => void
}

export function Search(props: SearchProps) {
    const { onValueChange, initValue = "" } = props
    const [value, setValue] = useState(initValue)
    return (
        <div className={[style.root, props.className].join(" ")}>
            <TextField.Input value={value}
                required 
                placeholder="搜索关键字" 
                onChange={e => setValue(e.target.value)}
                type="text" />
            <Button size={"2"} 
                onClick={() => onValueChange?.(value)}>
                搜索
            </Button>
        </div>
    )
}