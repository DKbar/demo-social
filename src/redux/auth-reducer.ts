import { AppStateType } from './redux-store';
import { ResultCodesForCaptcha } from './../api/api';
import { stopSubmit } from "redux-form";
import { ResultCodesEnum } from "../api/api";
import { ThunkAction } from 'redux-thunk';
import { authAPI } from '../api/auth-api';
import { securityAPI } from '../api/security-api';


const SET_USER_DATA = 'ADD-SET_USER_DAT';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

export type InitialStateType = typeof initialState;

type ActionsType = SetAuthUserDataActionType | GetCaptchaUrlSuccessActionType


const authReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
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
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const getAuth = (): ThunkType => async (dispatch) => {
    let authData = await authAPI.getAuth()
    if (authData.resultCode === ResultCodesEnum.Success) {
        let { id, email, login } = authData.data;
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | any):ThunkType => async (dispatch: any) => { //any
    let loginData = await authAPI.login(email, password, rememberMe, captcha)
    if (loginData.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuth())
    } else {
        if (loginData.resultCode === ResultCodesForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        let message = loginData.messages.length > 0 ? loginData.messages[0] : "Some error"
        dispatch(stopSubmit("login", { _error: message }))

    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let captchaData = await securityAPI.getCaptchaUrl()
    const captchaUrl = captchaData.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logout = (): ThunkType => async (dispatch) => {
    let logoutData = await authAPI.logout()
    if (logoutData.resultCode === ResultCodesEnum.Success) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export default authReducer;
