import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css'


const Header = (props) => {
    return (
        <header className={s.header}>
            <img src='http://pngimg.com/uploads/car_logo/car_logo_PNG1640.png' />

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