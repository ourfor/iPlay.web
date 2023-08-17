import PageLogin from "@page/login"
import PageHome from "@page/home"
import PageDetail, { pageLoader } from "@page/detail"
import PageSeason from "@page/season"
import PagePlay from "@page/play"
import PageError from "@page/error"
import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
import { log } from "@helper/log"
import { Spin } from "@components/animation/Spin"

export const router = () => createBrowserRouter([
    { 
        path: "/login", 
        element: <PageLogin />,
        errorElement: <PageError />
    },
    { 
        path: "/", 
        element: <PageHome /> 
    },
    { 
        path: "/detail/:id", 
        loader: pageLoader,
        element: <PageDetail />
    },
    { 
        path: "/season/:id", 
        element: <PageSeason /> 
    },
    { 
        path: "/play/:id", 
        element: <PagePlay /> 
    }
], {
    basename: process.env.PUBLIC_URL
})

export function Router() {
    log.info("init router")
    return (
        <RouterProvider router={router()} 
            fallbackElement={<Spin />} />
    )
}