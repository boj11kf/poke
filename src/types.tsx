

export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    url: string;
    sprites: {
        front_default: string;
    };
    [key: string]: any;
    isMine: boolean;
}