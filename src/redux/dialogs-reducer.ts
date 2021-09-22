import js from '../assets/images/js.png'
import redux from '../assets/images/redux.png'
import nodeJs from '../assets/images/node js.png'
import { InferActionsTypes, /* BaseThunkType */ } from './redux-store';

export type DialogType = {
    id: number
    name: string
    img: string
}

export type MessageType = {
    id: number
    message: string
    mymessage: boolean
}

let initialState = {
    dialogsData: [
        { id: 0, name: 'Dima', img: js },
        { id: 1, name: 'Vova', img: redux },
        { id: 2, name: 'Olya', img: nodeJs },
    ] as Array<DialogType>,
    messagesData: [
        { id: 0, message: 'Hi', mymessage: false },
        { id: 1, message: 'Hi', mymessage: true },
        { id: 2, message: 'How are you?', mymessage: false },
        { id: 3, message: 'OK', mymessage: true },

    ] as Array<MessageType>,
    newMessageText: '' as string,
};

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
/* type ThunkAction = BaseThunkType<ActionsTypes> */

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType  => {
    switch (action.type) {
        case 'ADD_MESSAGE':
            let newMessage = {
                id: 4,
                message: action.message,
                mymessage: false
            };
            return {
                ...state,
                messagesData: [...state.messagesData, newMessage]
            };
        default:
            return state;
    }
}

export const actions = {
 addMessageCreator: (message: string) =>( {
            type: 'ADD_MESSAGE',
            message
    }) as const,
    
}


export default dialogsReducer;