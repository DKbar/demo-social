import React from 'react';
/* import s from './Profile.module.css' */
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import { ProfileType } from '../../types/types';

type PropsType = {
    profile: ProfileType | null
    isOwner:boolean
    status: string
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

const Profile: React.FC<PropsType> = (props) => {

    return (
        <div>
            <ProfileInfo
                profile={props.profile}
                isOwner={props.isOwner}
                status={props.status} 
                updateStatus={props.updateStatus}
                savePhoto={props.savePhoto}
                saveProfile={props.saveProfile}/>
            <MyPostsContainer /* store={props.store} */
            /*                 postsData={props.profilePage.postsData}
                            newPostText={props.profilePage.newPostText}
                            dispatch={props.dispatch} */
            />
        </div>
    )
}

export default Profile;