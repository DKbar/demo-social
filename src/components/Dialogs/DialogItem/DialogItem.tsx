import { NavLink } from 'react-router-dom';
import s from './DialogItem.module.css';

type PropsType = {
    id: number
    img: string
    name: string
}

const DialogItem: React.FC<PropsType> = ({id, img, name}) => {
    let path = "/dialogs/" + id;
    return (
        <div className={s.dialog}>
            <img src={img} alt=""></img>
            <NavLink to={path} >
                {name}
            </NavLink>

        </div>
    )
}



export default DialogItem;