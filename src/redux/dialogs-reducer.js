import js from '../assets/images/js.png'
import redux from '../assets/images/redux.png'
import nodeJs from '../assets/images/node js.png'
const ADD_MESSAGE = 'ADD-MESSAGE';



let initialState = {
    dialogsData: [
        { id: 0, name: 'Dima', img: js },
        { id: 1, name: 'Vova', img: redux },
        { id: 2, name: 'Olya', img: nodeJs },
    ],
    messagesData: [
        { id: 0, message: 'Hi', mymessage: false },
        { id: 1, message: 'Hi', mymessage: true },
        { id: 2, message: 'How are you?', mymessage: false },
        { id: 3, message: 'OK', mymessage: true },

    ],
    newMessageText: '',
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: 4,
                message: action.message,
                mymessage: false
            };
            return {
                ...state,
                messagesData: [...state.messagesData, newMessage],
               
            };
        default:
            return state;
    }
}

export const addMessageCreator = (message) => {
    return {
        type: ADD_MESSAGE,
        message
    }
}


export default dialogsReducer;