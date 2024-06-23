import { combineReducers } from 'redux';
import { reducer as authenticationReducer } from "./authentication-reducer.tsx";
import { reducer as pokemonsReducer } from "./pokemons-reducer.tsx";


export const rootReducer = combineReducers({
    authentication: authenticationReducer,
    pokemons: pokemonsReducer,
});




