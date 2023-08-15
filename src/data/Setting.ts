import { Info } from "@model/Info";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Setting {
    info: Info
}

export const DEFAULT_SETTING: Partial<Setting> = {
}

export const settingSlice = createSlice({
    name: "setting",
    initialState: DEFAULT_SETTING,
    reducers: {
        updateSetting: (state, action: PayloadAction<Partial<Setting>>) => {
            return {...state, ...action.payload}
        },
        resetSetting: () => {
            return DEFAULT_SETTING
        }
    }
})

export const { updateSetting, resetSetting } = settingSlice.actions
export default settingSlice.reducer