const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');

form.addEventListener('submit', e => {
    e.preventDefault();
    
    checkLogin();
});

function checkLogin() {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    // Retrieve user data from localStorage
    const storedUserData = JSON.parse(localStorage.getItem('userData1'));
    
    if(storedUserData) {
        // Check if input matches stored user data
        if(usernameValue === storedUserData.username1 && emailValue === storedUserData.email1 && passwordValue === storedUserData.password1) {
            // Successful login
            window.location.href = './yahya.html';
        } 
		else {
            // Incorrect credentials
            alert('Incorrect username/email or password');
        }
    } else {
        // User is not logged in
        alert('User is not logged in!');
    }

}
