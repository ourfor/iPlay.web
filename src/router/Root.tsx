import { Api } from "@api/emby";
import { Message } from "@components/message/Message";
import { SettingDialog } from "@components/setting/SettingDialog";
import { Exception, ExceptionType } from "@error/Exception";
import { Spin } from "antd";
import { useEffect } from "react";
import { LoaderFunctionArgs, Outlet, useNavigation } from "react-router-dom";

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
    const path = new URL(request.url).pathname
    if (path === "/login") return null
    const token = Api.emby!.user.AccessToken
    if (!token) throw new Exception("login required", ExceptionType.NO_USER)
    return null
}

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
        {navigation.state === "loading" && <SpinPage />}
      </>
    );
  }