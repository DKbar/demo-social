import { ThunkAction } from "redux-thunk";
import { getAuth } from "./auth-reducer";
import { AppStateType, InferActionsTypes } from "./redux-store";


export type InitialStateType = {
    initialized : boolean
}

let initialState: InitialStateType = {
    initialized: false
}

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case 'INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true,
            };
        default:
            return state;
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>

const actions = {

 initializedSuccess: () => ({ type: 'INITIALIZED_SUCCESS' }) as const
}
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes> //??
export const initializeApp = ():ThunkType => (dispatch) => {
    let promise = dispatch(getAuth());
    promise.then(() => dispatch(actions.initializedSuccess()))
}


export default appReducer;