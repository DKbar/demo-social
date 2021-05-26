import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User/User";
import s from './Users.module.css'



let Users = ({ currentPage, onPageChange, totalUsersCount, pageSize, ...props }) => {

    return (
        <div className={s.users}>

            <div >
                {props.users.map((user) => {
                    return (
                        <div className={s.user} key={user.id}>
                            <User id={user.id} name={user.name} uniqueUrlName={user.uniqueUrlName}
                                photos={user.photos.small} photol={user.photos.large} status={user.status} />
                            <div>
                                {user.followed
                                    ? <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {
                                        props.unfollow(user.id)
                                    }}>Unfollow</button>
                                    : <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => { ///???
                                        props.follow(user.id)
                                    }}>Follow</button>}
                            </div>
                        </div>
                    )
                })
                }
                <button onClick={() => props.showmore(props.currentPage)}>show more</button>
            </div>
        </div>
    )

}





export default Users;