import React from 'react';
import { Redirect } from 'react-router';
import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import DialogsReduxForm from './DialogsForm';
import MessageItem from './MessageItem/MessageItem';


const Dialogs = (props) => {

    let dialogsElement = props.dialogsData.map(dialog => {
        return <DialogItem key={dialog.id} name={dialog.name} id={dialog.id} img={dialog.img} />
    });

    let messagesElement = props.messagesData.map(message => {
        return <MessageItem key={message.id} message={message.message} id={message.id} mymessage={message.mymessage} />
    });


    /*     let onAddMessage = () => { //отправка сообщения до введения форм
            props.addMessage();
        }
    
        let onMessageChange = (e) => {
            let text = e.target.value;
            props.updateNewMessageText(text);
    
        } */

    const addNewMessage = (values) => {debugger
        props.addMessage(values.newMessage)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogsElement}
            </div>



            <div className={s.messages}>
                <div>{messagesElement}</div>
                <div>
                    <DialogsReduxForm onSubmit={addNewMessage} />
                </div>
                {/*                 <div>
                    <textarea
                        className={s.newMessage}
                        value={props.newMessageText}
                        onChange={onMessageChange}
                    />
                </div>
                <div>
                    <button onClick={onAddMessage}>add message</button>
                </div> */}
            </div>
        </div>
    )
}

export default Dialogs;