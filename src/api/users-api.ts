import { UsersType } from './../types/types';
import { instance, APIResponseType } from './api';
type GetUsersType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
} 

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`).then(res => res.data)
    },

    unfollow(id: number) {
        return instance.delete<APIResponseType>(`follow/${id}`).then(res => res.data)
    },

    follow(id: number) {
        return instance.post<APIResponseType>(`follow/${id}`).then(res => res.data)
    },
}