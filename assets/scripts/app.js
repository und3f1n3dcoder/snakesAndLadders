const roll = document.querySelector("#roll");
let result = document.querySelector("#result");
let turnPlayer1 = true;
let turnPlayer2 = false;
let player1Pos = 0;
let player2Pos = 0;
maxCell = 100;
roll.addEventListener("click", () => {
  const result_local = Math.floor(Math.random() * 6) + 1;
  result.innerHTML = `Result: ${result_local}`;
  // debugger;
  if (turnPlayer1) {
    if (player1Pos > 0) {
      let prevP1 = document.getElementById(`cell-${player1Pos}`);
      prevP1.classList.remove("bg-blue-700");
      prevP1.classList.add("bg-yellow-200");
    }

    player1Pos += result_local;
    if (player1Pos > maxCell) player1Pos = maxCell;
    let p1 = document.getElementById(`cell-${player1Pos}`);
    p1.classList.remove("bg-yellow-200");
    p1.classList.add("bg-blue-700");
    // console.log(`Player 1 position is ${player1Pos}`);
    turnPlayer2 = true;
    turnPlayer1 = false;
  } else if (turnPlayer2) {
    if (player2Pos > 0) {
      let prevP2 = document.getElementById(`cell-${player2Pos}`);
      prevP2.classList.remove("bg-red-700");
      prevP2.classList.add("bg-yellow-200");
    }

    player2Pos += result_local;
    if (player2Pos > maxCell) player2Pos = maxCell;
    let p2 = document.getElementById(`cell-${player2Pos}`);
    p2.classList.remove("bg-yellow-200");
    p2.classList.add("bg-red-700");
    // console.log(`Player 2 position is ${player2Pos}`);
    turnPlayer2 = false;
    turnPlayer1 = true;
  }
  while (player1Pos == player2Pos) {
    document
      .getElementById(`cell-${player1Pos}`)
      .classList.add("bg-purple-500");
  }
  if (player1Pos === 100) {
    let gameWinner = document.createElement("div");
    gameWinner.innerHTML = "Player 2 wins!";
    document.body.appendChild(gameWinner);
  }
  if (player2Pos === 100) {
    let gameWinner = document.createElement("div");
    gameWinner.innerHTML = "Player 2 wins!";
    gameWinner.style.fontFamily = "cursive";
    gameWinner.style.fontSize = "72px";

    document.body.appendChild(gameWinner);
  }
});
