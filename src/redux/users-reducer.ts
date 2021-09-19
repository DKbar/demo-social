import { AppStateType, InferActionsTypes } from './redux-store';
import { UsersType } from './../types/types';
import { ResultCodesEnum } from "../api/api"
import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import { usersAPI } from '../api/users-api';


let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 20 as number,
    totalUsersCount: 0 as number,
    currentPage: 1,
    isFetching: true as boolean,
    followingInProgress: [] as Array<number>  //array of users id
}

export type InitialStateType = typeof initialState

type ActionsTypes = InferActionsTypes<typeof actions>

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    
    switch (action.type) {
        case "FOLLOW":
            /*             let stateCopy = { ...state }
                        stateCopy.users = [...state.users]
                        stateCopy.users[action.userid] = { ...state.users[action.userid] }
                        stateCopy.users[action.userid].friend = true
                        return stateCopy */
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userid) {
                        return { ...u, followed: true }
                    }
                    return u;
                })
            }
        case "UNFOLLOW":
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userid) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
            }
        case "SET_USERS":
            return { ...state, users: [...action.users] }

        case "SET_CURRENT_PAGE":
            return { ...state, currentPage: action.page }

        case "SET_TOTAL_USERS_COUNT":
            return { ...state, totalUsersCount: action.usersCount }
        case "TOGGLE_IS_FETCHING":
            return { ...state, isFetching: action.isFetching }
        case "TOGGLE_IS_FOLLOWING_PROGRESS":
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }

        default:
            return state;
    }
}

export const actions = {
    followSuccess: (id: number) => ({
            type: 'FOLLOW',
            userid: id
    } as const),
    
    unfollowSuccess: (id: number) => ({
            type: 'UNFOLLOW',
            userid: id
    } as const),
    
    setUsers: (users: any) => ({
            type: 'SET_USERS',
            users
    } as const),
    
    setCurrentPage: (page: number) => ({
            type: 'SET_CURRENT_PAGE',
            page: page
    } as const),
    
    setTotalUsersCount: (usersCount: number) => ({
            type: 'SET_TOTAL_USERS_COUNT',
            usersCount
    } as const),
    
    toggleIsFetching: (isFetching: boolean) => ({
            type: 'TOGGLE_IS_FETCHING',
            isFetching
    } as const),
    
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
            type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
            isFetching,
            userId
    } as const)
}



type CurrentDispatchType = Dispatch<ActionsTypes>
type GetStateType = () => AppStateType
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> 

export const getUsers = (currentPage: number, pageSize: number)=> async (dispatch: CurrentDispatchType, getState: GetStateType) => {
        dispatch(actions.setCurrentPage(currentPage))
        dispatch(actions.toggleIsFetching(true))
        let usersData = await usersAPI.getUsers(currentPage, pageSize)
            dispatch(actions.setUsers(usersData.items))
            dispatch(actions.setTotalUsersCount(usersData.totalCount))
            dispatch(actions.toggleIsFetching(false))
}

export const follow = (id: number): ThunkType => async (dispatch, getState) => {
        dispatch(actions.toggleFollowingProgress(true, id))
            let followData = await usersAPI.follow(id)
            if (followData.resultCode === ResultCodesEnum.Success) {
                dispatch(actions.followSuccess(id))
            }
            dispatch(actions.toggleFollowingProgress(false, id))
}


export const unfollow = (id: number): ThunkType => async (dispatch, getState) => {
        dispatch(actions.toggleFollowingProgress(true, id))
        let unfollowData = await usersAPI.unfollow(id)
            if (unfollowData.resultCode === ResultCodesEnum.Success) {
                dispatch(actions.unfollowSuccess(id))
            }
            dispatch(actions.toggleFollowingProgress(false, id))
}

export default usersReducer;