import { useState } from 'react';
import words from './wordList.json';
import HangmanDrawing from './components/HangmanDrawing/HangmanDrawing';
import HangmanWord from './components/HangmanWord/HangmanWord';
import Keyboard from './components/Keyboard/Keyboard';
import './App.css';

function App() {
  const [wordToGuess, setWordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)];
  });

  console.log(wordToGuess);

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  return (
    <div className='wrapper'>
      <div className='winlose-wrapper'>Win Lose</div>
      <div>
        <HangmanDrawing />
        <HangmanWord />
        <Keyboard />
      </div>
    </div>
  );
}

export default App;