import React from "react";
import { NavLink } from "react-router-dom";
import s from './User.module.css'
import userPhoto from '../../../assets/images/user.png'


const User = (props) => {
    
   let path = 'profile/' + props.id;
    return (
    <div className={s.user} >
         <NavLink to={path} >
        <img src={props.photos != null ? props.photos : userPhoto} /> 
        <div> {props.name}</div>
        </NavLink>
        <div >  
        {props.status != null ? props.status : "no status"}
        </div>

    </div>
    )
}

export default User;
/* 

<User id={user.id} name={user.name} uniqueUrlName={user.uniqueUrlName}
photos={user.photos.small} photol={user.photos.large} status={user.status} friend={user.friend} />  */