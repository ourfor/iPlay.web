import PageLogin, { pageLoader as pageLoginLoader } from "@page/login"
import PageHome, { pageLoader as pageHomeLoader } from "@page/home"
import PageSeries, { pageLoader as pageSeriesLoader } from "@page/series"
import PageSeason, { pageLoader as pageSeasonLoader } from "@page/season"
import PageSite from "@page/site"
import PageTest from "@page/test"
import PagePlay, { pageLoader as pagePlayLoader } from "@page/play"
import PageAlbum, { pageLoader as pageAlbumLoader } from "@page/album"
import PageSearch, { pageLoader as pageSearchLoader } from "@page/search"
import PageFavorite, { pageLoader as pageFavoriteLoader } from "@page/favorite"
import PageError from "@page/error"
import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { logger } from "@helper/log"
import Root, { checker } from "./Root"
import { Page } from "../page/spin"


const pages: RouteObject[] = [
    { 
        path: "/login", 
        element: <PageLogin />,
        loader: pageLoginLoader,
        errorElement: <PageError />
    },
    { 
        path: "/",
        loader: pageHomeLoader,
        element: <PageHome />,
        errorElement: <PageError />
    },
    { 
        path: "/favorite",
        loader: pageFavoriteLoader,
        element: <PageFavorite />,
        errorElement: <PageError /> 
    },
    { 
        path: "/search",
        loader: pageSearchLoader,
        element: <PageSearch />,
        errorElement: <PageError /> 
    },
    { 
        path: "/series/:id", 
        loader: pageSeriesLoader,
        element: <PageSeries />,
        errorElement: <PageError /> 
    },
    { 
        path: "/movie/:id", 
        loader: pageSeriesLoader,
        element: <PageSeries />,
        errorElement: <PageError /> 
    },
    { 
        path: "/season/:id",
        loader: pageSeasonLoader,
        element: <PageSeason />,
        errorElement: <PageError /> 
    },
    { 
        path: "/play/:id",
        loader: pagePlayLoader,
        element: <PagePlay />,
        errorElement: <PageError /> 
    },
    { 
        path: "/album/:id",
        loader: pageAlbumLoader,
        element: <PageAlbum />,
        errorElement: <PageError /> 
    },
    {
        path: "/site",
        element: <PageSite />
    },
    {
        path: "/*",
        element: <PageTest />
    }
]

export const router = () => createBrowserRouter([{
    path: "/",
    element: <Root />,
    loader: checker,
    errorElement: <PageError />,
    children: pages,
}], {
    basename: process.env.PUBLIC_URL
})

export function Router() {
    logger.info("init router")
    return (
        <RouterProvider router={router()} 
            fallbackElement={<Page />} />
    )
}