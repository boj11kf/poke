import {AuthenticationActions} from "../actions/authentication-actions";
import {Action, Reducer} from "redux";


export interface AuthenticationState {
    isUserLoggedIn: boolean;
}

/* refreshnel igy aszerint inicializal, hogy bejelentkeztunk-e mar */
const initialState: AuthenticationState = {
    isUserLoggedIn: !!localStorage.getItem("token"),
}

type KnownActions = AuthenticationActions;

export const reducer: Reducer<AuthenticationState> = (
    state: AuthenticationState = initialState,
    incomingAction: Action): AuthenticationState => {

    const action = incomingAction as KnownActions;
    let newState = state;

    switch (action.type) {
        case "user/user-log-in":
            newState = {...state, isUserLoggedIn: true};
            break;
        case "user/user-log-out":
            newState = {...state, isUserLoggedIn: false};
            break;
        default: break;
    }
    return newState;
}