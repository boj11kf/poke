import { useSelector } from "react-redux";
import { Pokemon } from "../Cards/Cards-container";
import { RootState } from "store/store";
import { useLoading } from "../Loader/PokeBallLoader";



const MyPokemonList = () => {
    const myPokemons: Pokemon[]
        = useSelector((state: RootState) => state.pokemons.pokemons)
            .filter(pokemon => pokemon.isMine);

    return (
        <div className="container">
            <div className="grid-container">
                {
                    myPokemons.map((item) => {
                        return (
                            <div className={`item`} key={item.id}>
                                <div className={`card poke-card ${item.isMine && "is-already-mine"}`}>
                                    <img className="card-img-top card-img" src={item.sprites.front_default} alt="Card" />
                                    <div className="card-body">
                                        <h5 className="card-title poke-name">{item.name}</h5>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default MyPokemonList;