import React from 'react';
import Preloader from '../../common/preloader/Preloader';
import s from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';


const ProfileInfo = ({profile, status, updateStatus}) => {


    return (

        <div>
            <div className={s.content_img}>
                <img src="https://cdn-images-1.medium.com/fit/t/1600/480/1*f6YOOn5Smft7VbPGQUuUZA.jpeg" />
            </div>
            <div className={s.descriptionBlock}>
                {!profile 
                ? <Preloader /> 
                : <div> 
                        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
                        <img src={profile.photos.small} />
                        <div> {profile.aboutMe} </div>
                        <div> {profile.fillName} </div>
                        {profile.lookingForAJob && 
                        <div>{profile.lookingForAJobDescription} </div> } 
                        <div>
                            <div>Контакты:</div>
                            <div>{profile.contacts.facebook}</div>
                            <div>{profile.contacts.github}</div>
                            <div>{profile.contacts.instagram}</div>
                            <div>{profile.contacts.mainLink}</div>
                            <div>{profile.contacts.twitter}</div>
                            <div>{profile.contacts.vk}</div>
                            <div>{profile.contacts.website}</div>
                            <div>{profile.contacts.youtube}</div>    
                        </div>
                    </div>

                }
            </div>
        </div>
    )
}

export default ProfileInfo;