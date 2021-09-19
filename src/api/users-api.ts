import { UsersType } from './../types/types';
import { instance } from './api';
type GetUsersType = {
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
}