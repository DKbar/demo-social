import { connect } from 'react-redux';
import { compose } from 'redux';
import { WithAuthRedirect } from '../../hoc/withAuthRedirect';
import { addMessageCreator, DialogType, MessageType } from '../../redux/dialogs-reducer';
import { AppStateType } from '../../redux/redux-store';
import Dialogs from './Dialogs';




/* const DialogsContainer = (props) => {
    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState();
                    let addMessage = () => {
                        store.dispatch(addMessageCreator());
                    }
                
                    let messageChange = (text) => {
                        store.dispatch(messageChangeCreator(text));
                
                    }
                    return (
                        <Dialogs 
                            addMessage={addMessage}
                            updateNewMessageText={messageChange}
                            dialogsData={state.dialogsPage.dialogsData}
                            newMessageText={state.dialogsPage.newMessageText}
                            messagesData={state.dialogsPage.messagesData}

                        />
                    )
                }
            }
        </StoreContext.Consumer>

    )

} */

type MapStateToPropsType = {
    dialogsData: Array<DialogType>
    messagesData: Array<MessageType>
}

type MapDispatchToPropsType = {
    addMessage: (message: string) => void
}

type MapOwnPropsType = {}
    


let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogsData: state.dialogsPage.dialogsData,
        messagesData: state.dialogsPage.messagesData, 
    }
}

let mapDispatchToProps = (dispatch: any): MapDispatchToPropsType => {
    return {
        addMessage: (message) => {
            dispatch(addMessageCreator(message))
        }
    }
}

export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, MapOwnPropsType, AppStateType>(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
)(Dialogs)