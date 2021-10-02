import React, { ChangeEvent, useState } from 'react';
import Preloader from '../../common/preloader/Preloader';
import s from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/images/user.png'
import ProfileDataForm from './ProfileDataForm'
import { ContactsType, ProfileType } from '../../../types/types';


type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void 
    isOwner: boolean
    savePhoto: (photo: File) => void
    saveProfile: (arg: ProfileType) => Promise<any>
}

const ProfileInfo: React.FC<PropsType> = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {
    const [editMode, setEditMde] = useState(false);
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0])
        }
    }
/*     const onSubmit = async (formData) => {
        await saveProfile(formData)
           setEditMde(false);
    } */
    const onSubmit = (formData: ProfileType) => {
        saveProfile(formData).then(()=>{
           setEditMde(false);
        })
 
    }

    return (

        <div>
            <div className={s.content_img}>
                <img src="https://cdn-images-1.medium.com/fit/t/1600/480/1*f6YOOn5Smft7VbPGQUuUZA.jpeg" alt=""/>
            </div>
            <div className={s.descriptionBlock}>
                {!profile
                    ? <Preloader />
                    : <div>
                        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
                        <img src={profile.photos.small || userPhoto} className={s.mainPhoto} alt = ""/>
                        <div>
                            {isOwner ? <input type="file" onChange={onMainPhotoSelected} /> : null}
                        </div>
                        {editMode
                            ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
                            : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => { setEditMde(true) }} />}
                    </div>
                }
            </div>
        </div>
    )
}

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}
const ProfileData: React.FC<ProfileDataPropsType> = ({ profile, isOwner, goToEditMode }) => {
    return <div>
        {isOwner
            ? <div><button onClick={goToEditMode}>Edit</button></div>
            : null}

        <div> <b>Full Name</b>: {profile.fullName} </div>
        {profile.lookingForAJob &&
            <div>{profile.lookingForAJobDescription} </div>}
        <div>
            <div> <b>About me</b>:  {profile.aboutMe} </div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]} />
            })}
        </div>
    </div>
}
type ContactPropsType = {
    contactTitle: string
    contactValue: string | null
}
const Contact: React.FC<ContactPropsType> = ({ contactTitle, contactValue }) => {
    return <div className={s.contacts}>
        <b>{contactTitle}</b>: {contactValue}
    </div>

}

export default ProfileInfo;

