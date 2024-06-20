import { combineReducers } from 'redux';
import { reducer as authenticationReducer } from "./authentication-reducer.tsx";
import { reducer as pokemonsReducer } from "./pokemons-reducer.tsx";
import { AuthenticationState } from "./authentication-reducer.tsx";
import { ProkemonsState } from './pokemons-reducer.tsx';




export interface RootState {
    authentication: AuthenticationState;
    pokemonsState: ProkemonsState;
    
}

export const rootReducer = combineReducers({
    authentication: authenticationReducer,
    pokemonReducer: pokemonsReducer,
    
});
