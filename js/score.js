'use strict';
// global variables
var scoreBase = [];

function renderScores(){
  if (localStorage.scores){
    var highScore = JSON.parse(localStorage.scores);
    scoreBase = highScore;
    var targetEl = document.getElementById('highScore');
    for (let i = 0; i < scoreBase.length; i++){
      var liEl = document.createElement('li');
      liEl.innerHTML = `<span id="userDisplay">${scoreBase[i].userName}</span> <div id="scoreDisplay">${scoreBase[i].score}</div>`;
      targetEl.appendChild(liEl);
    }
  }
}

renderScores();
