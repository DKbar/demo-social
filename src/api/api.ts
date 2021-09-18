import { ProfileType } from './../types/types';
import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: { "API-KEY": "be208add-76be-474f-b426-6fa8679c0152" }
});



export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response
            })
    },

    unfollow(id: number) {
        return instance.delete(`follow/${id}`)
            .then(response => {
                return response
            })
    },

    follow(id: number) {
        return instance.post(`follow/${id}`)
            .then(response => {
                return response
            })
    },
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/` + userId)

    },
    getStatus(userId: number) {
        return instance.get('profile/status/' + userId)
    },

    updateStatus(status: string) {
        return instance.put('profile/status/', { status: status })
    },

    savePhoto(photoFile: string) {
        const formData = new FormData();
        formData.append('image', photoFile)
        return instance.put('profile/photo/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile(profile: ProfileType) {
        return instance.put('profile/', profile);
    }


}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
} 

export enum ResultCodesForCaptcha {
    CaptchaIsRequired = 10
} 
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
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    }
}

