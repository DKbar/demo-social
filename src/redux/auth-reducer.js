import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";


const  SET_USER_DATA = 'ADD-SET_USER_DAT';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
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
        default:
            return state;
    }
}



export const setAuthUserData = (userId, email, login, isAuth) => {
    return {
        type: SET_USER_DATA,
        data: {userId, email, login, isAuth},
    }
};
 
export const getAuth = ()=>{
    return async (dispatch)=>{
        return authAPI.getAuth().then(data => {
            if (data.resultCode === 0) {
                let { id, email, login } = data.data;
                dispatch(setAuthUserData(id, email, login, true))
            }
        });
    }
}

export const login = (email, password, rememberMe)=>{
    return (dispatch)=>{
        authAPI.login(email, password, rememberMe).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuth())
            } else {
                let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
                dispatch(stopSubmit("login", {_error: message}))
            }
        });
    }
}

export const logout = ()=>{
    return (dispatch)=>{
        authAPI.logout().then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        });
    }
}

export default authReducer;