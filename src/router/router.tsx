import PageLogin from "@page/login"
import PageHome, { pageLoader as pageHomeLoader } from "@page/home"
import PageSeries, { pageLoader as pageSeriesLoader } from "@page/series"
import PageSeason, { pageLoader as pageSeasonLoader } from "@page/season"
import PageTest from "@page/test"
import PagePlay, { pageLoader as pagePlayLoader } from "@page/play"
import PageAlbum, { pageLoader as pageAlbumLoader } from "@page/album"
import PageError from "@page/error"
import { Outlet, RouterProvider, createBrowserRouter, useNavigation } from 'react-router-dom';
import { logger } from "@helper/log"
import { Spin } from "@components/animation/Spin"
import { Message } from "@components/message/Message"
import { SettingDialog } from "@components/setting/SettingDialog"
import { useEffect } from "react"

const SpinPage = (
    <div style={{
        position: "fixed", 
        top: 0, left: 0,
        width: "100vw", 
        height: "100vh"
    }}>
        <Spin />
    </div>
)

export default function Root() {
    const navigation = useNavigation();

    useEffect(() => {
        if (navigation.state === "loading") {
            window.scrollY = 0
        }
    }, [navigation.state])
  
    return (
      <>
        <Outlet />
        <Message />
        <SettingDialog />
        {navigation.state === "loading" && SpinPage}
      </>
    );
  }

const pages = [
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
        loader: pageSeasonLoader,
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
]

export const router = () => createBrowserRouter([{
    path: "/",
    element: <Root />,
    children: pages
}], {
    basename: process.env.PUBLIC_URL
})

export function Router() {
    logger.info("init router")
    return (
        <RouterProvider router={router()} 
            fallbackElement={SpinPage} />
    )
}