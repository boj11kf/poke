import React from "react";
import CardsContainer, { Pokemon } from "../Cards/Cards-container";
import '../Cards/style.css';

export interface PokemonsPageProps {
    searchInput: string;
    pokemons: Pokemon[];
}

const PokemonsPage: React.FC<PokemonsPageProps> = (props: PokemonsPageProps) => {

    const {pokemons,  searchInput } = props;

    return (
        <CardsContainer pokemons={pokemons} searchInput={searchInput}/>
    );
};

export default PokemonsPage;
