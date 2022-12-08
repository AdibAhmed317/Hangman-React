import { useCallback, useEffect, useState } from 'react';
import words from './wordList.json';
import HangmanDrawing from './components/HangmanDrawing/HangmanDrawing';
import HangmanWord from './components/HangmanWord/HangmanWord';
import Keyboard from './components/Keyboard/Keyboard';
import './App.css';

function App() {
  const [wordToGuess, setWordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)];
  });

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const isLosing = incorrectLetters.length >= 6;
  const isWinner = wordToGuess
    .split('')
    .every((letter) => guessedLetters.includes(letter));

  const addGussedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter)) {
      return;
    }
    setGuessedLetters((currentLetters) => [...currentLetters, letter]);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGussedLetter(key);
    };
    document.addEventListener('keypress', handler);

    return () => {
      document.removeEventListener('keypress', handler);
    };
  }, []);

  return (
    <div className='wrapper'>
      <div className='winlose-wrapper'>
        {isWinner && 'Winner!!! ---- Refresh to try again.'}
        {isLosing && 'Nice Try!!! ---- Refresh to try again.'}
      </div>
      <div>
        <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
        <HangmanWord gussedLetters={guessedLetters} wordToGuess={wordToGuess} />
        <div style={{ alignSelf: 'stretch' }}>
          <Keyboard
            disabled={isWinner || isLosing}
            activeLetters={guessedLetters.filter((letter) =>
              wordToGuess.includes(letter)
            )}
            inactiveLetters={incorrectLetters}
            addGuessedLetter={addGussedLetter}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
