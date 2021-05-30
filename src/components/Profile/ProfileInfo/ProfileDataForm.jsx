import { reduxForm } from "redux-form";
import s from './ProfileInfo.module.css'
import { createField, Input, Textarea } from "../../common/FormsControls/FormsControls";
import style from "../../common/FormsControls/FormsControls.module.css"

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
    return <form onSubmit={handleSubmit}>
        <div><button onClick={() => { }}>Save</button></div>
        {error
            ? <div className={style.formError}>
                {error}
            </div>
            : null}
        <div>
            <b>Full Name</b>: {createField("Full name", "fullName", [], Input)}
        </div>
        <div>
            <b>Looking for a job</b>: {createField("", "lookingForAJob", [], Input, { type: 'checkbox' })}
        </div>
        <div>
            <b>My professional skills</b>: {createField("My professional skills", "lookingForAJobDescription", [], Textarea)}
        </div>
        <div>
            <b>About me</b>: {createField("About me", "aboutMe", [], Textarea)}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <div key={key} className={s.contacts}>
                    <b>{key}</b>: {createField(key, "contacts." + key, [], Input)}
                </div>
            })}
        </div>
    </form>
}


const ProfileDataReduxForm = reduxForm({ form: 'editProfile' })(ProfileDataForm)

export default ProfileDataReduxForm;
