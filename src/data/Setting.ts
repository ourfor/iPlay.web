import { DEFAULT_EMBY_CONFIG, EmbyConfig } from "@api/config";
import { Info } from "@model/Info";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Setting {
    info: Info,
    emby: EmbyConfig
}

export const DEFAULT_SETTING: Partial<Setting> = {
    emby: DEFAULT_EMBY_CONFIG
}

export const settingSlice = createSlice({
    name: "setting",
    initialState: DEFAULT_SETTING,
    reducers: {
        updateSetting: (state, action: PayloadAction<Partial<Setting>>) => {
            return {...state, ...action.payload}
        },
        updateEmbyConfig: (state, action: PayloadAction<Partial<EmbyConfig>>) => {
            const newConfig = action.payload
            if (!state.emby) {
                state.emby = DEFAULT_EMBY_CONFIG
            }
            state.emby = {...state.emby, ...newConfig}
            return state
        },
        resetSetting: () => {
            return DEFAULT_SETTING
        }
    }
})

export const { updateSetting, resetSetting, updateEmbyConfig } = settingSlice.actions
export default settingSlice.reducer