
import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { login } from '../../redux/auth-reducer'
import { AppStateType } from '../../redux/redux-store'
import { maxLengthCreator, required } from '../../utils/validators/validators'
import { createField, Input } from '../common/FormsControls/FormsControls'
import style from '../common/FormsControls/FormsControls.module.css'

let maxLength20 = maxLengthCreator(20)

type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
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
            {error ? <div className={style.formError}>{error}</div> : null}
            {captchaUrl ? <img src={captchaUrl} className={style.captcha } alt=""></img> : null}
            {captchaUrl ? createField<LoginFormValuesTypeKeys>("Symbols from image", "captcha", [required], Input) : null}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}
/* createField("Full name", "fullName", [], Input) */ 

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm)


type MapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean
}

type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string)  => void 
}


type LoginFormValuesType ={
    email: string 
    password: string
    rememberMe: boolean 
    captcha: string 
}

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType , string>


const Login: React.FC<MapStatePropsType & MapDispatchPropsType>  = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => {
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

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        captchaUrl: state.auth.captchaUrl,
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps,
    { login })(Login);

