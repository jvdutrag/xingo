import moment from 'moment';
import { toast } from 'react-toastify';

import { AlertType } from '../@types/AlertType';
import { Game } from '../@types/Game';

export function isPressedKeyAValidLetter(key: string) {
    return key.length === 1 && key.match(/^[a-z]+$/i);
}

export function isPressedKeyAnActionKey(key: string) {
    const actionKeys: string[] = ['Enter', 'Backspace'];

    return actionKeys.includes(key);
}

export function notify(type: string, message: string) {
    let toastType;

    switch (type) {
        case 'info': toastType = AlertType.Info; break;
        case 'success': toastType = AlertType.Success; break;
        case 'warning': toastType = AlertType.Warning; break;
        case 'error': toastType = AlertType.Error; break;
        default: toastType = AlertType.Info; break;
    }

    return toast[toastType](message, {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        theme: 'colored',
        closeButton: false,
        toastId: message.toLowerCase().replace(/\s/g, '-')
    });
}

export function getGameResultText(game: Game) {
    const getEmojiByCondition = (condition: string) => {
        switch (condition) {
            case 'correct': return '🟩';
            case 'wrong': return '🟥';
            case 'displaced': return '🟨';
            default: return '';
        }
    }

    const today = moment().format('DD/MM');

    let text = `joguei xingo.site ${game.won ? game.guesses.length : 'X'}/6 - ${today}\n\n`;
    
    text += game.guesses.map(guess => {
        return guess.letters.map(letter => getEmojiByCondition(letter.condition)).join('') + '\n';
    }).join('');

    return text;
}

export function getShareOnTwitterURL(game: Game) {
    const text = getGameResultText(game);

    return encodeURI(`https://twitter.com/intent/tweet?text=${text}`);
}
