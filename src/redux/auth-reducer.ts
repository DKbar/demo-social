import { InferActionsTypes, BaseThunkType } from './redux-store';
import { ResultCodesForCaptcha } from './../api/api';
import { FormAction, stopSubmit } from "redux-form";
import { ResultCodesEnum } from "../api/api";
import { authAPI } from '../api/auth-api';
import { securityAPI } from '../api/security-api';

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>


const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                ...action.data,
            };
        case 'GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                captchaUrl: action.captchaUrl
            };
        default:
            return state;
    }
}

const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => (
         {   type: 'SET_USER_DATA',
            data: { userId, email, login, isAuth }
        } as const),
    
     getCaptchaUrlSuccess: (captchaUrl: string) => ({type: 'GET_CAPTCHA_URL_SUCCESS', captchaUrl}) as const
}



export const getAuth = (): ThunkType => async (dispatch) => {
    let authData = await authAPI.getAuth()
    if (authData.resultCode === ResultCodesEnum.Success) {
        let { id, email, login } = authData.data;
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => { 
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
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export const logout = (): ThunkType => async (dispatch) => {
    let logoutData = await authAPI.logout()
    if (logoutData.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

export default authReducer;
