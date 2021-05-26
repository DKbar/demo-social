/* import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";





let store = {

    _state: {
        profilePage: {
            postsData: [
                { id: 0, message: 'Hi', likesCount: 14 },
                { id: 1, message: 'It\'s my first post', likesCount: 18 }
            ],
            newPostText: '',
        },

        dialogsPage: {
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
        },

        sidebar:{

        },

    },

    _callSubscriber() {
        console.log('State changed');
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    getState() {
        return this._state;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebarPage, action);
        this._callSubscriber(this._state);
        

    }
}





export default store;
window.store = store; */