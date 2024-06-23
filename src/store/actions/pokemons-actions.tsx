import { Pokemon } from "../../components/Cards/Cards-container";
import { PokeAPIResponse } from "../../services/services";
import axios from "axios";
import { Action, ThunkAction} from "@reduxjs/toolkit";
import { RootState } from "store/store";


const INIT_POKOEMONS = 'pokemons/init-pokemons';
const ADD_TO_MY_POKEMONS = 'pokemons/add_to_my_pokemons';
const REMOVE_FROM_MY_POKEMONS = 'pokemons/remove_from_my_pokemons';


interface InitPokemonsAction {
    type: typeof INIT_POKOEMONS;
    payload: Pokemon[];
}
interface AddToMyPokemonsAction {
    type: typeof ADD_TO_MY_POKEMONS;
    payload: Pokemon;
}
interface RemoveFromMyPokemonsAction {
    type: typeof REMOVE_FROM_MY_POKEMONS;
    payload: Pokemon;
}

export type PokemonActions
    = InitPokemonsAction
    | AddToMyPokemonsAction
    | RemoveFromMyPokemonsAction;



export const actionCreators = {

    /***** THUNK ACTIONS *****/
    thunkInitPokemons: (): ThunkAction<void, RootState, unknown, Action> => (async (dispatch: any) => {
      
        try {
            const res = await axios.get<PokeAPIResponse>('https://pokeapi.co/api/v2/pokemon/');
            const results = await Promise.all(res.data.results.map(item => axios.get(item.url)));

            const pokemons = results.map(result => result.data).filter((pokemon, index, self) =>
                index === self.findIndex((p) => p.id === pokemon.id)
            );

            pokemons.sort((a, b) => a.id > b.id ? 1 : -1);
            dispatch(actionCreators.InitPokemons(pokemons));
        } catch (error) {
            console.log(`error in thunkInitPokemons: ${error}`);
        }/* finally {
            
        } */
    }),
    thunkAddToMyPokemons: (payload: Pokemon): ThunkAction<void, RootState, unknown, Action> => (async (dispatch: any) => {
        console.log(`add ${payload.name} to my pokemons database`);
        dispatch(actionCreators.AddToMyPokemons(payload));
    }),
    thunkRemoveFromMyPokemons: (payload: Pokemon): ThunkAction<void, RootState, unknown, Action> => (async (dispatch: any) => {
        console.log(`remove ${payload.name} from my pokemons database`);
        dispatch(actionCreators.RemoveFromMyPokemons(payload));
    }),


    /***** ACTIONS *****/
    InitPokemons: (pokemons: Pokemon[]): InitPokemonsAction => ({
        type: INIT_POKOEMONS,
        payload: pokemons,
    }),
    AddToMyPokemons: (pokemon: Pokemon): AddToMyPokemonsAction => ({
        type: ADD_TO_MY_POKEMONS,
        payload: pokemon,
    }),
    RemoveFromMyPokemons: (pokemon: Pokemon): RemoveFromMyPokemonsAction => ({
        type: REMOVE_FROM_MY_POKEMONS,
        payload: pokemon,
    }),
}