'use strict';

// buttons
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

// Images
const diceImage = document.querySelector('.dice');

// Score elements
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.querySelector('#current--1');
const scoreElement0 = document.getElementById('score--0');
const scoreElement1 = document.querySelector('#score--1');

// Active
let player0Element = document.querySelector('.player--0');
let player1Element = document.querySelector('.player--1');

const playerTurn = document.querySelectorAll('.current--playing');

let currentTotal;
let activePlayer;
let scores;
let playing;

const init = () => {
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  scoreElement0.textContent = 0;
  scoreElement1.textContent = 0;

  diceImage.classList.add('hidden');
  scores = [0, 0];
  currentTotal = 0;
  activePlayer = 0;
  playing = true;

  playerTurn[1].classList.add('hidden');

  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');

  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
};

// reset to initial values
init();

// call the current player current score DOM
const getCurrentPlayer = () => {
  return document.getElementById(`current--${activePlayer}`);
};

// switch player if 0 to 1 and if 1 to 0
const switchPlayer = () => {
  // reset the current total every switch
  currentTotal = 0;

  getCurrentPlayer().textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  for (let i = 0; i < playerTurn.length; i++) {
    playerTurn[i].classList.toggle('hidden');
  }
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

// NOTE THIS IS IMPORTANT

// Just think of how long the animation will work(condition) and put the function inside setTimeout -
// it will loop/repeat several times based on the condition"

const rollDice = () => {
  if (playing) {
    let finalDice = Math.trunc(Math.random() * 6 + 1);
    diceImage.classList.remove('hidden');

    btnRoll.disabled = true;
    btnHold.disabled = true;

    let animationStart = 0;
    const animationEnd = 8;

    const randomShowRandomFaces = () => {
      if (animationStart < animationEnd) {
        const randomDice = Math.trunc(Math.random() * 6 + 1);
        diceImage.src = `img/dice-${randomDice}.png`;

        animationStart++;

        // This will repeat WHILE the if condition is true (recursion = looping without a loop)
        // When the condition becomes false, it will stop automatically
        setTimeout(randomShowRandomFaces, 100);
      } else {
        diceImage.src = `img/dice-${finalDice}.png`;

        btnRoll.disabled = false;
        btnHold.disabled = false;

        if (finalDice !== 1) {
          currentTotal = currentTotal + finalDice;
          getCurrentPlayer().textContent = currentTotal;
        } else {
          switchPlayer();
        }
      }
    };

    randomShowRandomFaces();
  }
};

// Hold score function
const holdScore = () => {
  if (playing) {
    scores[activePlayer] = scores[activePlayer] + currentTotal;
    console.log(scores);

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 30) {
      const winner = document.querySelector(`.player--${activePlayer}`);
      winner.classList.add('player--winner');

      playing = false;
      diceImage.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
};

// Event listeners

btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdScore);
btnNew.addEventListener('click', init);
