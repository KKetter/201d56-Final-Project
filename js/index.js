function handleUserNameSubmit(event){
  event.preventDefault();
  localStorage.setItem('username',event.target.username.value);
}
//this is the dom anchor - i need the value being stored
var userName = document.getElementById('user-form');
userName.addEventListener('submit', handleUserNameSubmit);

