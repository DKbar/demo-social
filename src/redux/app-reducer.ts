import { getAuth } from "./auth-reducer";


const INITIALIZED_SUCCESS = 'INITIALIZES_SUCCESS';

export type InitialStateType = {
    initialized : boolean
}

let initialState: InitialStateType = {
    initialized: false
}

const appReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            };
        default:
            return state;
    }
}

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): InitializedSuccessActionType => {
    return { type: INITIALIZED_SUCCESS }
}
export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuth());
    promise.then(() => dispatch(initializedSuccess()))
}


export default appReducer;