import { combineReducers } from 'redux';
import { reducer as authenticationReducer } from "./authentication-reducer.tsx";
import { reducer as pokemonsReducer } from "./pokemons-reducer.tsx";
import { AuthenticationState } from "./authentication-reducer.tsx";
import { PokemonsState } from './pokemons-reducer.tsx';




export interface RootState {
    authenticationState: AuthenticationState;
    pokemonsState: PokemonsState;
    
}

export const rootReducer = combineReducers({
    authentication: authenticationReducer,
    pokemons: pokemonsReducer,
});
