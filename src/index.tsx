import "./index.module.scss"
import React from 'react';
import ReactDOM from 'react-dom/client';
import PageLogin from "@page/login"
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

const router = createBrowserRouter([
  { path: "/login", element: <PageLogin /> }
], {
  basename: process.env.PUBLIC_URL
})

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)