import React, { useState, useEffect } from "react";
import KeyBoard from "./KeyBoard";
import PlaceHolder from "./PlaceHolder";
import Loader from "./Loader"; // Import your Loader component
import "../css/GameBoard.css";

const GameBoard = () => {
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [targetWord, setTargetWord] = useState("");
  const [letterStatus, setLetterStatus] = useState([]);
  const [keyboardStatus, setKeyboardStatus] = useState({});
  const [gameResult, setGameResult] = useState(""); // State to hold game result
  const [loading, setLoading] = useState(false); // State to manage loading state

  // Function to fetch a random five-letter word from Datamuse API
  const fetchRandomWord = async () => {
    try {
      setLoading(true); // Set loading state to true while fetching
      const response = await fetch(
        "https://api.datamuse.com/words?sp=?????&max=1000"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch words");
      }
      const data = await response.json();
      const fiveLetterWords = data.filter(
        (word) => word.word.length === 5 && word.score > 2000
      );
      if (fiveLetterWords.length === 0) {
        throw new Error("No suitable words found");
      }
      const randomIndex = Math.floor(Math.random() * fiveLetterWords.length);
      setTargetWord(fiveLetterWords[randomIndex].word.toUpperCase());
      console.log(fiveLetterWords[randomIndex].word.toUpperCase());
    } catch (error) {
      console.error("Error fetching random word:", error);
      // Handle error as needed, e.g., show a message to the user
    } finally {
      setLoading(false); // Always set loading state to false after fetch completes
    }
  };

  useEffect(() => {
    fetchRandomWord(); // Fetch the random word when the component mounts
  }, []);

  const handleGuess = (letter) => {
    if (currentGuess.length < 5) {
      setCurrentGuess(currentGuess + letter.toUpperCase());
    }
  };

  const handleKeyPress = (event) => {
    const { key } = event;
    if (/^[a-zA-Z]$/.test(key)) {
      handleGuess(key);
    } else if (key === "Enter" && currentGuess.length === 5) {
      submitGuess();
    } else if (key === "Backspace") {
      handleBackspace();
    }
  };

  const handleBackspace = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const checkIfWordIsValid = async (word) => {
    try {
      setLoading(true); // Set loading state to true while checking word validity
      const response = await fetch(
        `https://api.datamuse.com/words?sp=${word.toLowerCase()}&max=1`
      );
      const data = await response.json();
      return (
        data.length > 0 && data[0].word.toLowerCase() === word.toLowerCase()
      );
    } catch (error) {
      console.error("Error checking word validity:", error);
      return false;
    } finally {
      setLoading(false); // Always set loading state to false after check completes
    }
  };

  const submitGuess = async () => {
    if (currentGuess.length === 5) {
      const isValidWord = await checkIfWordIsValid(currentGuess.toLowerCase());
      if (!isValidWord) {
        return;
      }

      const guessedLetters = currentGuess.split("");
      const correctLetters = targetWord.split("");

      let newLetterStatus = Array(5).fill(""); // Adjust size based on your word length
      const newKeyboardStatus = { ...keyboardStatus };

      // Track correct letters in the target word that have been matched
      const matchedIndices = [];

      // First pass: check for correct letters
      guessedLetters.forEach((letter, index) => {
        if (letter === correctLetters[index]) {
          newLetterStatus[index] = "correct";
          matchedIndices.push(index); // Track matched indices for correct letters
        }
      });

      // Second pass: check for incorrect-position letters
      guessedLetters.forEach((letter, index) => {
        if (
          newLetterStatus[index] !== "correct" &&
          correctLetters.includes(letter) &&
          correctLetters.filter(
            (l, i) => l === letter && !matchedIndices.includes(i)
          ).length > 0
        ) {
          newLetterStatus[index] = "incorrect-position";
          matchedIndices.push(correctLetters.indexOf(letter));
        } else if (newLetterStatus[index] !== "correct") {
          newLetterStatus[index] = "incorrect";
          newKeyboardStatus[letter] = "incorrect"; // Mark the key as incorrect
        }
      });

      setLetterStatus([...letterStatus, newLetterStatus]);
      setKeyboardStatus(newKeyboardStatus);

      // Update guesses and current guess
      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);
      setCurrentGuess("");

      // Check game outcome
      if (currentGuess === targetWord) {
        setGameResult(`Congratulations! You guessed the word "${targetWord}"!`);
      } else if (newGuesses.length >= 6) {
        setGameResult(`Game Over! The word was "${targetWord}".`);
      }
    }
  };

  const placeholders = Array.from({ length: 6 }, (_, index) => (
    <PlaceHolder key={index} />
  ));

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentGuess, guesses, letterStatus]);

  return (
    <>
      {loading && <Loader />} {/*Render the Loader component while loading */}
      <div className="game-board">
        {guesses.map((guess, index) => (
          <div key={index} className="word">
            {guess.split("").map((letter, idx) => (
              <span
                key={idx}
                className={`letter ${
                  letterStatus[index] && letterStatus[index][idx]
                }`}
              >
                {letter}
              </span>
            ))}
          </div>
        ))}
        <div className="word">
          {currentGuess.split("").map((letter, idx) => (
            <span
              key={idx}
              className={`letter ${
                letterStatus[guesses.length] &&
                letterStatus[guesses.length][idx]
              }`}
            >
              {letter}
            </span>
          ))}
        </div>
        <div className="placeholders">{placeholders}</div>
        <KeyBoard
          onGuess={handleGuess}
          onEnter={submitGuess}
          onBackspace={handleBackspace}
          keyboardStatus={keyboardStatus} // Pass the keyboard status to the KeyBoard component
        />
      </div>
      {gameResult && (
        <div className="game-result">
          <div>{gameResult}</div>
          <button type="button" onClick={() => window.location.reload()}>
            <p>
              <span>New Game</span>
            </p>
          </button>
        </div>
      )}
    </>
  );
};

export default GameBoard;
