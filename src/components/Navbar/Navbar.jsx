import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css'

const Navbar = (props) => {
   
    let friends = props.friends.map(friend => { 
        return (
            <NavLink  to={friend.name} key={friend.id}>

                <img src={friend.img}></img>
                <span>{friend.name}</span>

            </NavLink>
     
        )
    })

    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to="/profile"
                    activeClassName={s.activeLink}
                >Profile</NavLink>
            </div>

            <div className={`${s.item} ${s.active}`}>
                <NavLink to="/dialogs"
                    activeClassName={s.activeLink}
                >Messages</NavLink>
            </div>

            <div className={s.item}>
                <NavLink to='/news'
                    activeClassName={s.activeLink}
                >News</NavLink>
            </div>

            <div className={s.item}>
                <NavLink to='/music'
                    activeClassName={s.activeLink}
                >Music</NavLink>
            </div>

            <div className={s.item}>
                <NavLink to='/users'
                    activeClassName={s.activeLink}
                >Find Users</NavLink>
            </div>

            <div className={s.item}>
                <NavLink to="/settings"
                    activeClassName={s.activeLink}
                >Settings</NavLink>
            </div>

            <div className={s.friends}>
                <div>Friends</div>
                <div className={s.icon} >{friends}</div>
            </div>
            
        </nav>
    )
}

export default Navbar;