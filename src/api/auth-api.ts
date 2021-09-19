import { instance, ResultCodesEnum, ResultCodesForCaptcha } from "./api"

type GetAuthType = {
    data: {id: number, email: string, login: string}
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type LoginType = {
    data: {userId: number}
    resultCode: ResultCodesEnum | ResultCodesForCaptcha,
    messages: Array<string>
}

type LogoutType = {
    data: {}
    resultCode: ResultCodesEnum,
    messages: Array<string>
}

export const authAPI = {
    getAuth() {
        return instance.get<GetAuthType>(`auth/me`).then (res => res.data)
    },

    login(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return instance.post<LoginType>(`auth/login`, { email, password, rememberMe, captcha}).then (res => res.data)
    },

    logout() {
        return instance.delete<LogoutType>(`auth/login`).then(res => res.data)
    },
}