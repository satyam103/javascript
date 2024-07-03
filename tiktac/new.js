"use strict";

const inputElement = document.querySelectorAll(".tictac");

const btnEnter = document.querySelector(".btn");
const pl1 = document.querySelector(".pl1");
const pl2 = document.querySelector(".pl2");
const main = document.querySelector(".main1");
const game = document.querySelector(".game");

const player1 = document.querySelector(".player--1");
const player2 = document.querySelector(".player--2");

const btnRestart = document.querySelector(".restart");
const table = document.querySelector("table");

let activePlayer;
let matrix = [
  [-1, -1, -1],
  [-1, -1, -1],
  [-1, -1, -1],
];
let playerNo1;
let playerNo2;

btnEnter.addEventListener("click", function () {
  playerNo1 = document.querySelector(".pl1").value;
  playerNo2 = document.querySelector(".pl2").value;
  main.classList.add("hidden");
  game.classList.remove("hidden");
  document.querySelector(".player--1").textContent = playerNo1;
  document.querySelector(".player--2").textContent = playerNo2;
  activePlayer = document.querySelector(".active").textContent;
});

for (const [i, ele] of inputElement.entries()) {
  ele.addEventListener("click", function () {
    const element = document.querySelector(`.tictac--${i + 1}`);

    if (element.value === "") {
      const [i, j] = ele.name.split(",");

      if (activePlayer === playerNo1) {
        element.value = matrix[i][j] = 0;
        player1.classList.remove("active");
        player2.classList.add("active");
        checkWinner(matrix);
        activePlayer = playerNo2;
      } else {
        element.value = matrix[i][j] = "X";
        player2.classList.remove("active");
        player1.classList.add("active");
        checkWinner(matrix);
        activePlayer = playerNo1;
      }
    } else {
      alert("cannot write here");
    }
  });
}
let winner = "";
const checkWinner = function (matrix) {
  const checkRow = function (matrix) {
    for (let i = 0; i < 3; i++) {
      let count_0 = 0;
      let count_X = 0;
      for (let j = 0; j < 3; j++) {
        if (matrix[i][j] === 0) count_0++;
        else if (matrix[i][j] === "X") count_X++;
      }
      checkCount(count_0, count_X);
    }
  };
  const checkColumn = function (matrix) {
    for (let i = 0; i < 3; i++) {
      let count_0 = 0;
      let count_X = 0;
      for (let j = 0; j < 3; j++) {
        if (matrix[j][i] === 0) count_0++;
        else if (matrix[j][i] === "X") count_X++;
      }
      checkCount(count_0, count_X);
    }
  };

  const checkDiagonal = function (matrix) {
    let count_0 = 0;
    let count_X = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (i === j && matrix[j][i] === 0) count_0++;
        else if (i === j && matrix[j][i] === "X") count_X++;
      }
    }
    checkCount(count_0, count_X);
  };
  const checkDiagonal2 = function (matrix) {
    let count_0 = 0;
    let count_X = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 2; j >= 0; j--) {
        if (Math.abs(i - j) === 2 && matrix[i][j] === 0) count_0++;
        else if (Math.abs(i - j) === 2 && matrix[i][j] === "X") count_X++;
      }
    }
    if (matrix[1][1] === 0) count_0++;
    else if (matrix[1][1] === "X") count_X++;
    checkCount(count_0, count_X);
  };

  const checkCount = function (count0, countX) {
    if (checkMatrix(matrix)) {
      if (count0 === 3) {
        winner = playerNo1;
        inputElement.forEach((element) => {
          element.disabled = true;
        });
        player2.classList.remove("active");
        player1.classList.remove("active");
        player1.classList.add("winner");
        document.querySelector(".result").textContent = `${winner} is winner`;
        btnRestart.classList.remove("hidden");
        return winner;
      } else if (countX === 3) {
        winner = playerNo2;
        inputElement.forEach((element) => {
          element.disabled = true;
        });
        player1.classList.remove("active");
        player2.classList.remove("active");
        player2.classList.add("winner");
        document.querySelector(".result").textContent = `${winner} is winner`;
        btnRestart.classList.remove("hidden");
        return winner;
      }
    } else {
      winner = "";
      player2.classList.remove("active");
      player1.classList.remove("active");
      document.querySelector(".result").textContent = `Match Draw`;
      btnRestart.classList.remove("hidden");
    }
  };
  const checkMatrix = function (matrix) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (matrix[i][j] === -1) {
          return true;
        }
      }
    }
    return false;
  };
  checkRow(matrix);
  checkColumn(matrix);
  checkDiagonal(matrix);
  checkDiagonal2(matrix);
};

btnRestart.addEventListener("click", function () {
  activePlayer = undefined;
  for (const [i, ele] of inputElement.entries()) {
    ele.value = "";
    ele.disabled = false;
  }
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      matrix[i][j] = -1;
    }
  }
  winner = "";
  game.classList.add("hidden");
  main.classList.remove("hidden");
  player2.classList.remove("active");
  player1.classList.remove("active");
  player2.classList.remove("winner");
  player1.classList.remove("winner");
  player1.classList.add("active");
  btnRestart.classList.add("hidden");
  document.querySelector(".result").textContent = ``;
});
