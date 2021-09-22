import { instance, APIResponseType, ResultCodesEnum, ResultCodesForCaptcha } from "./api"




type GetAuthDataType = {
    id: number
    email: string
    login: string
}

type LoginDataType = {
  userId: number
}



export const authAPI = {
    getAuth() {
        return instance.get<APIResponseType<GetAuthDataType>>(`auth/me`).then (res => res.data)
    },

    login(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return instance.post<APIResponseType<LoginDataType, ResultCodesEnum | ResultCodesForCaptcha>>(`auth/login`, { email, password, rememberMe, captcha}).then (res => res.data)
    },

    logout() {
        return instance.delete<APIResponseType>(`auth/login`).then(res => res.data)
    },
}