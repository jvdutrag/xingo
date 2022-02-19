import { useEffect, useState, useCallback } from 'react';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

import { Header, GameContainer, Keyboard } from './index';
import {
  isPressedKeyAValidLetter, isPressedKeyAnActionKey,
  notify
} from '../utils';
import {
  isGuessValid, getGuessFullWord, parseGuess
} from '../utils/Guess';
import { GameResultDialog } from './dialog';

import { Guess } from '../types/Guess';
import { ActionKey } from '../types/ActionKey';
import { Game } from '../types/Game';

import {
  getWordOfTheDay
} from '../utils/Word';

import Database from '../utils/Database';

function App() {
  const { word, word_split: wordSplit } = getWordOfTheDay();

  const [currentGuess, setCurrentGuess] = useState<string[]>([]);

  const [guesses, setGuesses] = useState<Guess[]>([]);

  const [showResultDialog, setShowResultDialog] = useState<boolean>(false);

  const [game, setGame] = useState<Game>({
    word: '',
    guesses: [],
    ended: false,
    won: false
  });

  const addGuessToGuessList = useCallback((currentGuess: string[]) => {
    if(guesses.length >= 6) {
      return;
    }

    const guess: Guess = {
      letters: parseGuess(currentGuess, wordSplit),
      full_word: getGuessFullWord(currentGuess)
    }

    setGuesses(currGuesses => {
      const newGuesses = [...currGuesses, guess];
      
      Database.updateNotCompletedGameGuesses(newGuesses);

      return newGuesses;
    });
    setCurrentGuess([]);
  }, [guesses, wordSplit]);

  const removeLastLetterFromCurrentGuess = () => {
    return setCurrentGuess(currentGuess => currentGuess.slice(0, -1));
  }

  const handleActionKeyPress = useCallback((key: ActionKey) => {
    if(key === ActionKey.Backspace) {
      removeLastLetterFromCurrentGuess();
    }

    if(key === ActionKey.Enter) {
      if(currentGuess.length === 0) {
        return notify('error', 'Digite de uma palavra');
      }

      if(!isGuessValid(currentGuess)) {
        return notify('error', 'Essa palavra é inválida');
      }
      
      addGuessToGuessList(currentGuess);
    }
  }, [currentGuess, addGuessToGuessList]);

  const addLetterToCurrentGuess = useCallback((letter: string) => {
    if(currentGuess.length >= 5) {
      return;
    }

    return setCurrentGuess(letters => [...letters, letter.toUpperCase()]);
  }, [currentGuess]);

  const handleKeyPress = useCallback(event => {
    if(game.ended) {
      return;
    }

    const { key } = event;

    if(isPressedKeyAnActionKey(key)) {
      return handleActionKeyPress(key);
    }

    if(!isPressedKeyAValidLetter(key)) {
      return;
    }

    if(guesses.length >= 6) {
      return;
    }

    addLetterToCurrentGuess(key);
  }, [handleActionKeyPress, addLetterToCurrentGuess, guesses, game]);

  /*
  * This is a work-around. Sometimes, if you press the keys too fast, it will pass on 5 length
  * verification because of "setState" from React is async.
  * 
  * To fix that, we just split the currentGuess array until we to have 5 length.
  */
  useEffect(() => {
    if(game.ended) {
      return;
    }

    if(currentGuess.length > 5) {
      setCurrentGuess(currentGuess => currentGuess.slice(0, -1));
    }
  }, [currentGuess, game]);
  /* End of work-around */

  const finishGame = useCallback((won: boolean) => {
    const createdGame = {
      ended: true,
      won,
      word: word ? word : '',
      guesses
    }

    setGame(createdGame);

    setShowResultDialog(true);

    if(won) {
      notify('success', 'Você acertou a palavra!');
    }
    else {
      notify('error', 'Suas tentativas acabaram. Você errou a palavra');
    }

    Database.addGame(createdGame);
  }, [guesses, word]);

  useEffect(() => {
    if(guesses.length === 0) {
      return;
    }

    if(game.ended) {
      return;
    }

    const lastGuess = guesses[guesses.length - 1];

    const isLastGuessCorrect = lastGuess.letters.every(letter => letter.condition === 'correct');

    if(isLastGuessCorrect) {
      return finishGame(true);
    }

    const isGameEnded = guesses.length === 6;

    if(isGameEnded) {
      finishGame(false);
    }
  }, [guesses, game, finishGame]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress, false);

    return () => document.removeEventListener("keydown", handleKeyPress, false);
  }, [handleKeyPress]);

  useEffect(() => {
    Database.runSetup();

    const alreadyPlayedGame = Database.getTodayGame();

    const notCompletedGame = Database.getNotCompletedGameOfToday();

    if(notCompletedGame && !alreadyPlayedGame) {
      setGuesses(notCompletedGame.guesses);
      return;
    }

    if(alreadyPlayedGame) {
      setGame(alreadyPlayedGame);
      setGuesses(alreadyPlayedGame.guesses);
      setShowResultDialog(true);
    }
  }, []);

  if(!word) {
    return (
      <Container style={{ maxWidth: '600px' }}>
        <Header />

        <div className="justify-content-center text-center" style={{ fontSize: '20px' }}>
          Não tem palavra do dia para hoje! :(
        </div>

        <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
      </Container>
    )
  }

  return (
    <>
      <GameResultDialog handleClose={() => setShowResultDialog(false)} show={showResultDialog} game={game} />

      <Container style={{ maxWidth: '600px' }}>
        <Header />

        <GameContainer currentGuess={currentGuess} guesses={guesses} gameEnded={game.ended} />

        <Keyboard
          onKeyClick={key => {
            if(key === 'Enter' || key === 'Backspace') {
              return handleActionKeyPress(key as ActionKey);
            }

            return addLetterToCurrentGuess(key);
          }}
          disabled={game.ended || !word}
          guesses={guesses}
        />

        <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
      </Container>
    </>
  );
}

export default App;
