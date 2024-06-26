import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';

export interface NamedAPIResource {
    name: string;
    url: string;
}

export interface APIResourceList {
    count: number;
    next: string;
    previous: string;
    results: NamedAPIResource[];

}

export interface PokemonAbility {
    is_hidden: boolean;
    slot: number;
    ability: NamedAPIResource;
}

export interface PokemonType {
    slot: number;
    type: NamedAPIResource;
}

export interface PokemonStat {
    stat: NamedAPIResource;
    effort: number;
    base_stat: number;
}

export interface PokemonSprites {
    front_default: string;
    front_shiny: string
    front_female: string;
    front_shiny_female: string;
    back_default: string;
    back_shiny: string;
    back_female: string;
    back_shiny_female: string;
}

export interface PokemonCries {
    latest: string;
    legacy: string;
}

export interface VersionGameIndex {
    game_index: number;
    version: NamedAPIResource;
}
export interface PokemonHeldItemVersion {
    version: NamedAPIResource;
    rarity: number;
}

export interface PokemonMove {
    move: NamedAPIResource;
    version_group_details: PokemonMoveVersion[];
}
export interface PokemonMoveVersion {
    move_learn_method: NamedAPIResource;
    version_group: NamedAPIResource;
    level_learned_at: number;
}
export interface PokemonTypePast {
    generation: NamedAPIResource;
    types: PokemonType[];
}

export interface PokemonHeldItem {
    item: NamedAPIResource;
    version_details: PokemonHeldItemVersion[];
}

export interface PokemonAttributes {
    id?: number;
    name: string; //
    base_experience: number;
    height: number; //
    is_default: boolean;
    order: number;
    weight: number;
    abilities: PokemonAbility[]; //
    forms: NamedAPIResource[];
    game_indices: NamedAPIResource[];
    held_items: PokemonHeldItem[];
    location_area_encounters: string;
    moves: PokemonMove[]; //
    past_types: PokemonTypePast[];
    sprites: PokemonSprites;
    cries: PokemonCries;
    species: NamedAPIResource;
    stats: PokemonStat[];
    types: PokemonType[];
}
/* https://pokeapi.co/api/v2/ability/{id or name}/ */
/*  effect_entries[0].effect
    effect_entries[0].short_effect
*/
/* https://pokeapi.co/api/v2/move/{id or name}/ */
/* contest_combos.normal.use_before.map(moves => moves.name) 

*/
export class PokemonAbility extends Model<PokemonAbility> implements PokemonAbility {
    public is_hidden!: boolean;
    public slot!: number;
    public ability!: NamedAPIResource;
}

class Pokemon extends Model<PokemonAttributes> implements PokemonAttributes {
    public id!: number;
    public name!: string;
    public base_experience!: number;
    public height!: number;
    public is_default!: boolean;
    public order!: number;
    public weight!: number;
    public abilities!: PokemonAbility[];
    public forms!: NamedAPIResource[];
    public game_indices!: NamedAPIResource[];
    public held_items!: PokemonHeldItem[];
    public location_area_encounters!: string;
    public moves!: PokemonMove[];
    public past_types!: PokemonTypePast[];
    public sprites!: PokemonSprites;
    public cries!: PokemonCries;
    public species!: NamedAPIResource;
    public stats!: PokemonStat[];
    public types!: PokemonType[];

    // Optionally define timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Pokemon.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    base_experience: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    height: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    is_default: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    order: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    abilities: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    forms: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    game_indices: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    held_items: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    location_area_encounters: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    moves: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    past_types: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    sprites: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    cries: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    species: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    stats: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    types: {
        type: DataTypes.JSON,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Pokemon',
    tableName: 'pokemons',
    timestamps: true,
});