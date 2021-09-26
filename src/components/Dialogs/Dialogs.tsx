import { DialogType, MessageType } from '../../redux/dialogs-reducer';
import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import DialogsReduxForm from './DialogsForm';
import MessageItem from './MessageItem/MessageItem';


type PropsType = {
    dialogsData: Array<DialogType>
    messagesData: Array<MessageType>
    addMessage: (newMessage: string) => void
}

const Dialogs: React.FC<PropsType>  = ({dialogsData, messagesData, addMessage}) => {

    let dialogsElement = dialogsData.map(dialog => {
        return <DialogItem key={dialog.id} name={dialog.name} id={dialog.id} img={dialog.img} />
    });

    let messagesElement = messagesData.map(message => {
        return <MessageItem key={message.id} message={message.message} mymessage={message.mymessage} />
    });


    /*     let onAddMessage = () => { //отправка сообщения до введения форм
            props.addMessage();
        }
    
        let onMessageChange = (e) => {
            let text = e.target.value;
            props.updateNewMessageText(text);
    
        } */

    const addNewMessage = (values: {newMessage: string}) => {
        addMessage(values.newMessage)
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