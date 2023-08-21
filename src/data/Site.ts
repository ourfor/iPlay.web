import { DEFAULT_EMBY_CONFIG } from "@api/config";
import { Api, Emby } from "@api/emby";
import { EmbyConfig } from "@helper/env";
import { Map } from "@model/Map";
import { User } from "@model/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export const slice = createSlice({
    name: "site",
    initialState: DEFAULT_SITESTORE,
    reducers: {
        updateSite: (state, action: PayloadAction<Site>) => {
            const data = action.payload
            const id = data.id
            const _old = state.sites[id]
            const _new = {..._old, ...data}
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
    }
})

export const { updateSite, updateActiveSite, updateActiveId, updateSiteConfig, resetSite } = slice.actions
export default slice.reducer