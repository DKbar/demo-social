import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";


const SET_USER_DATA = 'ADD-SET_USER_DAT';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';


/* export type InitialStateType2 = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null

} */
let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                userId11: '555',
                /*  isAuth:action.data.isAuth */
            };
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                captchaUrl: action.captchaUrl
            };
        default:
            return state;
    }
}
type SetAuthUserDataActionDataType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    data: SetAuthUserDataActionDataType
}


export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => {
    return {
        type: SET_USER_DATA,
        data: { userId, email, login, isAuth },
    }
};


type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    captchaUrl: string,                       //payload: {captchaUrl: string}
}


export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => {
    return {
        type: GET_CAPTCHA_URL_SUCCESS,
        captchaUrl
    }
};

export const getAuth = () => async (dispatch: any) => {
    let response = await authAPI.getAuth()
    if (response.data.resultCode === 0) {
        let { id, email, login } = response.data.data;
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(getAuth())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
        dispatch(stopSubmit("login", { _error: message }))

    }
}

export const getCaptchaUrl = () => async (dispatch:any) => {
         let response = await securityAPI.getCaptchaUrl()
            const captchaUrl = response.data.url;
            dispatch(getCaptchaUrlSuccess(captchaUrl))
}


export const logout = () => async (dispatch: any) => {
        let response = await authAPI.logout()
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
}

export default authReducer;
