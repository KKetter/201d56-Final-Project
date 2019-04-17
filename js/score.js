'use strict';
// global variables
var pusher = {};
var scoreBase = [];
var userName = 'david';
var score = 90;
function checkHighScore(userName, score){
  if (localStorage.scores){
    var highScore = JSON.parse(localStorage.scores);
    console.log(highScore);
    scoreBase = highScore;
  }
  pusher[userName]= score;
  scoreBase.push(pusher);
}

function saveHighScores(){
  localStorage.setItem('scores', JSON.stringify(scoreBase));
}

checkHighScore(userName,score);
saveHighScores();
