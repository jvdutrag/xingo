import { Guess } from './types/Guess'

export const NUMBER_OF_LETTERS_OF_WORD = 6

export const NUMBER_OF_MAX_GUESSES = 3

export const GUESSES_FOR_HINT_TO_SHOW = 1

export const exampleGuesses = {
    wrong: {
        full_word: 'MASCAR',
        letters: [
            {
                letter: 'M',
                condition: 'wrong'
            },
            {
                letter: 'A',
                condition: ''
            },
            {
                letter: 'S',
                condition: ''
            },
            {
                letter: 'C',
                condition: ''
            },
            {
                letter: 'A',
                condition: ''
            },
            {
                letter: 'R',
                condition: ''
            }
        ]
    } as Guess,
    displaced: {
        full_word: 'TAMPAR',
        letters: [
            {
                letter: 'T',
                condition: ''
            },
            {
                letter: 'A',
                condition: ''
            },
            {
                letter: 'M',
                condition: ''
            },
            {
                letter: 'P',
                condition: 'displaced'
            },
            {
                letter: 'A',
                condition: ''
            },
            {
                letter: 'R',
                condition: ''
            }
        ]
    } as Guess,
    correct: {
        full_word: 'SERVIR',
        letters: [
            {
                letter: 'S',
                condition: 'correct'
            },
            {
                letter: 'E',
                condition: ''
            },
            {
                letter: 'R',
                condition: ''
            },
            {
                letter: 'V',
                condition: ''
            },
            {
                letter: 'I',
                condition: ''
            },
            {
                letter: 'R',
                condition: ''
            }
        ]
    } as Guess
}
