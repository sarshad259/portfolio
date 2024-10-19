const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit', e => {
    e.preventDefault();
    
    checkInputs();


});

function checkInputs() {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    
    if(usernameValue === '') {
        setErrorFor(username, 'Username cannot be blank');
    }else {
        setSuccessFor(username);
    }
    
    if(emailValue === '') {
        setErrorFor(email, 'Email cannot be blank');
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Not a valid email');
    } else {
        setSuccessFor(email);
    }
    
    if(passwordValue === '') {
        setErrorFor(password, 'Password cannot be blank');
    }else if (!isPasswordValid4(passwordValue)) {
        setErrorFor(password, 'Password must have at least one letter, ');
    }
     else if (!isPasswordValid(passwordValue)) {
        setErrorFor(password, 'Password must have at least one capital letter, ');
    } else if (!isPasswordValid1(passwordValue)) {
        setErrorFor(password, 'Password must have one special character');
    } else if (!isPasswordValid2(passwordValue)) {
        setErrorFor(password, 'Password must have one number');
    } else if (!isPasswordValid3(passwordValue)) {
        setErrorFor(password, 'Password must have 8 characters or longer');
    }
    else {
        setSuccessFor(password);
    }
    
    if(password2Value === '') {
        setErrorFor(password2, 'Please re-enter password');
    } else if(passwordValue !== password2Value) {
        setErrorFor(password2, 'Passwords do not match');
    }   else if(usernameValue === 'Yahya'  && emailValue === 'sarshadahmed259@gmail.com' &&
    passwordValue === 'Sarshad.259'){
        setSuccessFor(password2)
       alert("Welcome Admin!")

       window.location.href = "./admin.html"
 }
    else if(password2Value === passwordValue && isPasswordValid4(password2Value)
         && isPasswordValid(password2Value)  && isPasswordValid1(passwordValue)
         && isPasswordValid2(passwordValue)  && isPasswordValid3(passwordValue)){
         setSuccessFor(password2);
        const userData = {
            username1: usernameValue,
            email1: emailValue,
            password1: passwordValue
        };

        localStorage.setItem('userData', JSON.stringify(userData));
        
        alert(" Sign Up! Going to Quiz");
window.location.href = "./quiz1.html";
       
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function isPasswordValid(password) {
    const regex = /^(?=.*[A-Z])/;
    return regex.test(password);
}
function isPasswordValid4(password) {
    const regex = /^(?=.*[a-z])/;
    return regex.test(password);
}
function isPasswordValid1(password){
    const regex = /(?=.*[!@#$%^&*()_+[\]{}|~`<>,./?])/;
    return regex.test(password);
}
function isPasswordValid2(password){
    const regex = /(?=.*[0-9])/
    return regex.test(password);
}
function isPasswordValid3(password){
    const regex = /.{8,}$/;
    return regex.test(password);
}