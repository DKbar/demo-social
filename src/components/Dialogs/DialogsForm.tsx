import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { maxLengthCreator, required } from '../../utils/validators/validators'
import { Textarea } from '../common/FormsControls/FormsControls';

let maxLength50 = maxLengthCreator(50);

type DialogsFormValuesType ={
    newMessage: string 
}

type PropsType = {}


const DialogsForm: React.FC<InjectedFormProps<DialogsFormValuesType, PropsType> & PropsType>  = (props) => {
    return (
        <form onSubmit={props.handleSubmit}> 
            <div>
                <Field name={'newMessage'} component={Textarea} 
                validate={[required, maxLength50]}/>
            </div>
            <div>
                <button>Add Message</button>
            </div>
        </form>
    )
}

const DialogsReduxForm = reduxForm<DialogsFormValuesType>({form: 'newMessage'})(DialogsForm)


export default DialogsReduxForm;