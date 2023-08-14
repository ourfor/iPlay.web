import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Setting {

}

export const DEFAULT_SETTING: Setting = {

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