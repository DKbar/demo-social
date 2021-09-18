import { AppStateType } from './redux-store';
import { UsersType } from './../types/types';
import { usersAPI } from "../api/api"
import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';


const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'



let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 20 as number,
    totalUsersCount: 0 as number,
    currentPage: 1,
    isFetching: true as boolean,
    followingInProgress: [] as Array<number>  //array of users id
}

export type InitialStateType = typeof initialState

type ActionsTypes = FollowSuccessActionType | UnfollowSuccessActionType | SetUsersActionType |
    SetCurrentPageActionType | SetTotalUsersCountActionType | ToggleIsFetchingActionType |
    ToggleFollowingProgressActionType

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    debugger
    switch (action.type) {
        case FOLLOW:
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
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userid) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
            }
        case SET_USERS:
            return { ...state, users: [...action.users] }

        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.page }

        case SET_TOTAL_USERS_COUNT:
            return { ...state, totalUsersCount: action.usersCount }
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
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


type FollowSuccessActionType = {
    type: typeof FOLLOW,
    userid: number
}
export const followSuccess = (id: number): FollowSuccessActionType => {
    return {
        type: FOLLOW,
        userid: id
    }
}

type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW,
    userid: number
}
export const unfollowSuccess = (id: number): UnfollowSuccessActionType => {
    return {
        type: UNFOLLOW,
        userid: id
    }
}

type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UsersType>
}
export const setUsers = (users: any): SetUsersActionType => {
    return {
        type: SET_USERS,
        users
    }
}

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE,
    page: number
}
export const setCurrentPage = (page: number): SetCurrentPageActionType => {
    return {
        type: SET_CURRENT_PAGE,
        page: page
    }
}

type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    usersCount: number
}
export const setTotalUsersCount = (usersCount: number): SetTotalUsersCountActionType => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        usersCount
    }
}

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    }
}

type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        isFetching,
        userId
    }
}

type CurrentDispatchType = Dispatch<ActionsTypes>
type GetStateType = () => AppStateType
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> 

export const getUsers = (currentPage: number, pageSize: number)=> async (dispatch: CurrentDispatchType, getState: GetStateType) => {
        dispatch(setCurrentPage(currentPage))
        dispatch(toggleIsFetching(true))
        let response = await usersAPI.getUsers(currentPage, pageSize)
            dispatch(setUsers(response.data.items))
            dispatch(setTotalUsersCount(response.data.totalCount))
            dispatch(toggleIsFetching(false))
}

export const follow = (id: number): ThunkType => async (dispatch, getState) => {
        dispatch(toggleFollowingProgress(true, id))
            let response = await usersAPI.follow(id)
            if (response.data.resultCode === 0) {
                dispatch(followSuccess(id))
            }
            dispatch(toggleFollowingProgress(false, id))
}


export const unfollow = (id: number): ThunkType => async (dispatch, getState) => {
        dispatch(toggleFollowingProgress(true, id))
        let response = await usersAPI.unfollow(id)
            if (response.data.resultCode === 0) {
                dispatch(unfollowSuccess(id))
            }
            dispatch(toggleFollowingProgress(false, id))
}

export default usersReducer;