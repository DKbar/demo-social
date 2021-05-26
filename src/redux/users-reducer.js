import { usersAPI } from "../api/api"


const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOOGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'
let initialState = {
    users: [],
    pageSize: 20,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
    /*     users: [
            { id: 0, name: 'Dima', age: '35', country: 'Russia', city: 'Moscow', friend: true },
            { id: 1, name: 'Olya', age: '30', country: 'Russia', city: 'Novosibirsk', friend: true },
            { id: 2, name: 'Vera', age: '20', country: 'Russia', city: 'Novosibirsk', friend: true },
            { id: 3, name: 'Vasya', age: '35', country: 'Russia', city: 'Moscow', friend: false },
            { id: 4, name: 'Petya', age: '30', country: 'Russia', city: 'Novosibirsk', friend: false },
            { id: 5, name: 'Gena', age: '20', country: 'Russia', city: 'Novosibirsk', friend: false },
        ],
        www: 111, */

};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            /*             let stateCopy = { ...state }
                        stateCopy.users = [...state.users]
                        stateCopy.users[action.userid] = { ...state.users[action.userid] }
                        stateCopy.users[action.userid].friend = true
                        return stateCopy */
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userid) {
                        return { ...u, followed: true }
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userid) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
            }
        case SET_USERS:
            return { ...state, users: [...action.users] }

        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.page }

        case SET_TOTAL_USERS_COUNT:
            return { ...state, totalUsersCount: action.usersCount }
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }

        default:
            return state;
    }
}

export const followSuccess = (id) => {

    return {
        type: FOLLOW,
        userid: id
    }
};

export const unfollowSuccess = (id) => {

    return {
        type: UNFOLLOW,
        userid: id
    }
};


export const setUsers = (users) => {

    return {
        type: SET_USERS,
        users: users
    }
};

export const setCurrentPage = (page) => {

    return {
        type: SET_CURRENT_PAGE,
        page: page
    }
}

export const setTotalUsersCount = (usersCount) => {

    return {
        type: SET_TOTAL_USERS_COUNT,
        usersCount
    }
}

export const toggleIsFetching = (isFetching) => {

    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    }
}
export const toggleFollowingProgress = (isFetching, userId) => {

    return {
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        isFetching,
        userId
    }
}

export const getUsers = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(setCurrentPage(currentPage))
        dispatch(toggleIsFetching(true));
        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
            dispatch(toggleIsFetching(false))

        });
    }
}

export const follow = (id) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, id))
        usersAPI.follow(id).then(data => {
            if (data.resultCode === 0) {
                dispatch(followSuccess(id))
            }
            dispatch(toggleFollowingProgress(false, id))
        });
    }
}


export const unfollow = (id) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, id))
        usersAPI.unfollow(id).then(data => {
            if (data.resultCode === 0) {
                dispatch(unfollowSuccess(id))
            }
            dispatch(toggleFollowingProgress(false, id))
        })
    }
}

export default usersReducer;