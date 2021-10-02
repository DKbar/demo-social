import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';
import Header from './Header';

type MapStateToPropsType = {
    isAuth: boolean
    userId: number | null
    email: string | null
    login: string | null
/*     captcha: string | null */
}

type MapDispatchToPropsType = {
    logout: () => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType

class HeaderContainer extends React.Component<PropsType> {



    render() {
        return (
            <Header {...this.props} />
        )
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        userId: state.auth.userId,
        email: state.auth.email,
        login: state.auth.login
    }
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType >(mapStateToProps, {logout})(HeaderContainer);


