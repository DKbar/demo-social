import React from "react";
import { connect } from "react-redux";
import { setCurrentPage, getUsers, follow, unfollow } from "../../redux/users-reducer";
import Users from "./Users";
import Prelodaer from "../common/preloader/Preloader";
import { compose } from "redux";
import { getUsersSelect, getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount } from "../../redux/users-selector";
import Paginator from "../common/Paginator/Paginator";
import s from "./Users.module.css"
/* import { WithAuthRedirect } from "../../hoc/withAuthRedirect"; */



class UsersContainer extends React.Component {


    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)

    }
    showmore = (page) => {
        this.props.getUsers(page, this.props.pageSize)
    }

    onPageChange = (page) => {
        this.props.getUsers(page, this.props.pageSize)
    }
    render() {

        return <>
            <div className={s.users}> <Paginator currentPage={this.props.currentPage} onPageChange={this.onPageChange}
                totalItemsCount={this.props.totalUsersCount} pageSize={this.props.pageSize} />
                {this.props.isFetching ? <Prelodaer /> :
                    
                    <div className={s.users}>
                        < Users totalUsersCount={this.props.totalUsersCount}
                        pageSize={this.props.pageSize}
                        currentPage={this.props.currentPage}
                        onPageChange={this.onPageChange}
                        users={this.props.users}
                        /*   isFetching={this.props.isFetching} */
                        showmore={this.showmore}
                        followingInProgress={this.props.followingInProgress}
                        follow={this.props.follow}
                        unfollow={this.props.unfollow}
                    />
                    </div>
                }
            </div>

        </>
    }
}

let mapStateToProps = (state) => {

    return {
        users: getUsersSelect(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}


export default compose(
    connect(mapStateToProps, { setCurrentPage, getUsers, follow, unfollow }),
    /*    WithAuthRedirect */
)(UsersContainer);

/* let mapDispatchToProps = (dispatch) => {

    return {
        addToFriends: (id) => {
            dispatch(followAC(id))
        },
        removeFromFriends: (id) => {
            dispatch(unfollowAC(id))
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users))
        },
        pageChange: (page) => {
            dispatch(setCurrentPageAC(page))
        },

        setTotalUsersCount: (usersCount) => {
            dispatch(setTotalUsersCountAC(usersCount))
        },

        toggleIsFetching: (isFetching) => {
            dispatch(toggleIsFetchingAC(isFetching))
        }
    }
} */