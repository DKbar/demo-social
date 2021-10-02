import React, { Component } from 'react'
import Profile from './Profile'
import { connect } from 'react-redux';
import { getProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../../redux/profile-reducer';
import { RouteComponentProps, withRouter } from 'react-router';
/* import { WithAuthRedirect } from '../../hoc/withAuthRedirect'; */
import { compose } from 'redux';
import { ProfileType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';


type MSPT = {
    profile: ProfileType | null
    status: string
    authorizedUserId: number | null
    isAuth: boolean
}

type MDPT = {
    getProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

type PathParamType = {
    userId: string
}


type PropsType = MSPT & MDPT & RouteComponentProps<PathParamType>


class ProfileContainer extends Component<PropsType> {

    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId;
        if (!userId /* && this.props.isAuth */) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push("/users")
            }
        }
        if (!userId) {
            /* throw new Error("ID should exists in URI params or in state" ('autorizedUserId')") */
            console.error("ID should exists in URI params or in state ('autorizedUserId')")
        } else {
            this.props.getProfile(userId as number);
            this.props.getStatus(userId as number)
        }
    }



    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: PropsType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }

    }

    render() {

        return (
            <div>
                <Profile {...this.props}
                    isOwner={!this.props.match.params.userId}
                    profile={this.props.profile}
                    status={this.props.status}
                    updateStatus={this.props.updateStatus}
                    savePhoto={this.props.savePhoto}
                /* saveProfile={this.props.saveProfile} */
                />
            </div>
        )
    }
}


let mapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    }
}

export default compose<React.ComponentType>(
    connect/* <MSPT, MDPT, null, AppStateType> */(mapStateToProps, { getProfile, getStatus, updateStatus, savePhoto, saveProfile }),
    withRouter,
    /* WithAuthRedirect */
)(ProfileContainer)
