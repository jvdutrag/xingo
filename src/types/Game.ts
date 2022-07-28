import { Guess } from './Guess';

export type Game = {
    date?: string;
    gaveUp?: boolean;
    ended: boolean;
    won: boolean;
    word: string;
    guesses: Guess[];
}
