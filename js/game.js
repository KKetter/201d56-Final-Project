'use strict';

var board = [];
var gameState = [];
var grid = 9;
var boardGrid = document.getElementById('tile-container');
var divGrid = boardGrid.children;
var emptyTileColor = 'white';
var regularTileColor = '#CBC556';
var tileFontColor = '#304F5E';
var allValidMoves = [];
var gridSize = 3;
var score;
var username;
var gameOver = false;

function ValidMoves(key, array) {
  this.key = key;
  this.moves = array;
  allValidMoves.push(this);
}

//Function to generate random numbers to board array
function generateRandomNumber() {
  var random = Math.floor(Math.random() * grid);
  board.push(random);
  while (board.length < grid) {
    random = Math.floor(Math.random() * grid);
    if (!board.includes(random)) {
      board.push(random);
    }
  }
}

//function to generate valid moves
function generateIndexValidMoves(index) {
  var moveList = [];
  var maxIndex = gridSize - 1;
  //horizontal move
  if ((index % gridSize) === 0) {
    moveList.push(index + 1);
  } else if ((index % gridSize) === maxIndex) {
    moveList.push(index - 1);
  } else {
    moveList.push(index + 1);
    moveList.push(index - 1);
  }

  //vertical moves
  var downIndex = index + gridSize;
  if (downIndex < (gridSize * gridSize) && downIndex >= 0) {
    moveList.push(downIndex);
  }

  var upIndex = index - gridSize;
  if (upIndex < (gridSize * gridSize) && upIndex >= 0) {
    moveList.push(upIndex);
  }

  return moveList;
}

//function to generate all valid moves
function generateAllMoves() {
  for (var index = 0; index < (gridSize * gridSize); index++) {
    new ValidMoves(index, generateIndexValidMoves(index));
  }
}

//function to place random numbers to the board
function drawBoard() {
  for (var j = 0; j < divGrid.length; j++) {
    divGrid[j].innerHTML = `<span class="board-number">${board[j]}</span>`;

    if (board[j] === 0) {
      divGrid[j].style.backgroundColor = emptyTileColor;
      divGrid[j].style.color = emptyTileColor;
      divGrid[j].setAttribute('name', j);
    } else {
      divGrid[j].style.backgroundColor = regularTileColor;
      divGrid[j].style.color = tileFontColor;
    }
  }
}

//function to check that tile clicked shares border with empty tile
function validMove(index, zeroIndex) {
  if (allValidMoves[index].moves.includes(zeroIndex)) {
    return true;
  }
  return false;
}

//function to get zero index
function getZero() {
  return board.indexOf(0);
}

//function for event listener
function handleClick(event) {
  //Check if the tile can be moved
  var select = parseInt(event.target.textContent);
  var indexOfZero = getZero();
  if (validMove(board.indexOf(select), indexOfZero)) {
    board[board.indexOf(select)] = 0;
    board[indexOfZero] = select;
    drawBoard();
    updateMoves();
    displayScore();
    //Check if the puzzle is solved
    gameOver = checkPuzzleSolved();
    console.log('Puzzle solved ', gameOver);
    gameState[0].gameOver = gameOver;
    if(gameOver === true){
      //checkHighScore(userName, score)
      alert('Yey, you solved the puzzle!');
    }
    // var gameInstance = new Game(localStorage.getItem('username'), board, score);
    localStorage.setItem('gameState', JSON.stringify(gameState));
    console.log('', JSON.stringify(gameState));
  }

}

//function to add number of moves
function updateMoves() {
  score += 1;
  gameState[0].score = score;
  
}

//function to display score on page
function displayScore() {
  var scoreDisplay = document.getElementById('move-number');
  scoreDisplay.innerHTML = score;
}

//game object constructor
function Game(username, board, score, gameOver) {
  this.username = username;
  this.board = board;
  this.score = score;
  this.gameOver = gameOver;
  gameState.push(this);
}

//function to check if the puzzle is solved
function checkPuzzleSolved(){
  var currentNumber = 1;
  for(var i = 0; i < board.length; i++){
    
    if(board[i] !== 0){
      // console.log('Checking current number', currentNumber);
      if(board[i] !== currentNumber){
        console.table('Current board is not solved', board);
        return false;
      }
      currentNumber += 1;
      console.log('Checking current number', currentNumber);
    }
  }
  
  return true;
}

//function to handle New Game button
function handleResetGame(){
  generateRandomNumber();
  score = 0;
}


//Invocation Zone
if (localStorage.gameState) {
  var parsedLS = JSON.parse(localStorage.gameState);
  for (var i = 0; i < parsedLS.length; i++){
    if(localStorage.getItem('username') === parsedLS[i].username){
      username = parsedLS[i].username;
      board = parsedLS[i].board;
      score = parsedLS[i].score;
      gameOver = parsedLS[i].gameOver;
    } else{
      generateRandomNumber();
    }
  }
}
else{
  generateRandomNumber();
  score = 0;
  new Game(localStorage.getItem('username'), board, score, gameOver);
}
drawBoard();
displayScore();
generateAllMoves();

//Listener for New game button
var resetGameButton = document.getElementById('game-button');
resetGameButton.addEventListener('click', handleResetGame);

boardGrid.addEventListener('click', handleClick);
