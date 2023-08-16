import "./index.module.scss"
import React from 'react';
import ReactDOM from 'react-dom/client';
import PageLogin from "@page/login"
import PageHome from "@page/home"
import PageDetail from "@page/detail"
import PageSeason from "@page/season"
import PagePlay from "@page/play"
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@data/Store";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

const router = createBrowserRouter([
  {path: "/login", element: <PageLogin />},
  {path: "/", element: <PageHome />},
  {path: "/detail/*", element: <PageDetail />},
  {path: "/season/*", element: <PageSeason />},
  {path: "/play/*", element: <PagePlay />}
], {
  basename: process.env.PUBLIC_URL
})

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)