import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace } from "@fortawesome/free-solid-svg-icons";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import "../css/KeyBoard.css";

const KeyBoard = ({ onGuess, onEnter, onBackspace, keyboardStatus }) => {
  const firstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const secondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const thirdRow = ["Z", "X", "C", "V", "B", "N", "M"];

  const getClassName = (letter) => {
    return keyboardStatus[letter] ? `key ${keyboardStatus[letter]}` : "key";
  };

  return (
    <div className="keyboard">
      <div className="keyboard-row">
        {firstRow.map((letter) => (
          <button
            key={letter}
            className={getClassName(letter)}
            onClick={() => onGuess(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
      <div className="keyboard-row">
        {secondRow.map((letter) => (
          <button
            key={letter}
            className={getClassName(letter)}
            onClick={() => onGuess(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
      <div className="keyboard-row">
        <button className="key" onClick={onBackspace}>
          <FontAwesomeIcon icon={faBackspace} />
        </button>
        {thirdRow.map((letter) => (
          <button
            key={letter}
            className={getClassName(letter)}
            onClick={() => onGuess(letter)}
          >
            {letter}
          </button>
        ))}
        <button className="key" onClick={onEnter}>
          <FontAwesomeIcon icon={faArrowAltCircleRight} />
        </button>
      </div>
    </div>
  );
};

export default KeyBoard;
