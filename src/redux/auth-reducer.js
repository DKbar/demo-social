import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";


const SET_USER_DATA = 'ADD-SET_USER_DAT';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state = initialState, action) => {
    /* debugger */

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



export const setAuthUserData = (userId, email, login, isAuth) => {
    return {
        type: SET_USER_DATA,
        data: { userId, email, login, isAuth },
    }
};

export const getCaptchaUrlSuccess = (captchaUrl) => {
    return {
        type: GET_CAPTCHA_URL_SUCCESS,
        captchaUrl,
    }
};

export const getAuth = () => {
    return async (dispatch) => {
        return authAPI.getAuth().then(data => {
            if (data.resultCode === 0) {
                let { id, email, login } = data.data;
                dispatch(setAuthUserData(id, email, login, true))
            }
        });
    }
}

export const login = (email, password, rememberMe, captcha) => {
    return (dispatch) => {
        authAPI.login(email, password, rememberMe, captcha).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuth())
            } else {
                if (response.data.resultCode === 10) {
                    dispatch(getCaptchaUrl())
                }
                let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
                dispatch(stopSubmit("login", { _error: message }))

            }
        });
    }
}
export const getCaptchaUrl = () => {
    return (dispatch) => {
        securityAPI.getCaptchaUrl().then(response => {
            const captchaUrl = response.data.url;
            dispatch(getCaptchaUrlSuccess(captchaUrl))
        })
    }
}

export const logout = () => {
    return (dispatch) => {
        authAPI.logout().then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        });
    }
}

export default authReducer;
