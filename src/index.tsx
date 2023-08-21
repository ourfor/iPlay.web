import '@radix-ui/themes/styles.css'
import "./index.module.scss"
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@data/Store";
import { Router } from "@router/router";
import { Theme } from '@radix-ui/themes';
import { SpinPage } from '@router/Root';
import { logger } from '@helper/log';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

const App = () => {
  logger.info("flush app")
  return <Router />
}

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<SpinPage />} persistor={persistor}>
        <Theme>
          <App />
        </Theme>
      </PersistGate>
    </Provider>
  // </React.StrictMode>
)