import { useSelector } from "react-redux";
import { Pokemon } from "./Card/Card";
import { RootState } from "store/reducers/root-reducer";



const MyPokemonList = () => {
    const myPokemons: Pokemon[]
        = useSelector((state: RootState) => state.pokemonsState.pokemons)
            .filter(pokemon => pokemon.isMine);

    return (
        <>
            <div className="grid-container">
                {
                    myPokemons.map((item) => {
                        return (
                            <div className={`item ${item.isMine && "is-already-mine"}`} key={item.id}>
                                <div className="card poke-card">
                                    <img className="card-img-top card-img" src={item.sprites.front_default} alt="Card" />
                                    <div className="card-body">
                                        <h5 className="card-title poke-name">{item.name}</h5>
                                    </div>
                                </div>
                                <br />
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
};

export default MyPokemonList;