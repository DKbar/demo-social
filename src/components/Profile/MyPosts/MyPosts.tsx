/* import { addPostActionCreator, postChangeActionCreator } from '../../../redux/profile-reducer'; */
import s from './MyPosts.module.css';
import Post from './Post/Post';
import MyPostReduxForm from "./MyPostForm"
import { PostType } from '../../../types/types';
import React from 'react';

export type MapPropsType = {
    postsData: Array<PostType>
}

export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}
type PropsType = MapPropsType & DispatchPropsType

/* type AddPostFormValuesType = {
    newPost: string
} */

const MyPosts: React.FC<PropsType> = React.memo(props => {
    let postsElement =
        [...props.postsData]
            .reverse()
            .map(post => {
                return <Post key={post.id} message={post.message} likesCount={post.likesCount} />
            })


    const onSubmit = (values: any) => { //any
        props.addPost(values.newPost);
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <MyPostReduxForm onSubmit={onSubmit} />
            <div className={s.posts}>
                {postsElement}
            </div>
        </div>
    )
})

export default MyPosts;