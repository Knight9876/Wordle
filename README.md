# Wordle Game

Welcome to the Wordle Game! This is a fun and challenging word-guessing game inspired by the popular Wordle game.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Game Rules](#game-rules)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)

## Introduction

The Wordle Game is a single-player word-guessing game where the player tries to guess a hidden five-letter word within six attempts. The game provides feedback on the correctness and position of the guessed letters, helping the player deduce the target word.

## Features

- **Single-Player Mode**: Enjoy the classic Wordle experience by yourself.
- **Virtual and Physical Keyboard Support**: Seamlessly input guesses using either the on-screen keyboard or your physical keyboard.
- **Dynamic Feedback**: Immediate feedback on your guesses, highlighting correct and incorrect letters.
- **Responsive Design**: Play the game on any device, whether it's a desktop, tablet, or mobile phone.
- **Random Word Generation**: Each game features a new random word to keep the challenge fresh.

## Technologies Used

- **React**: For building the user interface.
- **CSS**: For styling the application.
- **APIs**: To fetch random five-letter words.

## Installation

1. **Clone the Repository**: 
   ```bash
   git clone https://github.com/your-username/wordle-game.git
   cd wordle-game
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm start
   ```

   The game should now be running on `http://localhost:3000`.

## Usage

1. Open the game in your browser.
2. Use the on-screen keyboard or your physical keyboard to input a five-letter word.
3. Press `Enter` to submit your guess.
4. Observe the feedback:
   - Green indicates the letter is in the correct position.
   - Yellow indicates the letter is in the word but in the wrong position.
   - Grey indicates the letter is not in the word.
5. Continue guessing until you identify the target word or exhaust your six attempts.

## Game Rules

1. Guess the hidden five-letter word within six attempts.
2. After each guess, the color of the tiles will change to show how close your guess was to the word:
   - **Green**: Correct letter in the correct position.
   - **Yellow**: Correct letter in the wrong position.
   - **Grey**: Incorrect letter.
3. Use the feedback to refine your guesses and find the target word.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request. Please ensure your contributions align with the project's coding standards and practices.

## Acknowledgements

- Inspired by the original Wordle game.
- Thanks to the developers and contributors of the libraries and APIs used in this project.

---

Enjoy playing the Wordle Game! If you have any questions or feedback, please reach out.
