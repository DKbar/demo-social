import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css'
import header from '../../assets/images/header.png'


const Header = (props) => {
    return (
        <header className={s.header}>
            <img src={header} />

        <div className={s.loginBlock}>
            {props.isAuth ? 
            <div> 
                {props.login} - <button onClick = {props.logout}>logout</button> 
            </div> 
            :<NavLink to="/login">Login</NavLink>}
           
        </div>
        </header>
    )
}

export default Header;