import { combineReducers } from 'redux';
import { reducer as authenticationReducer } from "./authentication-reducer.tsx";
import { AuthenticationState } from "./authentication-reducer.tsx";




export interface RootState {
    authentication: AuthenticationState;
    
}

export const rootReducer = combineReducers({
    authentication: authenticationReducer,
    
});
