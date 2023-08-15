import { User } from "@model/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const DEFAULT_USER: Partial<User> = {}

export const userSlice = createSlice({
    name: "user",
    initialState: DEFAULT_USER,
    reducers: {
        updateUser: (state, action: PayloadAction<Partial<User>>) => {
            return {...state, ...action.payload}
        },
        resetUser: () => {
            return DEFAULT_USER
        }
    }
})

export const { updateUser, resetUser } = userSlice.actions
export default userSlice.reducer