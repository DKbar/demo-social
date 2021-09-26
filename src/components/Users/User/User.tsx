import React from "react";
import { NavLink } from "react-router-dom";
import s from './User.module.css'
import userPhoto from '../../../assets/images/user.png'
import { PhotosType } from "../../../types/types";

type PropsType = {
    photos: PhotosType
    name: string
    status: string
    id: number
}

const User: React.FC<PropsType> = (props) => {
    
   let path = 'profile/' + props.id;
    return (
    <div className={s.user} >
         <NavLink to={path} >
        <img src={props.photos.small != null ? props.photos.small : userPhoto}  alt=""/> 
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