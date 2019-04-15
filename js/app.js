'use strict';

var board = [];
var grid = 9;
var boardGrid = document.getElementById('tile-container');
var divGrid = boardGrid.children;
var emptyTileColor = 'white';
var regularTileColor = '#aaa';

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

//TODO
function validMove(){
  return true;
}

//function to get zero index
function getZero(){
  return board.indexOf(0);
}

//function for event listener
function handleClick(event){
  //Check if the tile can be moved
  if (validMove){
    var select = parseInt(event.target.textContent);
    var indexOfZero = getZero();
    board[board.indexOf(select)] = 0;
    board[indexOfZero] = select;
    drawBoard();
  }

}


generateRandomNumber();
drawBoard();
boardGrid.addEventListener('click', handleClick);

