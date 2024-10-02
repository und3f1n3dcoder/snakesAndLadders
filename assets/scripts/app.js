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
    return;
  }

  const diceValue = Math.floor(Math.random() * 6) + 1;
  result.innerHTML = `=>: ${diceValue}`;

  if (turnPlayerOne) {
    let p1CurrentPosition = player1Pos;
    let p1CurrentCellElement = document.getElementById(`cell-${player1Pos}`);
    player1Pos += diceValue;
    if (ladderMap[player1Pos] != null) {
      triggerModal();
    }
    if (snakeMap[player1Pos] != null) {
      player1Pos = snakeMap[player1Pos];
    }
    // player1Pos = ladderMap[`${player1Pos}`]      ? ladderMap[`${player1Pos}`]      : player1Pos;
    if (player1Pos > maxCell) {
      player1Pos = maxCell;
    }
    let p1NextCellElement = document.getElementById(`cell-${player1Pos}`);
    changeBoxProperties(
      blue,
      p1NextCellElement,
      p1CurrentCellElement,
      turnPlayerOne
    );
    console.log(`P1 Last Position: ${p1CurrentPosition}`);

    if (p1CurrentPosition == player2Pos) {
      let p2CellElement = document.getElementById(`cell-${player2Pos}`);
      changeBoxProperties(red, p2CellElement, null, null);
    }

    // for (let key in map) {
    //   if(player1Pos===key){
    //     player1Pos = map[`${key}`]
    //   }
    // }
  } else {
    let p2CurrentPosition = player2Pos;
    let p2CurrentCellElement = document.getElementById(`cell-${player2Pos}`);
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
    let p2NextCellElement = document.getElementById(`cell-${player2Pos}`);
    changeBoxProperties(
      red,
      p2NextCellElement,
      p2CurrentCellElement,
      turnPlayerOne
    );
    console.log(`P2 Last Position: ${p2CurrentPosition}`);

    if (p2CurrentPosition == player1Pos) {
      let p1CellElement = document.getElementById(`cell-${player1Pos}`);
      changeBoxProperties(blue, p1CellElement, null, null);
    }
  }

  if (player1Pos == player2Pos) {
    let p1 = document.getElementById(`cell-${player1Pos}`);
    // let p2 = document.getElementById(`cell-${player2Pos}`);
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
    document.getElementById(`cell-${maxCell}`).classList.add(green);
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

function triggerModal() {
  if (ladderMap[player1Pos] != null) {
    modal.classList.toggle("hidden");
    player1Pos = ladderMap[player1Pos];
  }
  if (snakeMap[player1Pos] != null) {
    player1Pos = snakeMap[player1Pos];
  }
}
