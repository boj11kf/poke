import { Pokemon } from "components/Card/Card";
import { services } from "../../services/services";


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

export type PokemonActions = InitPokemonsAction | AddToMyPokemonsAction | RemoveFromMyPokemonsAction;

export const actionCreators = {

    /***** THUNK ACTIONS *****/
    thunkInitPokemons: () => (async (dispatch: any) => {
        try {
            services.pokeFunc().then((res) => {
                console.log(res);
                services.getPokemonData(res.data.results).then((res) => {
                    console.log(res);
                    const ascPokemons: Pokemon[] = res.sort((a, b) => (a.id > b.id ? 1 : -1));
                    console.log(`init redux with ${JSON.stringify(ascPokemons)}`);
                    dispatch(actionCreators.InitPokemons(ascPokemons));
            })});
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
}