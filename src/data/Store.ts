import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import settingSlice from "./Setting";
import userSlice from "./User";

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
        storage
    }, userSlice), 
})

const persistConfig = {
    key: [Env.storeKey, "root"].join("/"),
    storage,
    blacklist: [
        "dashboard", 
        "message",
    ]
}

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: Env.name !== 'production',
    middleware: [thunk]
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch