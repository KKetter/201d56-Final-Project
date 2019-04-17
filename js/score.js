'use strict';
// global variables
var scoreBase = [];

function checkHighScore(user, userScore){
  if (localStorage.scores){
    var highScore = JSON.parse(localStorage.scores);
    console.log(highScore);
    scoreBase = highScore;
  }
  scoreBase.push({userName: user, score: userScore});
}

function saveHighScores(){
  localStorage.setItem('scores', JSON.stringify(scoreBase));
}
// function to sort object. from MDN Array.prototype.sort
function compare(a,b){
  if (a.score < b.score) return -1;
  if (a.score > b.score) return 1;
  return 0;
}
checkHighScore('jorie',10);
scoreBase.sort(compare);
saveHighScores();
