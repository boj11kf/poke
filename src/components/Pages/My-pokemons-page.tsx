import CardsContainer, { Pokemon } from "../Cards/Cards-container";
import { PokemonsPageProps } from "./Pokemons-page";

interface MyPokemonListProps extends PokemonsPageProps {}

const MyPokemonList: React.FC<MyPokemonListProps> = (props: MyPokemonListProps) => {

    const { pokemons, searchInput } = props;
    const myPokemons: Pokemon[] = pokemons.filter(pokemon => pokemon.isMine);

    return (
        <CardsContainer pokemons={myPokemons} searchInput={searchInput}/>
    )
};

export default MyPokemonList;