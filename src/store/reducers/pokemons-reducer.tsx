import { Pokemon } from "../../components/Cards/Cards-container";
import { PokemonActions } from "../actions/pokemons-actions";
import { Action, Reducer } from "redux";


export interface PokemonsState {
    pokemons: Pokemon[];
    isLoading: boolean;
}

const initialState: PokemonsState = {
    pokemons: [],
    isLoading: true,
}

type KnownActions = PokemonActions;

export const reducer: Reducer<PokemonsState> = (
    state: PokemonsState = initialState,
    incomingAction: Action): PokemonsState => {

    const action = incomingAction as KnownActions;
    let newState = state;

    switch (action.type) {
        case "pokemons/init-pokemons":
            newState = { ...state, pokemons: action.payload };
            break;
        case "pokemons/add_to_my_pokemons":
            newState = {
                ...state, pokemons: state.pokemons
                    .map(pokemon => pokemon.id === action.payload.id
                        ? { ...action.payload, isMine: true }
                        : pokemon)
            };
            break;
        case "pokemons/remove_from_my_pokemons":
            newState = {
                ...state, pokemons: state.pokemons
                    .map(pokemon => pokemon.id === action.payload.id
                        ? { ...action.payload, isMine: false }
                        : pokemon)
            };
            break;
        case "pokemons/start_loading":
            newState = { ...state, isLoading: true };
            break;
        case "pokemons/finish_loading":
            newState = { ...state, isLoading: false };
            break;
        default: break;
    }
    return newState;
}