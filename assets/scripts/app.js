const roll = document.querySelector("#roll");
let result = document.querySelector("#result");
let turnPlayer = document.querySelector("#turnPlayer");
let turnPlayerOne = true;
let player1Pos = 0;
let player2Pos = 0;
let maxCell = 100;
let modal = document.getElementById("modal");

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

turnPlayer.innerHTML = turnPlayerOne ? "Player 1" : "Player 2";

function rollDice() {
  if (player1Pos >= maxCell || player2Pos >= maxCell) {
    return; // Game has ended
  }

  const diceValue = Math.floor(Math.random() * 6) + 1;
  result.innerHTML = `=>: ${diceValue}`;

  if (turnPlayerOne) {
    movePlayer(1, diceValue);
  } else {
    movePlayer(2, diceValue);
  }

  // Change turn
  turnPlayerOne = !turnPlayerOne;
  turnPlayer.innerHTML = turnPlayerOne ? "Player 1" : "Player 2";

  // Check for winner
  if (player1Pos >= maxCell || player2Pos >= maxCell) {
    declareWinner();
  }
}

function movePlayer(playerNum, diceValue) {
  let currentPos = playerNum === 1 ? player1Pos : player2Pos;
  let currentCellElement = document.getElementById(`cell-${currentPos}`);

  currentPos += diceValue;

  // Check if moved past max cell
  if (currentPos > maxCell) {
    currentPos = maxCell; // Don't allow moving past the end
  }

  // Check for ladder or snake
  if (ladderMap[currentPos] != null) {
    triggerModal(playerNum); // Trigger modal for ladder
  } else if (snakeMap[currentPos] != null) {
    currentPos = snakeMap[currentPos]; // Move down the snake
  }

  // Update player position
  if (playerNum === 1) {
    player1Pos = currentPos;
  } else {
    player2Pos = currentPos;
  }

  let nextCellElement = document.getElementById(`cell-${currentPos}`);
  changeBoxProperties(
    playerNum === 1 ? blue : red,
    nextCellElement,
    currentCellElement,
    playerNum === 1
  );

  // Check if they land on the same cell
  if (currentPos === (playerNum === 1 ? player2Pos : player1Pos)) {
    let otherCellElement = document.getElementById(
      `cell-${playerNum === 1 ? player2Pos : player1Pos}`
    );
    changeBoxProperties(purple, otherCellElement, null, null);
  }
}

function triggerModal(playerNum) {
  modal.classList.remove("hidden"); // Show modal
  const question = document.getElementById("question");
  let localQuestion = modalArray[Math.floor(Math.random() * modalArray.length)];
  question.innerHTML = localQuestion.question;

  // Set up answer submission
  const answer = document.getElementById("answer");
  const submitButton = document.getElementById("submitAnswer"); // Assuming you have a button to submit the answer

  submitButton.onclick = () => {
    console.log(typeof localQuestion.answer);
    console.log(typeof answer.value);
    if (answer.value === localQuestion.answer) {
      // Move player up the ladder
      if (playerNum === 1) {
        player1Pos = ladderMap[player1Pos];
      } else {
        player2Pos = ladderMap[player2Pos];
      }
    }
    modal.classList.add("hidden"); // Close modal
    answer.value = ""; // Reset answer input
  };
}

function changeBoxProperties(
  colorClass,
  currentElement,
  previousElement,
  isPlayerOne
) {
  if (colorClass && currentElement) {
    currentElement.classList.remove(yellow, purple, blue, red);
    currentElement.classList.add(colorClass);
  }

  if (previousElement) {
    previousElement.classList.remove(purple);
    previousElement.classList.add(yellow);
    if (isPlayerOne) {
      previousElement.classList.remove(blue);
    } else {
      previousElement.classList.remove(red);
    }
  }
}

function declareWinner() {
  let gameWinner = document.createElement("div");
  gameWinner.style.fontFamily = "cursive";
  gameWinner.style.fontSize = "72px";
  gameWinner.innerHTML =
    player1Pos >= maxCell ? "Player 1 wins!" : "Player 2 wins!";
  document.getElementById(`cell-${maxCell}`).classList.add(green);
  document.body.appendChild(gameWinner);
}

const modalArray = [
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
