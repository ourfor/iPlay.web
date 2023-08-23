import { Action, ThunkAction, combineReducers, configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import settingSlice from "./Setting";
import userSlice from "./User";
import historySlice from "./History";
import eventSlice from "./Event";
import siteSlice, { DEFAULT_SITE, updateSite } from "./Site"
import messageSlice from "./Message"
import { logger } from "@helper/log";
import { Api, Emby } from "@api/emby";
import { User } from "@model/User";
import { config } from "@api/config";
import _ from "lodash";
import { listener, listenerMiddleware } from "./middleware/Listener";

const Env = {
    name: "development",
    storeKey: "dev"
}

const reducer = combineReducers({
    setting: persistReducer({
        key: [Env.storeKey, "setting"].join("/"),
        storage
    }, settingSlice),
    user: persistReducer({
        key: [Env.storeKey, "user"].join("/"),
        storage,
    }, userSlice),
    site: persistReducer({
        key: [Env.storeKey, "site"].join("/"),
        storage,
    }, siteSlice),
    history: persistReducer({
        key: [Env.storeKey, "history"].join("/"),
        storage
    }, historySlice),
    message: persistReducer({
        key: [Env.storeKey, "message"].join("/"),
        storage
    }, messageSlice),
    event: persistReducer({
        key: [Env.storeKey, "event"].join("/"),
        storage
    }, eventSlice),
})

const persistConfig = {
    key: [Env.storeKey, "root"].join("/"),
    storage,
    blacklist: [
        "dashboard",
        "message"
    ]
}

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: Env.name !== 'production',
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            thunk: {
                extraArgument: Api
            },
            listenerMiddleware
        }).concat(thunk, listener)
})

export const persistor = persistStore(store, null, () => {
    const state = store.getState()
    logger.info("init store", state)
    const site = state.site.site
    if (site) config.emby = site.emby
    if (_.isEmpty(Object.values(state.site.sites))) {
        store.dispatch(updateSite(DEFAULT_SITE))
    }
    if (site.user?.AccessToken) {
        Api.emby = new Emby(site.user as User)
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch