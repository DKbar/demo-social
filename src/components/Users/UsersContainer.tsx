import React from "react";
import { connect } from "react-redux";
import { /* setCurrentPage, */ getUsers, follow, unfollow } from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/preloader/Preloader";
import { compose } from "redux";
import { getUsersSelect, getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount } from "../../redux/users-selector";
import Paginator from "../common/Paginator/Paginator";
import s from "./Users.module.css"
import { UsersType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";
/* import { WithAuthRedirect } from "../../hoc/withAuthRedirect"; */


type MapStatePropsType = {
    currentPage: number
    pageSize: number 
    isFetching: boolean
    totalUsersCount: number
    users: Array<UsersType>
    followingInProgress: Array<number>
} 

type MapDispatchPropsType = {
    getUsers: (currentPage: number, pageSize: number) => void
    unfollow: (userid: number) => void
    follow: (userid: number) => void
    /* onPageChange: (page: number) => void    */                 

}

type MapOwnPropsType={

}

type PropsType = MapStatePropsType &  MapDispatchPropsType & MapOwnPropsType

class UsersContainer extends React.Component<PropsType> {


    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)

    }
/*     showmore = (page) => {
        this.props.getUsers(page, this.props.pageSize)
    } */

    onPageChange = (page: number) => {                             
        this.props.getUsers(page, this.props.pageSize)
    }
    render() {

        return <>
            <div className={s.users}> 
            <Paginator currentPage={this.props.currentPage} onPageChange={this.onPageChange}
                       totalItemsCount={this.props.totalUsersCount} pageSize={this.props.pageSize} />
                {this.props.isFetching ? <Preloader /> :
                    
                    <div className={s.users}>
                        < Users totalUsersCount={this.props.totalUsersCount}
                        pageSize={this.props.pageSize}
                        currentPage={this.props.currentPage}
                      /*   onPageChange={this.onPageChange} */
                        users={this.props.users}
                        /*   isFetching={this.props.isFetching} */
                        /* showmore={this.showmore} */
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

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsersSelect(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

// <TStateProps = {}, no_dispatch = {}, TOwnProps = {}, State = DefaultState>
export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, MapOwnPropsType, AppStateType>(mapStateToProps, { /* setCurrentPage, */ getUsers, follow, unfollow }),
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