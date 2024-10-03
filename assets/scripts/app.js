const roll = document.querySelector("#roll");
let result = document.querySelector("#result");
let turnPlayer = document.querySelector("#turnPlayer");
let turnPlayerOne = true;
let player1Pos = 0;
let player2Pos = 0;
let maxCell = 100;
let questionModalElement = document.querySelector("#ladderQuestionModal");

let randomQuestion = {};

const yellow = "bg-yellow-200";
const purple = "bg-purple-500";
const blue = "bg-blue-500";
const red = "bg-red-700";
const green = "bg-green-500";

const ladderMap = {
  7: 26,
  22: 43,
  48: 67,
  57: 78,
  76: 85,
};
const snakeMap = {
  45: 17,
  60: 25,
  69: 29,
  99: 34,
};

const questionBank = [
  {
    question:
      "A cylindrical tank has a radius of 14 cm and a height of 15 cm. Find its volume.",
    answer: "9240cm3",
  },
  {
    question:
      "Find the surface area of a sphere of radius 10.5cm. (Take π = 22/7)",
    answer: "1386cm2",
  },
  {
    question: "Find the surface area of a sphere whose radius is 7cm",
    answer: "616cm2",
  },
  {
    question:
      "The volume of a cylinder is 5544 cm³. If the height of the cylinder is 21 cm, find its radius.",
    answer: "9.16cm",
  },
  {
    question:
      "The volume of a cone is 4620 cm³ and its height is 30 cm. Find the radius of the base.",
    answer: "12.12cm",
  },
  {
    question: "The volume of a sphere is 38808 cm³. Find its radius.",
    answer: "21cm",
  },
  {
    question:
      "The volume of a cone is 1848 cm³ and its height is 12 cm. Find the radius of the base.",
    answer: "12.12cm",
  },
  {
    question:
      "Find the total surface area of a hemisphere with a radius of 7 cm.",
    answer: "462cm2",
  },
  {
    question:
      "The radius of a cylinder is 14 cm and the height is 20 cm. Find its volume.",
    answer: "12320cm3",
  },
];
turnPlayer.innerHTML = turnPlayerOne ? "Player 1" : "Player 2";

function rollDice() {
  if (player1Pos >= maxCell || player2Pos >= maxCell) {
    return;
  }

  const diceValue = Math.floor(Math.random() * 6) + 1;
  result.innerHTML = `=>: ${diceValue}`;

  if (turnPlayerOne) {
    let p1CurrentPosition = player1Pos;
    let p1CurrentCellElement = document.querySelector(`#cell-${player1Pos}`);
    player1Pos += diceValue;
    if (ladderMap[player1Pos] != null) {
      triggerModal(turnPlayerOne, player1Pos);
    }
    if (snakeMap[player1Pos] != null) {
      player1Pos = snakeMap[player1Pos];
    }
    // player1Pos = ladderMap[`${player1Pos}`]      ? ladderMap[`${player1Pos}`]      : player1Pos;
    if (player1Pos > maxCell) {
      player1Pos = maxCell;
    }
    let p1NextCellElement = document.querySelector(`#cell-${player1Pos}`);
    changeBoxProperties(
      blue,
      p1NextCellElement,
      p1CurrentCellElement,
      turnPlayerOne
    );
    console.log(`P1 Last Position: ${p1CurrentPosition}`);

    if (p1CurrentPosition == player2Pos) {
      let p2CellElement = document.querySelector(`#cell-${player2Pos}`);
      changeBoxProperties(red, p2CellElement, null, null);
    }

    // for (let key in map) {
    //   if(player1Pos===key){
    //     player1Pos = map[`${key}`]
    //   }
    // }
  } else {
    let p2CurrentPosition = player2Pos;
    let p2CurrentCellElement = document.querySelector(`#cell-${player2Pos}`);
    player2Pos += diceValue;
    player2Pos = ladderMap[`${player2Pos}`]
      ? ladderMap[`${player2Pos}`]
      : player2Pos;
    if (player2Pos > maxCell) {
      player2Pos = maxCell;
    }
    if (ladderMap[player2Pos] != null) {
      player2Pos = ladderMap[player2Pos];
    }
    if (snakeMap[player2Pos] != null) {
      player2Pos = snakeMap[player2Pos];
    }
    let p2NextCellElement = document.querySelector(`#cell-${player2Pos}`);
    changeBoxProperties(
      red,
      p2NextCellElement,
      p2CurrentCellElement,
      turnPlayerOne
    );
    console.log(`P2 Last Position: ${p2CurrentPosition}`);

    if (p2CurrentPosition == player1Pos) {
      let p1CellElement = document.querySelector(`#cell-${player1Pos}`);
      changeBoxProperties(blue, p1CellElement, null, null);
    }
  }

  if (player1Pos == player2Pos) {
    let p1 = document.querySelector(`#cell-${player1Pos}`);
    // let p2 = document.querySelector(`cell-${player2Pos}`);
    // add purple
    changeBoxProperties(purple, p1, null, null);
    // changeBoxProperties(purple, p2, null, null);
  }

  // change player turn
  turnPlayerOne = !turnPlayerOne;
  turnPlayer.innerHTML = turnPlayerOne ? "Player 1" : "Player 2";
  if (player1Pos >= maxCell || player2Pos >= maxCell) {
    let gameWinner = document.createElement("div");
    gameWinner.style.fontFamily = "cursive";
    gameWinner.style.fontSize = "72px";
    gameWinner.innerHTML =
      player1Pos >= maxCell ? "Player 1 wins!" : "Player 2 wins!";
    document.querySelector(`#cell-${maxCell}`).classList.add(green);
    document.body.appendChild(gameWinner);
  }
}

function changeBoxProperties(
  colorClass,
  currentElement,
  previousElement,
  turnPlayerOne
) {
  if (colorClass && currentElement) {
    currentElement.classList.remove(yellow);
    currentElement.classList.remove(purple);
    currentElement.classList.remove(blue);
    currentElement.classList.remove(red);
    currentElement.classList.add(colorClass);
  }

  if (previousElement) {
    previousElement.classList.remove(purple);
    if (turnPlayerOne) {
      previousElement.classList.remove(blue);
    } else {
      previousElement.classList.remove(red);
    }

    previousElement.classList.add(yellow);
  }
}

// Move submitAnswer function outside of triggerModal
function submitAnswer(turnPlayerOne, playerPos) {
  if (turnPlayerOne) {
    const answer = document.querySelector("#answer").value;

    if (answer.value === randomQuestion["answer"]) {
      playerPos = ladderMap[playerPos];
    }

    questionModalElement.classList.toggle("hidden");
  } else {
  }
}

function triggerModal(turnPlayerOne, playerPos) {
  questionModalElement.classList.toggle("hidden");
  const question = document.querySelector("#question");
  randomQuestion =
    questionBank[Math.floor(Math.random() * questionBank.length)];
  question.innerHTML = randomQuestion.question;
}
