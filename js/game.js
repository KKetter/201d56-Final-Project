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
var binary = false;
var scoreBase = [];
var newGameClicked = false;

// Constructor for valid moves
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

    if (binary) {
      divGrid[j].innerHTML = `<div class="board-number-binary">${convertToBinary(board[j])}</div>`;
    } else {
      divGrid[j].innerHTML = `<span class="board-number">${board[j]}</span>`;
    }

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
  if (binary) {
    select = convertToDecimal(select);
  }

  var indexOfZero = getZero();
  //Check if the click is valid move
  if (validMove(board.indexOf(select), indexOfZero)) {
    board[board.indexOf(select)] = 0;
    board[indexOfZero] = select;
    drawBoard();
    updateMoves();
    displayScore();
    //Check if the puzzle is solved
    gameOver = checkPuzzleSolved();
    gameState[0].gameOver = gameOver;
    // Puzzle is solved do the following
    if(gameOver === true){
      let gameInfo = [gameState[0].username, score];
      localStorage.setItem('gameInfo', JSON.stringify(gameInfo));
      boardGrid.removeEventListener('click', handleClick);
      let winEl = document.getElementById('info-text');
      winEl.innerText = `Yey, you solved the puzzle in ${score} moves!`;
      document.getElementById('tile-container').classList.add('win-tile-container');
      var temp = document.getElementsByClassName('board-number');
      for (let index = 0; index < temp.length; index++) {
        if (temp[index].textContent !== '0') {
          temp[index].classList.add('win-text-color');
        }
      }
      highScoreInit();
      scoreBase.sort(compare);
      saveHighScores();
    }
    localStorage.setItem('gameState', JSON.stringify(gameState));
  }
}

//function to add number of moves
function updateMoves() {
  score += 1;
  gameState[0].score = score;
}

//function to display score on page
function displayScore() {
  var scoreDisplay = document.getElementById('info-text');
  scoreDisplay.innerText = `Total Number of Moves: ${score}`;
}

//Function to convert given decimal to binary
function convertToBinary(decimal) {
  var binaryNum = decimal.toString(2);
  if(binaryNum.length === 1) binaryNum = '000' + binaryNum;
  if(binaryNum.length === 2) binaryNum = '00' + binaryNum;
  if(binaryNum.length === 3) binaryNum = '0' + binaryNum;
  return binaryNum;
}

// Function to convert given binary to decimal
function convertToDecimal(binary) {
  var decimalNum = parseInt(binary, 2);
  return decimalNum;
}

// Function to initialize high score
function highScoreInit() {
  if (localStorage.gameInfo){
    var gameInfoArray = JSON.parse(localStorage.gameInfo);
    localStorage.removeItem('gameInfo');
    checkHighScore(gameInfoArray[0], gameInfoArray[1]);
  } else {
    loadHighScore();
  }
}

// Function to check the high score
function checkHighScore(user, userScore){
  if (localStorage.scores){
    var highScore = JSON.parse(localStorage.scores);
    scoreBase = highScore;
  }
  scoreBase.push({userName: user, score: userScore});
  scoreBase.sort(compare);
}

// Function to load the score from local storage
function loadHighScore(){
  if (localStorage.scores){
    var highScore = JSON.parse(localStorage.scores);
    scoreBase = highScore;
  }
  scoreBase.sort(compare);
}


// Function to save the high score to local storage
function saveHighScores(){
  if (scoreBase.length > 10) scoreBase.pop();
  localStorage.setItem('scores', JSON.stringify(scoreBase));
}

// function to sort object. from MDN Array.prototype.sort
function compare(a,b){
  if (a.score < b.score) return -1;
  if (a.score > b.score) return 1;
  return 0;
}

function showGameButtons() {
  let xx = document.getElementById('instructions');
  xx.style.display = 'none';

  let xxx = document.getElementById('new-binary-button');
  xxx.style.display = 'block';
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
      if(board[i] !== currentNumber){
        return false;
      }
      currentNumber += 1;
    }
  }
  return true;
}

//function to handle New Game button
function handleNewGame(e){
  e.preventDefault();
  board = [];
  gameState = [];
  boardGrid = document.getElementById('tile-container');
  divGrid = boardGrid.children;
  allValidMoves = [];
  gameOver = false;
  binary = false;
  scoreBase = [];
  newGameClicked = false;
  if (localStorage.gameState) {
    var parsedLS = JSON.parse(localStorage.gameState);

    for (var i = 0; i < parsedLS.length; i++){
      if(localStorage.getItem('username') === parsedLS[i].username){
        username = parsedLS[i].username;
        //Check if board is empty or not
        if(parsedLS[i].board){
          board = parsedLS[i].board;
        } else{
          generateRandomNumber();
        }

        //Check if score is empty or not
        if(parsedLS[i].score){
          score = parsedLS[i].score;
        } else{
          score = 0;
        }

        //Check if game over flag is empty
        if(parsedLS[i].gameOver){
          gameOver = parsedLS[i].gameOver;
        } else{
          gameOver = false;
        }

      } else{
        initializeBoard();
      }
      new Game(username, board, score, gameOver);
    }
  } else {
    initializeBoard();
    new Game(username, board, score, gameOver);
  }
  localStorage.removeItem('gameState');
  drawBoard();
  score = 0;
  displayScore();
  generateAllMoves();
  newGameClicked = true;
  showGameButtons();
}

//function to handle New Binary Game button
function handleBinaryGame(e){
  e.preventDefault();
  binary = true;
  localStorage.removeItem('gameState');
  drawBoard();
  score = 0;
  displayScore();
}

//function to initialize board
function initializeBoard(){
  generateRandomNumber();
  score = 0;
  username = localStorage.getItem('username');
}
//Invocation Zone
if (localStorage.gameState) {
  var parsedLS = JSON.parse(localStorage.gameState);

  for (var i = 0; i < parsedLS.length; i++){
    if(localStorage.getItem('username') === parsedLS[i].username){
      username = parsedLS[i].username;
      //Check if board is empty or not
      if(parsedLS[i].board){
        board = parsedLS[i].board;
      } else{
        generateRandomNumber();
      }

      //Check if score is empty or not
      if(parsedLS[i].score){
        score = parsedLS[i].score;
      } else{
        score = 0;
      }

      //Check if game over flag is empty
      if(parsedLS[i].gameOver){
        gameOver = parsedLS[i].gameOver;
      } else{
        gameOver = false;
      }

    } else{
      initializeBoard();
    }
    new Game(username, board, score, gameOver);
  }
} else {
  initializeBoard();
  new Game(username, board, score, gameOver);
}

board = [2, 0, 3, 1, 4, 5, 6, 7, 8]; // easy game beat hack
drawBoard();
displayScore();
generateAllMoves();

//Listener for New game button
var newGameButton = document.getElementById('game-button');
newGameButton.addEventListener('click', handleNewGame);
//Listener for New binary game button
var binaryGameButton = document.getElementById('binary-button');
binaryGameButton.addEventListener('click', handleBinaryGame);
//Listener for the board tiles
boardGrid.addEventListener('click', handleClick);
