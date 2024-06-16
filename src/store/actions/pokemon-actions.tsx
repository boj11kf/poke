import { services } from "../../services/services";


const INIT_POKEMONS = 'pokemons/init';
const CATCH_POKEMON = 'pokemons/catch';
const RELEASE_POKEMON = 'pokemons/release';


interface PokemonsInitAction {
    type: typeof INIT_POKEMONS;
}

interface PokemonCatchAction {
    type: typeof CATCH_POKEMON;
    payload: string;
}
interface PokemonReleaseAction {
    type: typeof RELEASE_POKEMON;
    payload: string;
}

export type PokemonsActions = PokemonsInitAction;

export const actionCreators = {

    /***** THUNK ACTIONS *****/
    thunkInitPokemons: (payload: any) => (async (dispatch: any) => {
        try {
            const response = await services.postData('http://localhost:3000/api/auth/login', payload)
            const text = await response.text();

        
        } catch (error) {
            console.error(error);
        }
    }),
    thunkCatchPokemon: (payload: any) => (async (dispatch: any) => {
        try {
            const response = await services.postData('http://localhost:3000/api/auth/login', payload)
            const text = await response.text();

        
        } catch (error) {
            console.error(error);
        }
    }),
    thunkReleasePokemon: (payload: any) => (async (dispatch: any) => {
        try {
            const response = await services.postData('http://localhost:3000/api/auth/login', payload)
            const text = await response.text();

        
        } catch (error) {
            console.error(error);
        }
    }),
 

    /***** ACTIONS *****/
    initPokemons: (): PokemonsInitAction => ({
        type: INIT_POKEMONS,
    }),
    catchPokemon: (pokemon: string): PokemonCatchAction => ({
        type: CATCH_POKEMON,
        payload: pokemon
    }),
    releasePokemon: (pokemon: string): PokemonReleaseAction => ({
        type: RELEASE_POKEMON,
        payload: pokemon,
    })

}