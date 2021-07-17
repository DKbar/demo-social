import React from 'react';
import s from './Post.module.css'
import img from '../../../../assets/images/IMG_React.png'

const Post = (props) => {
    console.log (11)
    return (
        <div className={s.item}>
            <img src={img}/>
            {props.message}
            <div> 
                <span className={s.heart}>&#9825;</span>
                {props.likesCount}
            </div>
        </div>

    )
}

export default Post;