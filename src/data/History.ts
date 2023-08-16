import { Info } from "@model/Info";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export const historySlice = createSlice({
    name: "history",
    initialState: {
        data: [] as string[]
    },
    reducers: {
        pushHistory: (state, action: PayloadAction<string>) => {
            state.data.push(action.payload)
            return state
        },

        popHistory: (state) => {
            state.data.pop()
            return state
        }
    }
})

export const { pushHistory, popHistory } = historySlice.actions
export default historySlice.reducer