import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MessageProps {
    type: "info"|"warn"|"success"|"error"
    data: string
    duration?: number
}

export const messageSlice = createSlice({
    name: "message",
    initialState: {
        queue: [] as MessageProps[],
    },
    reducers: {
        produceMessage: (state, action: PayloadAction<MessageProps>) => {
            if (action.payload) {
                state = {
                    ...state,
                    queue: [...state.queue, action.payload]
                }
            }
            return state
        },
        consumeMessage: (state) => {
            const [first, ...rest] = state.queue
            if (first) {
                state = {
                    ...state,
                    queue: [...rest]
                }
            }
            return state
        }
    }
})

export const { produceMessage, consumeMessage  } = messageSlice.actions
export default messageSlice.reducer