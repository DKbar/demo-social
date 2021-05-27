import React, { Component } from 'react'
import Profile from './Profile'
import { connect } from 'react-redux';
import { getProfile, getStatus, updateStatus, savePhoto } from '../../redux/profile-reducer';
import { withRouter } from 'react-router';
/* import { WithAuthRedirect } from '../../hoc/withAuthRedirect'; */
import { compose } from 'redux';


 class ProfileContainer extends Component {

    refreshProfile(){
                let userId = this.props.match.params.userId;
        if (!userId /* && this.props.isAuth */){
            userId = this.props.authorizedUserId;
            if(!userId){
                this.props.history.push("/users")
            }
        }
        this.props.getProfile(userId);
        this.props.getStatus(userId)
    }

    componentDidMount() {      
        this.refreshProfile();
    }

    componentDidUpdate(prevProps){
        if (this.props.match.params.userId != prevProps.match.params.userId){
            this.refreshProfile();
        }
        
    }

    render() {

        return (
            <div>
                <Profile {...this.props} 
                isOwner = {!this.props.match.params.userId}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
                savePhoto={this.props.savePhoto}
                />
            </div>
        )
    }
}


let mapStateToProps = (state) => {
    return{
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    }
}

export default compose(
    connect(mapStateToProps, {getProfile, getStatus, updateStatus, savePhoto }),
    withRouter,
    /* WithAuthRedirect */
)(ProfileContainer)
