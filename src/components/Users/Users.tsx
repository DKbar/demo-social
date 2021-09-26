import React from "react";
import { UsersType } from "../../types/types";
import User from "./User/User";
import s from './Users.module.css'

type PropsType = {
    currentPage: number
    totalUsersCount: number
    pageSize: number
    users: Array<UsersType>
    followingInProgress: Array<number>
    unfollow: (id: number) => void
    follow: (id: number) => void
    /* showmore: (currentPage: number) => void */
    /* onPageChange: () => void */
}

let Users: React.FC<PropsType> = ({ currentPage, /* onPageChange, */ totalUsersCount, pageSize, ...props }) => {

    return (
        <div className={s.users}>

            <div >
                {props.users.map((user) => {
                    return (
                        <div className={s.user} key={user.id}>
                            <User id={user.id} name={user.name} /* uniqueUrlName={user.uniqueUrlName} */
                                photos={user.photos}  status={user.status} />
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
                {/* <button onClick={() => props.showmore(currentPage)}>show more</button> */}
            </div>
        </div>
    )

}





export default Users;