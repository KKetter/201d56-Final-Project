'use strict';

var board = [];
var grid = 9;
var boardGrid = document.getElementById('tile-container');
var divGrid = boardGrid.children;
var emptyTileColor = 'white';
var regularTileColor = '#aaa';
var allValidMoves = [];

function ValidMoves(key, array) {
  this.key = key;
  this.moves = array;
  allValidMoves.push(this);
}

new ValidMoves(0, [1, 3]);
new ValidMoves(1, [0, 2, 4]);
new ValidMoves(2, [1, 6]);
new ValidMoves(3, [0, 4, 6]);
new ValidMoves(4, [1, 3, 5, 8]);
new ValidMoves(5, [2, 4, 8]);
new ValidMoves(6, [3, 7]);
new ValidMoves(7, [4, 6, 8]);
new ValidMoves(8, [5, 7]);

//Function to generate random numbers to board array
function generateRandomNumber(){
  var random = Math.floor(Math.random() * grid);
  board.push(random);
  while(board.length < grid){
    random = Math.floor(Math.random() * grid);
    if(!board.includes(random)){
      board.push(random);
    }
  }
}

//function to place random numbers to the board
function drawBoard(){
  for (var i = 0; i < divGrid.length; i++){
    divGrid[i].innerHTML = board[i];

    if(board[i] === 0){
      divGrid[i].style.backgroundColor = emptyTileColor;
      divGrid[i].setAttribute('name', i);
    } else{
      divGrid[i].style.backgroundColor = regularTileColor;
    }
  }
}

//function to check that tile clicked shares border with empty tile
function validMove(index, zeroIndex) {
  if (allValidMoves[index].moves.includes(zeroIndex)) {
    console.log(true);
    return true;
  }
  console.log(false);
  return false;
}

//function to get zero index
function getZero(){
  return board.indexOf(0);
}

//function for event listener
function handleClick(event){
  //Check if the tile can be moved
  var select = parseInt(event.target.textContent);
  var indexOfZero = getZero();
  if (validMove(board.indexOf(select), indexOfZero)){
    board[board.indexOf(select)] = 0;
    board[indexOfZero] = select;
    drawBoard();
  }
}

generateRandomNumber();
drawBoard();
boardGrid.addEventListener('click', handleClick);
