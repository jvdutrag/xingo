import portugueseWords from '../assets/portuguese_words.json';

export function isAValidPortugueseWord(word: string) {
    return portugueseWords.includes(word.toUpperCase());
}
