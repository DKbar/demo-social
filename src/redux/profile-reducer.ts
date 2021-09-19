import { PostType, ProfileType, PhotosType } from './../types/types';
import { stopSubmit } from "redux-form";
import { ResultCodesEnum } from "../api/api"
import { profileAPI } from '../api/profile-api';

const ADD_POST = 'ADD-POST';
const DELETE_POST = 'DELETE_POST';
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS"
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS"



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

const profileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
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
        case DELETE_POST:

            return {
                ...state,
                postsData: state.postsData.filter(p => p.id !== action.postId)

            };
        case SET_USER_PROFILE:

            return {
                ...state,
                profile: action.profile,

            };

        case SET_STATUS:

            return {
                ...state,
                status: action.status,

            };

        case SAVE_PHOTO_SUCCESS:

            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType

            };
        default:
            return state;
    }
}
type AddPostActionType = {
    type: typeof ADD_POST,
    newPost: string
}

export const addPost = (newPost: string): AddPostActionType => {
    return {
        type: ADD_POST,
        newPost

    }
};

type DeletePostActionType = {
    type: typeof DELETE_POST,
    postId: number
}

export const deletePost = (postId: number): DeletePostActionType => {
    return {
        type: DELETE_POST,
        postId

    }
};

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType,
}

export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => {
    return {
        type: SET_USER_PROFILE,
        profile: profile,
    }
};

type SetStatusActionType = {
    type: typeof SET_STATUS,
    status: string,
}

export const setStatus = (status: string): SetStatusActionType => {
    return {
        type: SET_STATUS,
        status: status,
    }
};


type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS,
    photos: PhotosType
}

export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => {
    return {
        type: SAVE_PHOTO_SUCCESS,
        photos
    }
};


export const getProfile = (userId: number) => async (dispatch: any) => {
    const response = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}

/* export const getStatus = (userId) => {
    return (dispatch) => {
        profileAPI.getStatus(userId).then(response => {
            dispatch(setStatus(response.data))
        });
    }
} */
export const getStatus = (userId: number) =>  async (dispatch: any) => {
        const response = await profileAPI.getStatus(userId)
        dispatch(setStatus(response.data))
}

export const updateStatus = (status: string) => async (dispatch: any) => {
        const StatusData = await profileAPI.updateStatus(status)
        if (StatusData.resultCode === ResultCodesEnum.Success) {
            dispatch(setStatus(status))
        }
}

export const savePhoto = (file: any) => async (dispatch: any) => {
        const photoData = await profileAPI.savePhoto(file)
        if (photoData.resultCode === ResultCodesEnum.Success) {
            dispatch(savePhotoSuccess(photoData.data.photos))
        }
}

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
        const userId = getState().auth.userId;
        const profileData = await profileAPI.saveProfile(profile);
        if (profileData.resultCode === ResultCodesEnum.Success) {
            dispatch(getProfile(userId))
        } else {
            dispatch(stopSubmit("editProfile", { _error: profileData.messages[0] }))
            return Promise.reject(profileData.messages[0])
        }
}


export default profileReducer;