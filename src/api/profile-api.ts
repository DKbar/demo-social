import { PhotosType, ProfileType } from './../types/types';
import { instance } from './api';
type UpdateStatusType = {
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


}