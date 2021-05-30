import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/api"


const ADD_POST = 'ADD-POST';
const DELETE_POST = 'DELETE_POST';
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS"
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS"
let initialState = {
    postsData: [
        { id: 0, message: 'Hi', likesCount: 14 },
        { id: 1, message: 'It\'s my first post', likesCount: 18 }
    ],
    profile: null,
    status: "",
}

const profileReducer = (state = initialState, action) => {
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
                    postsData: state.postsData.filter( p => p.id != action.postId )
                    
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
                profile: {...state.profile, photos:action.photos},

            };
        default:
            return state;
    }
}

export const addPost = (newPost) => {
    return {
        type: ADD_POST,
        newPost
        
    }
};

export const deletePost = (postId) => {
    return {
        type: DELETE_POST,
        postId
        
    }
};

export const setUserProfile = (profile) => {
    return {
        type: SET_USER_PROFILE,
        profile: profile,
    }
};
export const setStatus = (status) => {
    return {
        type: SET_STATUS,
        status: status,
    }
};

export const savePhotoSuccess = (photos) => {
    return {
        type: SAVE_PHOTO_SUCCESS,
        photos
    }
};


export const getProfile = (userId) => {
    return async (dispatch) => {
       const response = await profileAPI.getProfile(userId)
            dispatch(setUserProfile(response.data))
    }
}

/* export const getStatus = (userId) => {
    return (dispatch) => {
        profileAPI.getStatus(userId).then(response => {
            dispatch(setStatus(response.data))
        });
    }
} */
export const getStatus = (userId) => {
    return async (dispatch) => {
       const response = await profileAPI.getStatus(userId)
            dispatch(setStatus(response.data))
    }
}
export const updateStatus = (status) => {
    return async (dispatch) => {
       const response = await profileAPI.updateStatus(status)
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status))
            }
    }
}

export const savePhoto = (file) => {
    return async (dispatch) => {
       const response = await profileAPI.savePhoto(file)
            if (response.data.resultCode === 0) {
                dispatch(savePhotoSuccess(response.data.data.photos))
            }
    }
}
export const saveProfile = (profile) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        const response = await profileAPI.saveProfile(profile);
            if (response.data.resultCode === 0) {
                dispatch(getProfile(userId))
            } else {
                dispatch(stopSubmit("editProfile", {_error: response.data.messages[0]}))
                return Promise.reject(response.data.messages[0])
            }
    }
}


export default profileReducer;