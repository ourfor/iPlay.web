import { config } from "@api/config";
import { Api, Emby } from "@api/emby";
import { Spin } from "@components/animation/Spin";
import { Message } from "@components/message/Message";
import { SettingDialog } from "@components/setting/SettingDialog";
import { useAppSelector } from "@data/StoreHook";
import { Exception, ExceptionType } from "@error/Exception";
import { logger } from "@helper/log";
import { useEffect } from "react";
import { LoaderFunctionArgs, Outlet, useNavigate, useNavigation } from "react-router-dom";

export const SpinPage = () => (
    <div style={{
        position: "fixed", 
        top: 0, left: 0,
        width: "100vw", 
        height: "100vh"
    }}>
        <Spin />
    </div>
)

export async function checker({params, request, context}: LoaderFunctionArgs) {
    logger.info(`check site status`)
    const path = new URL(request.url).pathname
    if (path === "/login") return null
    const token = Api.emby?.user.AccessToken
    if (!token) throw new Exception("login required", ExceptionType.NO_USER)
    return null
}

export default function Root() {
    const navigation = useNavigation()
    const user = useAppSelector(state => state.site.site.user)
    const emby = useAppSelector(state => state.site.site.emby)
    useEffect(() => {
      logger.info("site switch to", user?.ServerId)
      if (user) {
        Api.emby = new Emby(user)
      }
    }, [user])

    useEffect(() => {
      logger.info("update emby config")
      config.emby = emby
    }, [emby])

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
        {navigation.state === "loading" && <SpinPage />}
      </>
    );
  }