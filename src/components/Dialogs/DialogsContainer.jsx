import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { WithAuthRedirect } from '../../hoc/withAuthRedirect';
import { addMessageCreator } from '../../redux/dialogs-reducer';
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

let mapStateToProps = (state) => {
    return {
        dialogsData: state.dialogsPage.dialogsData,
        messagesData: state.dialogsPage.messagesData, 
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addMessage: (message) => {
            dispatch(addMessageCreator(message))
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
)(Dialogs)