import { Map } from "@model/Map";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum DialogID {
    SETTING = "setting",
    ADD_SITE = "add_site"
}

export interface Event {
    dialog: Map<string, boolean>
}

export const DEFAULT_EVENT: Partial<Event> = {
    dialog: {}
}

export const eventSlice = createSlice({
    name: "event",
    initialState: DEFAULT_EVENT,
    reducers: {
        updateEvent: (state, action: PayloadAction<Partial<Event>>) => {
            return {...state, ...action.payload}
        },
        openDialog: (state, action: PayloadAction<{id: string, visible: boolean}>) => {
            const {id, visible: open} = action.payload
            if (!state.dialog) state.dialog = {}
            state.dialog[id] = open
            return state
        }
    }
})

export const { updateEvent, openDialog } = eventSlice.actions
export default eventSlice.reducer