"use strict";

const container1 = document.querySelector(".container1");

const gameArea = document.querySelector(".main");

const player =
  gameArea.children[2].firstElementChild.firstElementChild.firstElementChild;
const buttonArea =
  gameArea.children[2].firstElementChild.firstElementChild.children[4];

const result = document.querySelector(".result");
const cardPlayer = document.querySelector(".cardPlayer");
const cardComputer = document.querySelector(".cardComputer");

const playerImg =
  gameArea.children[2].firstElementChild.firstElementChild.children[2]
    .firstElementChild;
const computerImg =
  gameArea.children[2].firstElementChild.lastElementChild.children[2]
    .firstElementChild;

let scorePlayer = document.querySelector(".score-player").textContent;
let scoreComputer = document.querySelector(".score-computer").textContent;
let scoredraw = document.querySelector(".score-draw").textContent;

const btnRestart = document.querySelector(".restart");

// console.log(...buttonArea.children);

let playerName;
const arr = ["rock", "paper", "scissor"];
container1.children[1].addEventListener("click", function (e) {
  e.preventDefault();

  playerName = container1.firstElementChild.children[1].value;
  container1.classList.add("hidden");
  gameArea.classList.remove("hidden");
  player.textContent = playerName;
});

const selectionHandle = function (name) {
  if (name !== undefined) {
    const num = Math.trunc(Math.random() * 3 + 1);
    playerImg.setAttribute("src", `${name}.jpeg`);
    computerImg.setAttribute("src", `${arr[num - 1]}.jpeg`);

    updateUi(checkWinner(name, arr[num - 1]));
  }
};

buttonArea.addEventListener("click", function (e) {
  e.preventDefault();
  selectionHandle(e.target.name);
});

const checkWinner = function (player, comp) {
  let winner;
  if (player === comp) {
    winner = "Draw";
  } else if (player === "rock") {
    comp === "scissor" ? (winner = `${playerName}`) : (winner = "Computer");
  } else if (player === "scissor") {
    comp === "paper" ? (winner = `${playerName}`) : (winner = "Computer");
  } else if (player === "paper") {
    comp === "rock" ? (winner = `${playerName}`) : (winner = "Computer");
  }
  return winner;
};

const checkRound = function (com, pl, draw) {
  if (Number(pl) + Number(com) + Number(draw) === 3) {
    [...buttonArea.children].forEach(function (btn, i) {
      btn.disabled = true;
    });
    btnRestart.classList.remove("hidden");
    if (pl > com) {
      result.textContent = `${playerName} wins`;
      cardPlayer.classList.add("success");
    } else if (com > pl) {
      result.textContent = `Computer wins`;
      cardComputer.classList.add("success");
    } else {
      result.textContent = `Match draw`;
      cardPlayer.classList.add("draw");
      cardComputer.classList.add("draw");
    }
  }
};

const updateUi = function (winner) {
  if (winner === playerName) {
    document.querySelector(".score-player").textContent =
      Number(scorePlayer) + 1;
    scorePlayer++;
  } else if (winner === "Computer") {
    document.querySelector(".score-computer").textContent =
      Number(scoreComputer) + 1;
    scoreComputer++;
  } else {
    document.querySelector(".score-draw").textContent = Number(scoredraw) + 1;
    scoredraw++;
  }
  checkRound(scoreComputer, scorePlayer, scoredraw);
};

btnRestart.addEventListener("click", function (e) {
  e.preventDefault();

  playerName = undefined;
  document.querySelector("input").value = "";
  container1.classList.remove("hidden");
  gameArea.classList.add("hidden");
  player.textContent = "Player Name";
  scoreComputer = document.querySelector(".score-computer").textContent = 0;
  scoredraw = document.querySelector(".score-draw").textContent = 0;
  scorePlayer = document.querySelector(".score-player").textContent = 0;
  [...buttonArea.children].forEach(function (btn, i) {
    btn.disabled = false;
  });
  computerImg.setAttribute("src", `qm.jpeg`);
  playerImg.setAttribute("src", `qm.jpeg`);
  result.textContent = undefined;
  cardPlayer.classList.remove("success");
  cardComputer.classList.remove("success");
  cardPlayer.classList.remove("draw");
  cardComputer.classList.remove("draw");
  btnRestart.classList.add("hidden");
});

// const inputName = document.querySelector("input");
// const btnEnter = document.querySelector(".submit");
// const player = document.querySelector(".playerName");
// const buttonSelect = document.querySelectorAll(".select");
//   // gameArea.children[2].firstElementChild.lastElementChild.children[2].firstElementChild
//   gameArea.children[2].firstElementChild.firstElementChild.children[4].getElementsByClassName(
//     "select"
// )
// buttonArea.getElementsByTagName('button').disabled=true;
// buttonArea.disabled=false;
// playerImg.src = `qm.jpeg`;
// buttonArea.forEach(function (btn, i) {
//   btn.addEventListener("click", function (e) {
//     e.preventDefault();
//     const num = Math.trunc(Math.random() * 3 + 1);
//     playerImg.src = `${btn.name}.jpeg`;
//     computerImg.src = `${arr[num - 1]}.jpeg`;

//     updateUi(checkWinner(btn.name, arr[num - 1]));
//   });
// });
