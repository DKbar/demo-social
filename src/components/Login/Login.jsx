import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Field, reduxForm } from 'redux-form'
import { login, logout } from '../../redux/auth-reducer'
import { maxLengthCreator, required } from '../../utils/validators/validators'
import { createField, Input } from '../common/FormsControls/FormsControls'
import style from '../common/FormsControls/FormsControls.module.css'

let maxLength20 = maxLengthCreator(20)

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'email'} name={'email'} component={Input}
                    validate={[required, maxLength20]} />
            </div>
            <div>
                <Field placeholder={'password'} name={'password'} component={Input} type={'password'}
                    validate={[required, maxLength20]} />
            </div>
            <div>
                <Field type={'checkbox'} name={'rememberMe'} component={Input} /> remember me
            </div>
            {props.error ? <div className={style.formError}>{props.error}</div> : null}
            {props.captchaUrl ? <img src={props.captchaUrl} className={style.captcha}></img> : null}
            {props.captchaUrl ? createField("Symbols from image", "captcha", [required], Input) : null}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}
createField("Full name", "fullName", [], Input)
const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
            <div>
                <h2>Тестовые Email и Password </h2>
                <h3>Email: free@samuraijs.com</h3>
                <h3>Password: free</h3>
            </div>
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        captchaUrl: state.auth.captchaUrl,
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps,
    { login, logout })(Login);

