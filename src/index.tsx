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
          return
        }
      } else if (event.key === "Escape") {
        window.history.back();
        return;
      }

      const gamepads = navigator.getGamepads();
      if (gamepads.length > 0) {
        const gamepad = gamepads[0];
        if (gamepad?.buttons[0].pressed) {
          const target = document.activeElement as HTMLElement;
          if (target && typeof target.click === 'function') {
            target.click();
          }
        } else if (gamepad?.buttons[1].pressed) {
          window.history.back();
        }
      }
    };

    const handleGamepad = (event: GamepadEvent) => {
      if (event.gamepad.buttons[0].pressed) {
        const target = document.activeElement as HTMLElement;
        if (target && typeof target.click === 'function') {
          target.click();
        }
      } else if (event.gamepad.buttons[1].pressed) {
        window.history.back();
      }
    }

    window.addEventListener('gamepadconnected', handleGamepad);

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('gamepadconnected', handleGamepad);
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