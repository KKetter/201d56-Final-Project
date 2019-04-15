'use strict';

var board = [];
var grid = 9;

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
function initializeBoard(){
  var divGrid = document.getElementById('tile-container').children;
  for (var i = 0; i < divGrid.length; i++){
    divGrid[i].innerHTML = board[i];
    console.log(divGrid[i]);
    if(board[i] === 0){
      divGrid[i].style.backgroundColor = 'white';
    }

  }
}

//function for event listener





generateRandomNumber();
initializeBoard();
