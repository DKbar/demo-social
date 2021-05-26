const ADD_MESSAGE = 'ADD-MESSAGE';


let initialState = {
    dialogsData: [
        { id: 0, name: 'Dima', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdEhagxuxwfLDUTiifTlmSYv2lMDsaW4LgFA&usqp=CAU' },
        { id: 1, name: 'Vova', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQul1HJdYvdDf1X0opEz_jJ3hwsGZF7kblRQ&usqp=CAU' },
        { id: 2, name: 'Olya', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZRzqtuNwxENjV4RjHySn_HI-69wvkv2gXhw&usqp=CAU' },
        { id: 3, name: 'Vera', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8j5095cJSRBRhk78pnDpbQ5RtWoKLGcFX3g&usqp=CAU' },
        { id: 4, name: 'Dima L', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS6ozcekOzK3nXJZTZQMMVPKHDy44Slzr34Q&usqp=CAU' },
    ],
    messagesData: [
        { id: 0, message: 'Hi', mymessage: false },
        { id: 1, message: 'Hi', mymessage: true },
        { id: 2, message: 'You\'re drinking beer?', mymessage: false },
        { id: 3, message: 'No', mymessage: true },

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