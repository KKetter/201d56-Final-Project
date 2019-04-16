var userName = document.getElementById('userForm');
userName.addEventListener('submit', handleUserNameSubmit);

function handleUserNameSubmit(event){
  event.preventDefault();
  console.log('userName', event.target.userName.value);
}
