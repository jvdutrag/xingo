import { Guess } from '../../@types/Guess';

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
                    <div className="letter">
                        <span></span>
                    </div>
                    <div className="letter">
                        <span></span>
                    </div>
                    <div className="letter">
                        <span></span>
                    </div>
                    <div className="letter">
                        <span></span>
                    </div>
                    <div className="letter">
                        <span></span>
                    </div>
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
                <div className={`letter ${getLetterValidationClassName(guess, 0)}`}>
                    <span>
                        { getLetter(guess, 0) }
                    </span>
                </div>
                <div className={`letter ${getLetterValidationClassName(guess, 1)}`}>
                    <span>
                        { getLetter(guess, 1) }
                    </span>
                </div>
                <div className={`letter ${getLetterValidationClassName(guess, 2)}`}>
                    <span>
                        { getLetter(guess, 2) }
                    </span>
                </div>
                <div className={`letter ${getLetterValidationClassName(guess, 3)}`}>
                    <span>
                        { getLetter(guess, 3) }
                    </span>
                </div>
                <div className={`letter ${getLetterValidationClassName(guess, 4)}`}>
                    <span>
                        { getLetter(guess, 4) }
                    </span>
                </div>
            </div>
        </div>
    )
}
