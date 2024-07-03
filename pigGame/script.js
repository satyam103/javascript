"use strict";

const score0 = document.querySelector("#score--0");
const score1 = document.getElementById("score--1");
const player0 = document.querySelector("#name--0");
const player1 = document.querySelector("#name--1");

const curr0 = document.querySelector("#current--0");
const curr1 = document.querySelector("#current--1");

const pl1 = document.querySelector(".player1");
const pl2 = document.querySelector(".player2");
const pl1Input = document.querySelector(".pl1");
const pl2Input = document.querySelector(".pl2");
const btnEnter = document.querySelector(".btnEnter");

const main = document.querySelector(".main1");
const game = document.querySelector(".game");

const dice = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let score, playing, currentScore, activePlayer;

const startGame = function () {
  score = [0, 0];
  playing = true;
  currentScore = 0;
  activePlayer = 0;

  dice.classList.add("hidden");

  score0.textContent = 0;
  score1.textContent = 0;
  document.querySelector("#current--0").textContent = 0;
  document.querySelector("#current--1").textContent = 0;

  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
};

btnEnter.addEventListener("click", function () {
  player0.textContent = pl1Input.value;
  player1.textContent = pl2Input.value;
  game.classList.remove("hidden");
  main.classList.add("hidden");
  startGame();
});


const switchPlayer = function () {
  const curr = document.getElementById(`current--${activePlayer}`);
  curr.textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  if (playing) {
    const number = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove("hidden");
    dice.src = `dice-${number}.png`;
    if (number !== 1) {
      currentScore += number;
      document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 100) {
      playing = false;
      dice.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", startGame);
