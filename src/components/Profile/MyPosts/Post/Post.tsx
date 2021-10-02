import s from './Post.module.css'
import img from '../../../../assets/images/IMG_React.png'

type PropsType = {
    likesCount: number
    message: string
}

const Post: React.FC<PropsType> = (props) => {
    return (
        <div className={s.item}>
            <img src={img} alt=""/>
            {props.message}
            <div> 
                <span className={s.heart}>&#9825;</span>
                {props.likesCount}
            </div>
        </div>

    )
}

export default Post;