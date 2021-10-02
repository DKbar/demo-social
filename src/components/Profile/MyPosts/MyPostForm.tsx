import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { maxLengthCreator, required } from '../../../utils/validators/validators'
import { Textarea } from '../../common/FormsControls/FormsControls';
import style from './MyPostF.module.css'

const maxLength10 = maxLengthCreator(10);

type PropsType = {

}

const MyPostForm: React.FC<InjectedFormProps & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'newPost'} component={Textarea} className={style.newPost}
                    validate={[required, maxLength10]} />
            </div>
            <div>
                <button>Add Post</button>
            </div>
        </form>
    )
}

const MyPostReduxForm = reduxForm({
    form: 'MyPost'
})(MyPostForm)
/* 
const Login = (props) => {

    return (
        <div>
            <h1>Login</h1>
            <MyPostReduxForm onSubmit={onSubmit} />
        </div>

    )
} */

export default MyPostReduxForm;