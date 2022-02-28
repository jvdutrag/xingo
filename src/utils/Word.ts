import Encryptor from 'simple-crypto-js';

import dailyWords from '../assets/words.json';

import { getToday } from './Time';

const encryptor = new Encryptor(process.env.REACT_APP_KEY);

export function getWordOfTheDay() {
    const today =  getToday();

    const word = dailyWords.find(word => word.date === today) || null;

    if(!word) {
        return {
            word: null,
            word_split: []
        }
    }

    const decryptedWordName = encryptor.decrypt(word.name).toString();

    return {
        word: decryptedWordName.toUpperCase(),
        word_split: decryptedWordName.toUpperCase().split('')
    }
}
