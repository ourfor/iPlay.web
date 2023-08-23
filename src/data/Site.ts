import { DEFAULT_EMBY_CONFIG } from "@api/config";
import { EmbyConfig } from "@helper/env";
import { logger } from "@helper/log";
import { Map } from "@model/Map";
import { User } from "@model/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { createAppAsyncThunk } from "./Store";

export interface Manifest {
    short_name: string
    name: string
}

export interface Site {
    id: string
    name?: string
    user: User|null
    emby: EmbyConfig
}

export const DEFAULT_SITE: Site = {
    id: `${Date.now()}`,
    name: `默认`,
    user: null,
    emby: DEFAULT_EMBY_CONFIG
}

export interface SiteStore {
    activeId?: string|null
    sites: Map<string, Site>
    site: Site
}

export const DEFAULT_SITESTORE: SiteStore = {
    activeId: null,
    sites: {},
    site: DEFAULT_SITE
}

export const getSiteInfo = createAppAsyncThunk("site/info", async (id: number, api) => {
    logger.info(`api`, api.extra)
    const response = await fetch("http://localhost:3000/manifest.json")
    const data = await response.json() as Manifest
    return data
})

export const slice = createSlice({
    name: "site",
    initialState: DEFAULT_SITESTORE,
    reducers: {
        updateSite: (state, action: PayloadAction<Site>) => {
            const data = action.payload
            const id = data.id
            const _old = state.sites[id]
            const _new = {..._old, ...data}
            if (_.isEmpty(Object.values(state.sites))) {
                state.activeId = id;
            }
            state.sites[id] = _new
            if (state.activeId === id) {
                state.site = _new
            }
            return state
        },
        updateActiveId: (state, action: PayloadAction<string>) => {
            const id = action.payload
            const site = state.sites[id]
            if (site) {
                state.activeId = id
                state.site = site
            }
            return state
        },
        updateSiteConfig: (state, action: PayloadAction<Partial<Site>>) => {
            const {id, emby, name} = action.payload
            if (!id || !emby) return state
            if (!state.sites[id]) return state
            const _old = state.sites[id]!.emby
            const _new = {..._old, ...emby}
            state.sites[id]!.emby = _new
            state.sites[id]!.name = name
            if (id === state.activeId) {
                state.site.emby = _new
                state.site.name = name
            }
            return state
        },
        updateActiveSite: (state, action: PayloadAction<Partial<Site>>) => {
            const site = action.payload
            state.site = {...state.site, ...site}
            const id = state.site.id
            if (state.sites[id]) {
                state.sites[id] = {...state.sites[id], ...site} as Site
            }
            return state
        },
        resetSite: () => {
            return DEFAULT_SITESTORE
        }
    },
    extraReducers: builder => {
        builder.addCase(getSiteInfo.pending, () => {
            logger.info("pending")
        })
        builder.addCase(getSiteInfo.fulfilled, (state, data) => {
            logger.info(`fulfilled`, data.payload)
        })
    }
})

export const { updateSite, updateActiveSite, updateActiveId, updateSiteConfig, resetSite } = slice.actions
export default slice.reducer