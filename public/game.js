//wait til the page is ready to set up the gameboard and activate the restart button
$(document).ready(() => {
  setupGame()
  document.getElementById('restartButton').addEventListener('click', () => {
    restartGame();
  })
});

//set up the gameboard with a square of 9 boxes
const setupGame = (firstPlayer) => {
  let boxes = "";
  let boxNum = 1;
  while (boxNum < 9){
    //add rows, with 3 td elements each
    boxes += "<tr>";
    for (let i = 1; i <= 3; i++){
      boxes += `<td id='box${boxNum}' class='box' onclick='markBox(this)'></td>`;
      boxNum++;
    }
    boxes += "</tr>";
  }
  //add all the boxes to the gameboard table
  $('#gameboard').append(boxes)
  document.turn = firstPlayer || "X";
  document.winner = null;
  setNotification(`${document.turn}'s turn`);
}

const restartGame = () => {
  $('#gameboard').empty();
  setupGame(document.winner);
}

const setNotification = (notice) => document.getElementById('notice').textContent = notice;

const markBox = (box) => {
  //if there's no current winner
  if (!document.winner) {
    //and if the box is empty, proceed with setting the box to the current player and switch player turns
    if (!box.textContent) {
      box.textContent = document.turn;
      switchTurn(document.turn);
    }
    else setNotification("Woops, try an empty box");
  }
}

const switchTurn = (currPlayer) => {
  //if the checkIfWinnerIs function returns true, reassign the winner to the current player and update the notification
  if (checkIfWinnerIs(currPlayer)) {
    document.winner = currPlayer;
    setNotification(`${currPlayer} won!`);
  }
  //if there's no winner, set the next player and notify players
  else {
    currPlayer === "X" ? document.turn = "O" : document.turn = "X"
    setNotification(`${document.turn}'s turn`)
  }
}

const checkIfWinnerIs = (player) => {
  let result = false;
  //check the current player with all possible winning rows
  if (
    checkRow(1,2,3, player) ||
    checkRow(4,5,6, player) ||
    checkRow(7,8,9, player) ||
    checkRow(1,4,7, player) ||
    checkRow(2,5,8, player) ||
    checkRow(3,6,9, player) ||
    checkRow(1,5,9, player) ||
    checkRow(3,5,7, player)
    ){
      result = true;
    }
  return result;
}

const checkRow = (b1,b2,b3,player) => {
  let hasMatchingRow = false;
  //if the box marks for one of the winning rows matches the current player, then return true
  if (fetchBoxMark(b1) === player && fetchBoxMark(b2) === player && fetchBoxMark(b3) === player) {
    hasMatchingRow = true;
  }
  return hasMatchingRow;
}

const fetchBoxMark = (number) => document.getElementById("box" + number).textContent;


