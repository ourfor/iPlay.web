import PageLogin from "@page/login"
import PageHome from "@page/home"
import PageSeries, { pageLoader as pageSeriesLoader } from "@page/series"
import PageSeason from "@page/season"
import PagePlay, { pageLoader as pagePlayLoader } from "@page/play"
import PageAlbum, { pageLoader as pageAlbumLoader } from "@page/album"
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
        path: "/series/:id", 
        loader: pageSeriesLoader,
        element: <PageSeries />
    },
    { 
        path: "/season/:id", 
        element: <PageSeason /> 
    },
    { 
        path: "/play/:id",
        loader: pagePlayLoader,
        element: <PagePlay /> 
    },
    { 
        path: "/album/:id",
        loader: pageAlbumLoader,
        element: <PageAlbum /> 
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