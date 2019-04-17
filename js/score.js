'use strict';
// global variables
var scoreBase = [];

if (localStorage.gameInfo){
  var gameInfo = JSON.parse(localStorage.gameInfo);
  localStorage.clear('gameInfo');
  checkHighScore(gameInfo[0], gameInfo[1]);
} else {
  loadHighScore();
}

function checkHighScore(user, userScore){
  if (localStorage.scores){
    var highScore = JSON.parse(localStorage.scores);
    scoreBase = highScore;
  }
  scoreBase.push({userName: user, score: userScore});
}

function loadHighScore(){
  if (localStorage.scores){
    var highScore = JSON.parse(localStorage.scores);
    scoreBase = highScore;
  }
}

function saveHighScores(){
  if (scoreBase.length > 10){scoreBase.pop();}
  localStorage.setItem('scores', JSON.stringify(scoreBase));
}

// function to sort object. from MDN Array.prototype.sort
function compare(a,b){
  if (a.score < b.score) return -1;
  if (a.score > b.score) return 1;
  return 0;
}

function renderScores(){
  var targetEl = document.getElementById('highScore');
  for (let i = 0; i < scoreBase.length; i++){
    var liEl = document.createElement('li');
    liEl.innerHTML = `<span class="scoreDisplay">${scoreBase[i].userName}</span> <span class="scoreDisplay">${scoreBase[i].score}</span>`;
    targetEl.appendChild(liEl);
  }
}

scoreBase.sort(compare);
saveHighScores();
renderScores();
