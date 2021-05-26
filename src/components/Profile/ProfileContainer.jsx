import React, { Component } from 'react'
import Profile from './Profile'
import { connect } from 'react-redux';
import { getProfile, getStatus, updateStatus } from '../../redux/profile-reducer';
import { withRouter } from 'react-router';
/* import { WithAuthRedirect } from '../../hoc/withAuthRedirect'; */
import { compose } from 'redux';


 class ProfileContainer extends Component {

    componentDidMount() {      
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
    render() {

        return (
            <div>
                <Profile {...this.props} 
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
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
    connect(mapStateToProps, {getProfile, getStatus, updateStatus }),
    withRouter,
    /* WithAuthRedirect */
)(ProfileContainer)
