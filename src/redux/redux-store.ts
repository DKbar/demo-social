import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import authReducer from "./auth-reducer";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from "redux-form"
import appReducer from "./app-reducer";

let rootReducer = combineReducers({  
    dialogsPage: dialogsReducer,
    profilePage: profileReducer, 
    sidebar: sidebarReducer, 
    usersPage:usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

type PropertiesTypes<T> = T extends {[key: string] : infer U} ? U : never
export type InferActionsTypes<T extends {[key: string]: (...args:any[]) => any}> = ReturnType<PropertiesTypes<T>>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)
  ));


/* let store = createStore(reducers, applyMiddleware(thunkMiddleware)); */ //создание redux-stor (импорт из библиотеки redux) 
//@ts-ignore
window.state=store.getState()
//@ts-ignore
window.store = store
export default store