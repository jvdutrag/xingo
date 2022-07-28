import { Guess } from '../../types/Guess';

import { NUMBER_OF_LETTERS_OF_WORD } from '../../config'

import './GuessBlock.css';

type Props = {
    guess?: Guess,
    current?: boolean,
    placeholder?: boolean
}

export default function GuessBlock({ guess, current, placeholder }: Props) {
    const getLetter = (guess: Guess, index: number) => {
        if(guess.letters.length === 0) {
            return '';
        }

        const letter = current ? guess.letters[index] : guess.letters[index].letter;

        return letter;
    }

    const getLetterValidationClassName = (guess: Guess, index: number) => {
        if(current) {
            return '';
        }

        const { condition } = guess.letters[index];

        return condition ? condition : '';
    }

    if(placeholder) {
        return (
            <div className="guess-block-container">
                <div className="guess-block">
                    {
                        Array.from({ length: NUMBER_OF_LETTERS_OF_WORD }, (_, index) => (
                            <div key={index} className="letter">
                                <span></span>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }

    if(!guess) {
        return null;
    }

    return (
        <div className="guess-block-container">
            <div className={`guess-block ${current ? 'current' : ''}`}>
                {
                    Array.from({ length: NUMBER_OF_LETTERS_OF_WORD }, (_, index) => (
                        <div key={index} className={`letter ${getLetterValidationClassName(guess, index)}`}>
                            <span>
                                { getLetter(guess, index) }
                            </span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
