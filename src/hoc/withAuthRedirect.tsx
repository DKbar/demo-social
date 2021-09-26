import React from "react";
import { connect } from "react-redux";

import { Redirect } from "react-router";
import { AppStateType } from "../redux/redux-store";

type MapStatePropsType = {
    isAuth: boolean
}
type MapDispatchPropsType = {
}


let mapStateToProps = (state: AppStateType) =>{
    return{
        isAuth: state.auth.isAuth,
    }
}

export function WithAuthRedirect<WCP> (Component: React.ComponentType<WCP>) {
    let RedirectComponent:React.FC<MapStatePropsType & MapDispatchPropsType> =  (props) => {
            let {isAuth, ...restProps} = props 
            if (!props.isAuth) return <Redirect to='/login'></Redirect>
            return <Component {...restProps as WCP} /> 
    }

    let ConnectedAuthRedirectComponent = connect<MapStatePropsType, {}, WCP, AppStateType>(mapStateToProps)(RedirectComponent)
    return ConnectedAuthRedirectComponent;
}