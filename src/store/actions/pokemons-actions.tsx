import { Pokemon } from "components/Card/Card";
import { services } from "../../services/services";


const INIT_POKOEMONS = 'pokemons/init-pokemons';
const ADD_TO_MY_POKEMONS = 'pokemons/add_to_my_pokemons';
const REMOVE_FROM_MY_POKEMONS = 'pokemons/remove_from_my_pokemons';
const START_LOADING = 'pokemons/start_loading';
const FINISH_LOADING = 'pokemons/finish_loading';


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
interface StartLoadingAction {
    type: typeof START_LOADING;
}
interface FinishLoadingAction {
    type: typeof FINISH_LOADING;
}


export type PokemonActions 
= InitPokemonsAction 
| AddToMyPokemonsAction 
| RemoveFromMyPokemonsAction
| StartLoadingAction
| FinishLoadingAction;

export const actionCreators = {

    /***** THUNK ACTIONS *****/
    thunkInitPokemons: () => (async (dispatch: any) => {
        try {
            dispatch(actionCreators.StartLoading());
            services.pokeFunc().then((res) => {
                console.log(res);
                services.getPokemonData(res.data.results).then((res) => {
                    console.log(res);
                    const ascPokemons: Pokemon[] = res.sort((a, b) => (a.id > b.id ? 1 : -1));
                    dispatch(actionCreators.InitPokemons(ascPokemons));
            })});
            dispatch(actionCreators.FinishLoading());
        } catch (error) {
            console.log(`error in thunkInitPokemons: ${error}`);
        }
    }),
    thunkAddToMyPokemons: (payload: Pokemon) => (async (dispatch: any) => {
        console.log(`add ${payload.name} to my pokemons database`);
        dispatch(actionCreators.AddToMyPokemons(payload));
    }),
    thunkRemoveFromMyPokemons: (payload: Pokemon) => (async (dispatch: any) => {
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
    StartLoading: (): StartLoadingAction => ({
        type: START_LOADING,
      }),
      FinishLoading: (): FinishLoadingAction => ({
        type: FINISH_LOADING,
      }),
}