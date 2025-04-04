import '@radix-ui/themes/styles.css'
import "./index.module.scss"
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@data/Store";
import { Router } from "@router/router";
import { Theme } from '@radix-ui/themes';
import { Page } from "@page/spin";
import { logger } from '@helper/log';
import { KeyboardEventHandler, useEffect } from 'react';
import { useAppDispatch } from '@data/StoreHook';
import { getSiteInfo } from '@data/Site';
import { ENV } from '@helper/env';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

const App = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getSiteInfo(0))
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        const target = event.target as HTMLElement;
        if (target && typeof target.click === 'function') {
          target.click();
        }
      } else if (event.key === "Escape") {
        window.history.back();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [])
  logger.info("flush app")
  return <Router />
}

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Page />} persistor={persistor}>
        <Theme>
          <App />
        </Theme>
      </PersistGate>
    </Provider>
  // </React.StrictMode>
)