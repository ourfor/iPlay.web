import PageLogin from "@page/login"
import PageHome, { pageLoader as pageHomeLoader } from "@page/home"
import PageSeries, { pageLoader as pageSeriesLoader } from "@page/series"
import PageSeason from "@page/season"
import PageTest from "@page/test"
import PagePlay, { pageLoader as pagePlayLoader } from "@page/play"
import PageAlbum, { pageLoader as pageAlbumLoader } from "@page/album"
import PageError from "@page/error"
import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
import { logger } from "@helper/log"
import { Spin } from "@components/animation/Spin"

export const router = () => createBrowserRouter([
    { 
        path: "/login", 
        element: <PageLogin />,
        errorElement: <PageError />
    },
    { 
        path: "/",
        loader: pageHomeLoader,
        element: <PageHome />,
        errorElement: <PageLogin /> 
    },
    { 
        path: "/series/:id", 
        loader: pageSeriesLoader,
        element: <PageSeries />,
        errorElement: <PageLogin /> 
    },
    { 
        path: "/movie/:id", 
        loader: pageSeriesLoader,
        element: <PageSeries />,
        errorElement: <PageLogin /> 
    },
    { 
        path: "/season/:id", 
        element: <PageSeason />,
        errorElement: <PageLogin /> 
    },
    { 
        path: "/play/:id",
        loader: pagePlayLoader,
        element: <PagePlay />,
        errorElement: <PageLogin /> 
    },
    { 
        path: "/album/:id",
        loader: pageAlbumLoader,
        element: <PageAlbum />,
        errorElement: <PageLogin /> 
    },
    {
        path: "/*",
        element: <PageTest />
    }
], {
    basename: process.env.PUBLIC_URL
})

export function Router() {
    logger.info("init router")
    return (
        <RouterProvider router={router()} 
            fallbackElement={<Spin />} />
    )
}