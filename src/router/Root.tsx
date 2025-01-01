import { config } from "@api/config";
import { Api, Emby } from "@api/emby";
import { Message } from "@components/message/Message";
import { SettingDialog } from "@components/setting/SettingDialog";
import { useAppSelector } from "@data/StoreHook";
import { Exception, ExceptionType } from "@error/Exception";
import { logger } from "@helper/log";
import { useEffect } from "react";
import { LoaderFunctionArgs, Outlet, useNavigate, useNavigation } from "react-router-dom";
import { Page } from "../page/spin";
import { store } from "@data/Store";
import { iPlayApi } from "@api/iPlayApi";
import { DashIcon } from "@radix-ui/react-icons";

export async function checker({params, request, context}: LoaderFunctionArgs) {
    logger.info(`check site status`)
    const path = new URL(request.url).pathname
    if (path === "/login") return null
    const authorized = config.iplay != null
    if (!authorized) throw new Exception("login required", ExceptionType.NO_USER)
    return null
}

export default function Root() {
    const navigation = useNavigation()
    const dashboard = useAppSelector(state => state.dashboard)
    useEffect(() => {
      if (dashboard) {
        logger.info(`server ${dashboard.server}`)
        config.iplay = new iPlayApi(dashboard.server, dashboard.username, dashboard.password)
      }
    }, [dashboard])

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
        {navigation.state === "loading" && <Page />}
      </>
    );
  }