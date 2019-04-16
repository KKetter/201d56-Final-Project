//takes in user name and assigns to local storage for use in game persistence
function handleUserNameSubmit(event){
  event.preventDefault();
  localStorage.setItem('username', event.target.username.value);
  location.replace('game.html');
}
//dom anchor
var userName = document.getElementById('user-form');
//listen for submit of user name - form at bottom of page
userName.addEventListener('submit', handleUserNameSubmit);

