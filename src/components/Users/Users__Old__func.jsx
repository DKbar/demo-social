import * as axios from "axios";
import React from "react";
import User from "./User/User";
import s from './Users.module.css'

const Users = (props) => {
    if (props.users.length === 0){
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response =>{
            props.setUsers(response.data.items)
        });
    }

    let addFriends = (id) => {
        props.addToFriends(id);
    }

    let removeFriends = (id) => {
        props.removeFromFriends(id);
    }

    let result = props.users.map((user) => {
        return (<div className={s.users} key={user.id}>
{/*             <User id={user.id} name={user.name} age={user.age} //получали из локальных данных
                country={user.country} city={user.city} friend={user.friend} /> */}
                 <User id={user.id} name={user.name} uniqueUrlName={user.uniqueUrlName}
                photos={user.photos.small} photol={user.photos.large} status={user.city} /* friend={user.friend} */ /> 
            <div>
                {user.followed
                    ? <button onClick={() => removeFriends(user.id)}>unfollow</button>
                    : <button onClick={() => addFriends(user.id)}>follow</button>}
            </div>
        </div>)

    })
    return (
        <div>
            {result}
        </div>)
}


export default Users;