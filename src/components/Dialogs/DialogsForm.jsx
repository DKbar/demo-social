import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { maxLengthCreator, required } from '../../utils/validators/validators'
import { Textarea } from '../common/FormsControls/FormsControls';

let maxLength50 = maxLengthCreator(50);

const DialogsForm = (props) => {
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

const DialogsReduxForm = reduxForm({
    form: 'newMessage'
})(DialogsForm)


export default DialogsReduxForm;