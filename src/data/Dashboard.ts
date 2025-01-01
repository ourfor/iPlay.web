import { DEFAULT_EMBY_CONFIG } from "@api/config";
import { EmbyConfig } from "@helper/env";
import { logger } from "@helper/log";
import { Map } from "@model/Map";
import { User } from "@model/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { createAppAsyncThunk } from "./type";
import { Emby } from "@api/emby";
import { listenerMiddleware } from "./middleware/Listener";

export interface Site {
    id: string
    name?: string
    user: User | null
    emby: EmbyConfig
}

export const DEFAULT_SITE: Site = {
    id: `${Date.now()}`,
    name: `默认`,
    user: null,
    emby: DEFAULT_EMBY_CONFIG
}

export interface DashboardStore {
    authorized: boolean,
    loading: boolean
    server: string
    username: string
    password: string
}

export const DEFAULT_SITESTORE: DashboardStore = {
    authorized: false,
    loading: false,
    server: "http://localhost:8080",
    username: "",
    password: ""
}

type Authentication = {
    server: string,
    username: string,
    password: string,
    callback?: {
        resolve?: () => void
        reject?: () => void
    }
}

export const loginToDashboard = createAppAsyncThunk("site/login", async (user: Authentication, config) => {
    const api = config.extra
    const { server, username, password } = user
    const url = new URL(server)
    url.pathname = "/sites"
    const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${btoa(`${username}:${password}`)}`
        }
    })
    if (response.ok) {
        Promise.resolve();
        return user;
    }
    return Promise.reject();
})

export const slice = createSlice({
    name: "dashboard",
    initialState: DEFAULT_SITESTORE,
    reducers: {
        updateSite: (state, action: PayloadAction<Site>) => {

        },
        resetSite: () => {
            return DEFAULT_SITESTORE
        }
    },
    extraReducers: builder => {
        builder.addCase(loginToDashboard.pending, (state) => {
            state.loading = true
        })
        builder.addCase(loginToDashboard.fulfilled, (state, data) => {
            state.loading = false
            const user = data.payload
            state.server = user.server;
            state.username = user.username;
            state.password = user.password;
            state.authorized = true;
            logger.info(user)
        })
        builder.addCase(loginToDashboard.rejected, (state, data) => {
            state.loading = false
        })
    }
})

listenerMiddleware.startListening({
    actionCreator: loginToDashboard.fulfilled,
    effect: async (data, api) => {
        data.meta.arg.callback?.resolve?.()
    }
})

listenerMiddleware.startListening({
    actionCreator: loginToDashboard.rejected,
    effect: async (data, api) => {
        data.meta.arg.callback?.reject?.()
    }
})

export const {
    updateSite,
    resetSite,
} = slice.actions

export default slice.reducer