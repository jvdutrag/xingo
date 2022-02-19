import Icon from '@mdi/react';

import { 
    mdiBackspaceOutline as BackspaceIcon,
    mdiSendOutline as SendIcon
} from '@mdi/js';

import { Guess } from '../../types/Guess';

import './Keyboard.css';

const alphabet = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
]

type Props = {
    onKeyClick: (key: string) => void;
    disabled: boolean;
    guesses: Guess[]
}

export default function Keyboard({ onKeyClick, disabled, guesses }: Props) {
    const onClick = (key: string) => {
        if(disabled) return;

        return onKeyClick(key);
    }

    const getKeyCondition = (key: string) => {
        if(!guesses.length) {
            return '';
        }
        
        const conditions: any[] = [];

        guesses.forEach(guess => {
            guess.letters.forEach(eachLetter => {
                if(eachLetter.letter === key) {
                    const alreadyInConditions = conditions.find(condition => condition.letter === eachLetter.letter);

                    if(!alreadyInConditions) {
                        conditions.push({
                            key,
                            condition: eachLetter.condition
                        });
                    }
                }
            });
        });

        const keyHasCondition = conditions.find(condition => condition.key === key);

        return keyHasCondition ? keyHasCondition.condition : '';
    }

    return (
        <div className={`keyboard-container ${disabled ? 'disabled' : ''}`}>
            {
                alphabet.map((alphabet, index) => (
                    <div className="keyboard-block" key={index}>
                        {
                            alphabet.map((key, index) => (
                                <div className={`key ${getKeyCondition(key)}`} key={index} onClick={() => onClick(key)}>
                                    <span>{key}</span>
                                </div>
                            ))
                        }
                    </div>
                ))
            }
            <div className="keyboard-block" style={{ marginTop: '10px' }}>
                <div className="key action-key" onClick={() => onClick('Backspace')}>
                    <Icon
                        path={BackspaceIcon}
                        size={1}
                    />
                </div>
                <div className="key action-key action-key-send" onClick={() => onClick('Enter')}>
                    <Icon
                        path={SendIcon}
                        size={1}
                    />
                </div>
            </div>
        </div>
    )
}
