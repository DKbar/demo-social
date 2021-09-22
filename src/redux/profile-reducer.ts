import { PostType, ProfileType, PhotosType } from './../types/types';
import { FormAction, stopSubmit } from "redux-form";
import { ResultCodesEnum } from "../api/api"
import { profileAPI } from '../api/profile-api';
import { InferActionsTypes, BaseThunkType } from './redux-store';

let initialState = {
    postsData: [
        { id: 0, message: 'Hi', likesCount: 14 },
        { id: 1, message: 'It\'s my first post', likesCount: 18 },
        { id: 2, message: 'It\'s my second post', likesCount: 29 },
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '' as string,
    newPostText: ''
}

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'ADD_POST':
            let newPost = {
                id: 3,
                message: action.newPost,
                likesCount: 0
            };
            return {
                ...state,
                postsData: [...state.postsData, newPost],
                newPostText: '',
            };
        case 'DELETE_POST':

            return {
                ...state,
                postsData: state.postsData.filter(p => p.id !== action.postId)

            };
        case 'SET_USER_PROFILE':

            return {
                ...state,
                profile: action.profile,

            };

        case 'SET_STATUS':

            return {
                ...state,
                status: action.status,

            };

        case 'SAVE_PHOTO_SUCCESS':

            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType

            };
        default:
            return state;
    }
}

export const actions = {
    addPost: (newPost: string) => ({
        type: 'ADD_POST',
        newPost
    }) as const,

    deletePost: (postId: number) => ({

        type: 'DELETE_POST',
        postId

    }) as const,

    setUserProfile: (profile: ProfileType) => ({
        type: 'SET_USER_PROFILE',
        profile: profile,
    }) as const,

    setStatus: (status: string) => ({
        type: 'SET_STATUS',
        status: status,

    }) as const,

    savePhotoSuccess: (photos: PhotosType) => ({
        type: 'SAVE_PHOTO_SUCCESS',
        photos
    }) as const,


}



/* export const getStatus = (userId) => {
    return (dispatch) => {
        profileAPI.getStatus(userId).then(response => {
            dispatch(setStatus(response.data))
        });
    }
} */


export const getProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data))
}
export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    const statusData = await profileAPI.updateStatus(status)
    if (statusData.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setStatus(status))
    }
}

export const savePhoto = (file: any): ThunkType => async (dispatch) => {   //???
    const photoData = await profileAPI.savePhoto(file)
    if (photoData.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.savePhotoSuccess(photoData.data.photos))
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const profileData = await profileAPI.saveProfile(profile);
    if (profileData.resultCode === ResultCodesEnum.Success) {
        if (userId != null) {
            dispatch(getProfile(userId))
        } else {
            throw new Error ( "userId can't be null")
        }
    } else {
        dispatch(stopSubmit("editProfile", { _error: profileData.messages[0] }))
        return Promise.reject(profileData.messages[0])
    }
}


export default profileReducer;