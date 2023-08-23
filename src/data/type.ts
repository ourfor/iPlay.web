import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from "./Store"
import { Api } from "@api/emby"

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: RootState
    dispatch: AppDispatch
    rejectValue: string
    extra: typeof Api
}>()

