import "./index.module.scss"
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@data/Store";
import { Router } from "@router/router";
import { Spin } from "@components/animation/Spin";
import { useAppSelector } from "@data/StoreHook";
import { useEffect } from "react";
import { config } from "@api/config";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

const App = () => {
  const setting = useAppSelector(state => state.setting)
  useEffect(() => {
    if (setting.emby) {
      config.emby = setting.emby
    }
  }, [setting])
  return (
    <Router />
  )
}

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Spin />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  // </React.StrictMode>
)