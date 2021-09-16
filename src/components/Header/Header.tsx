import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css'
import header from '../../assets/images/header.png'

type PropsType = {
    isAuth: boolean
    login: string | null
    logout: () => void

}

const Header: React.FC<PropsType> = ({isAuth, login, logout}) => {
    return (
        <header className={s.header}>
            <img src={header} alt="" />

        <div className={s.loginBlock}>
            {isAuth ? 
            <div> 
                {login} - <button onClick = {logout}>logout</button> 
            </div> 
            :<NavLink to="/login">Login</NavLink>}
           
        </div>
        </header>
    )
}

export default Header;