import React from 'react';
import { NavLink } from 'react-router-dom';
import { DialogType } from '../../redux/dialogs-reducer';
import s from './Navbar.module.css'



type PropsType = {
    friends: Array<DialogType> 

}

const Navbar: React.FC<PropsType> = ({friends}) => {
   
    let friends1 = friends.map(friend => { 
        return (
            <NavLink  to={friend.name} key={friend.id}>

                <img src={friend.img} alt=""></img>
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
                <div className={s.icon} >{friends1}</div>
            </div>
            
        </nav>
    )
}

export default Navbar;