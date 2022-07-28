import { Letter } from '../types/Letter';

import { isAValidPortugueseWord } from './PortugueseWords';

import { NUMBER_OF_LETTERS_OF_WORD } from '../config'

export function getGuessFullWord(guess: string[]) {
    return guess.join('');
}

export function isGuessValid(guess: string[]) {
    const word = getGuessFullWord(guess);

    const isWordValid = isAValidPortugueseWord(word) && word.length === NUMBER_OF_LETTERS_OF_WORD;

    return isWordValid;
}

export function parseGuess(letters: string[], wordSplit: string[]): Letter[] {
    const parsed: any[] = [];
    const missingLetters: any[] = [];

    for (let i = 0; i < NUMBER_OF_LETTERS_OF_WORD; i++) {
        const isCorrect = letters[i] === wordSplit[i] ? true : false;

        const condition = isCorrect ? 'correct' : 'wrong';

        parsed.push({
            letter: letters[i],
            condition
        });

        if(condition === 'wrong') {
            missingLetters.push(wordSplit[i]);
        }
    }

    if(missingLetters.length) {
        const wrongLetters = parsed.filter(guess => guess.condition === 'wrong');

        for (let wrongLetter of wrongLetters) {
            const indexOnMissingLetters = missingLetters.indexOf(wrongLetter.letter);
    
            if (indexOnMissingLetters !== -1) {
                wrongLetter.condition = 'displaced';
                missingLetters.splice(indexOnMissingLetters, 1);
            }
        }
    }

    return parsed;
}
