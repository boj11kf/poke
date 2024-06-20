import { Pokemon } from "components/Card/Card";
import { PokemonActions } from "../actions/pokemons-actions";
import { Action, Reducer } from "redux";


export interface PokemonsState {
    pokemons: Pokemon[];
}

const initialState: PokemonsState = {
    pokemons: []
}

type KnownActions = PokemonActions;

export const reducer: Reducer<PokemonsState> = (
    state: PokemonsState = initialState,
    incomingAction: Action): PokemonsState => {

    const action = incomingAction as KnownActions;
    let newState = state;

    switch (action.type) {
        case "pokemons/init-pokemons":
            console.log(action.payload);
            newState = { ...state, pokemons: action.payload};
            break;
        case "pokemons/add_to_my_pokemons":
            newState = { ...state, pokemons: [...state.pokemons, {...action.payload, isMine: true}] };
            break;
        case "pokemons/remove_from_my_pokemons":
            const newMyPokemons = state.pokemons
            .filter(pokemon => 
                pokemon.id === action.payload.id 
                ? {...action.payload, isMine: false}
                : pokemon);
            newState = { ...state, pokemons: newMyPokemons };
            break;
        default: break;
    }
    console.log(newState);
    return newState;
}