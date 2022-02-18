import { Guess } from './Guess';

export type Game = {
    ended: boolean;
    won: boolean;
    word: string;
    guesses: Guess[];
}
