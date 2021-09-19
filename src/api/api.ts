import { ProfileType, UsersType, PhotosType } from './../types/types';
import axios from "axios";


export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: { "API-KEY": "be208add-76be-474f-b426-6fa8679c0152" }
});


/* type GetUsersType = {
    items: Array<UsersType>
    totalCount: number
    error?: string
}
type FollowType = {
    resultCode:  number
    messages: Array<string>
    data: {}
}
export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`).then(res => res.data)
    },

    unfollow(id: number) {
        return instance.delete<FollowType>(`follow/${id}`).then(res => res.data)
    },

    follow(id: number) {
        return instance.post<FollowType>(`follow/${id}`).then(res => res.data)
    },
} */
/* type UpdateStatusType = {
    resultCode:  number
    messages: Array<string>
    data: {}
}

type SavePhotoType = {
    resultCode:  number
    messages: Array<string>
    data: {photos:PhotosType}
}
type SaveProfileType = {
    resultCode:  number
    messages: Array<string>
    data: {}
}


export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId)
    },
    getStatus(userId: number) {
        return instance.get<string>('profile/status/' + userId)
    },

    updateStatus(status: string) {
        return instance.put<UpdateStatusType>('profile/status/', { status: status }).then(res => res.data)
    },

    savePhoto(photoFile: string) {
        const formData = new FormData();
        formData.append('image', photoFile)
        return instance.put<SavePhotoType>('profile/photo/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data);
    },
    saveProfile(profile: ProfileType) {
        return instance.put<SaveProfileType>('profile/', profile).then(res => res.data);
    }


} */

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
} 

export enum ResultCodesForCaptcha {
    CaptchaIsRequired = 10
} 
/* type GetAuthType = {
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
} */


