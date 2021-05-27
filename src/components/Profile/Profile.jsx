import React from 'react';
/* import s from './Profile.module.css' */
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';



const Profile = (props) => {

    
    return (
        <div>
            <ProfileInfo
                profile={props.profile}
                isOwner={props.isOwner}
                status={props.status} 
                updateStatus={props.updateStatus}
                savePhoto={props.savePhoto}/>
            <MyPostsContainer /* store={props.store} */
            /*                 postsData={props.profilePage.postsData}
                            newPostText={props.profilePage.newPostText}
                            dispatch={props.dispatch} */
            />
        </div>
    )
}

export default Profile;