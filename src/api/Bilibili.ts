export interface Cookie {
    name: string;
    value: string;
    http_only: number;
    expires: number;
    secure: number;
}

export interface CookieInfo {
    cookies: Cookie[];
    domains: string[];
}

export interface TokenInfo {
    mid: number;
    access_token: string;
    refresh_token: string;
    expires_in: number;
}

export interface Data {
    is_new: boolean;
    mid: number;
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_info: TokenInfo;
    cookie_info: CookieInfo;
    sso: string[];
    hint: string;
}

export interface BilibiliQRCodeResponse {
    code: number;
    message: string;
    ttl: number;
    data: Data;
}