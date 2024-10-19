let body = document.querySelector("body");
body.style.fontFamily = " Arial, sans-serif";
body.style.display = "flex";
body.style.justifyContent = "center";
body.style.alignItems = "center";
body.style.height = "100vh";
body.style.backgroundColor = "#f0f0f0";
let calculator_div = document.createElement("div");
body.appendChild(calculator_div);
calculator_div.style.width = "300px";
calculator_div.style.backgroundColor = "#ffffff";
calculator_div.style.borderRadius = "8px";
calculator_div.style.padding = "20px";
calculator_div.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
let input = document.createElement("input");
calculator_div.appendChild(input);
input.type = "text";
input.readOnly = true;
input.style.width = "calc(100% - 10px)";
input.style.padding = "10px";
input.style.fontSize = "2em";
input.style.marginBottom = "10px";
input.style.border = " 1px solid #ddd";
input.style.borderRadius = "5px";
input.style.textAlign = "right";
let keys = document.createElement("div");
calculator_div.appendChild(keys);
keys.style.display = "grid";
keys.style.gridTemplateColumns = "repeat(4, 1fr)";
keys.style.gap = "10px";
let btn0 = document.createElement("button");
btn0.id = "btn0";
let btn = document.createElement("button");
btn.id = "btn";
let btn1 = document.createElement("button");
btn1.id = "btn1";
let btn2 = document.createElement("button");
btn2.id = "btn2";
let btn3 = document.createElement("button");
btn3.id = "btn3";
let btn4 = document.createElement("button");
btn4.id = "btn4";
let btn5 = document.createElement("button");
btn5.id = "btn5";
let btn6 = document.createElement("button");
btn6.id = "btn6";
let btn7 = document.createElement("button");
btn7.id = "btn7";
let btn8 = document.createElement("button");
btn8.id = "btn8";
let btn9 = document.createElement("button");
btn9.id = "btn9";
let btn10 = document.createElement("button");
btn10.id = "btn10";
let btn11 = document.createElement("button");
btn11.id = "btn11";
let btn12 = document.createElement("button");
btn12.id = "btn12";
let btn13 = document.createElement("button");
btn13.id = "btn13";
let btn14 = document.createElement("button");
btn14.id = "btn14";
let btn15 = document.createElement("button");
btn15.id = "btn15";
let btn16 = document.createElement("button");
btn16.id = "btn16";
let btn17 = document.createElement("button");
btn17.id = "btn17";
let btn18 = document.createElement("button");
btn18.id = "btn18";
keys.appendChild(btn17);
keys.appendChild(btn18);
keys.appendChild(btn);
keys.appendChild(btn1);
keys.appendChild(btn2);
keys.appendChild(btn3);
keys.appendChild(btn4);
keys.appendChild(btn5);
keys.appendChild(btn6);
keys.appendChild(btn7);
keys.appendChild(btn8);
keys.appendChild(btn9);
keys.appendChild(btn10);
keys.appendChild(btn11);
keys.appendChild(btn12);
keys.appendChild(btn13);
keys.appendChild(btn14);
keys.appendChild(btn15);
keys.appendChild(btn16);
keys.appendChild(btn0);
const styling = {
    padding : "15px",
fontSize : "1.5em",
backgroundColor : "green",
color : "#fff",
borderRadius : "5px",
border : "1px green solid",
cursor : "pointer",
transition : "background-color 0.3s ease",
}
btn17.innerText = "%";
Object.assign(btn17.style, styling);
btn18.innerText = "CE";
Object.assign(btn18.style, styling);
btn.innerText = "C";
Object.assign(btn.style, styling);
btn1.innerText = "⌫";
Object.assign(btn1.style, styling);
btn2.innerText = "7";
Object.assign(btn2.style, styling);
btn3.innerText = "8";
Object.assign(btn3.style, styling);
btn4.innerText = "9";
Object.assign(btn4.style, styling);
btn5.innerText = "÷";
Object.assign(btn5.style, styling);
btn6.innerText = "4";
Object.assign(btn6.style, styling);
btn7.innerText = "5";
Object.assign(btn7.style, styling);
btn8.innerText = "6";
Object.assign(btn8.style, styling);
btn9.innerText = "x";
Object.assign(btn9.style, styling);
btn10.innerText = "1";
Object.assign(btn10.style, styling);
btn11.innerText = "2";
Object.assign(btn11.style, styling);
btn12.innerText = "3";
Object.assign(btn12.style, styling);
btn13.innerText = "-";
Object.assign(btn13.style, styling);
btn14.innerText = "0";
Object.assign(btn14.style, styling);
btn15.innerText = ".";
Object.assign(btn15.style, styling);
btn16.innerText = "+";
Object.assign(btn16.style, styling);
btn0.innerText = "=";
Object.assign(btn0.style , styling)

let displayValue = ""; 
let pendingValue = ""; 
let operation = "";

document.getElementById("btn17").addEventListener("click", () => {
    appendToDisplay("%");
})
document.getElementById("btn18").addEventListener("click", () => {
    clearDisplay();
})

document.getElementById("btn").addEventListener("click", () => {
    clearDisplay();
})

document.getElementById("btn1").addEventListener("click", () => {
    deleteLastCharacter();
})
document.getElementById("btn2").addEventListener("click", () => {
    appendToDisplay(7);
})
document.getElementById("btn3").addEventListener("click", () => {
    appendToDisplay(8);
})

document.getElementById("btn4").addEventListener("click", () => {
    appendToDisplay(9);
})

document.getElementById("btn5").addEventListener("click", () => {
    appendToDisplay("/");
})
document.getElementById("btn6").addEventListener("click", () => {
    appendToDisplay(4);
})
document.getElementById("btn7").addEventListener("click", () => {
    appendToDisplay(5);
})

document.getElementById("btn8").addEventListener("click", () => {
    appendToDisplay(6);
})

document.getElementById("btn9").addEventListener("click", () => {
    appendToDisplay("*");
})
document.getElementById("btn10").addEventListener("click", () => {
    appendToDisplay(1);
})
document.getElementById("btn11").addEventListener("click", () => {
    appendToDisplay(2);
})

document.getElementById("btn12").addEventListener("click", () => {
    appendToDisplay(3);
})

document.getElementById("btn13").addEventListener("click", () => {
    appendToDisplay("-");
})
document.getElementById("btn14").addEventListener("click", () => {
    appendToDisplay(0);
})
document.getElementById("btn15").addEventListener("click", () => {
    appendToDisplay(".");
})
document.getElementById("btn16").addEventListener("click", () => {
    appendToDisplay("+");
})
document.getElementById("btn0").addEventListener("click", () => {
    calculate()
})

 

function appendToDisplay(value) {
  displayValue += value;
  updateDisplay();
}
function updateDisplay() {
   input.value = displayValue;
  }
  function clearDisplay() {
    displayValue = "";
    updateDisplay();
  }
  function calculate() {
    try {
      let result = eval(displayValue); 
      displayValue = result.toString();
      updateDisplay();
    } catch (error) {
      displayValue = "Error";
      updateDisplay();
    }
  }

  function deleteLastCharacter() {
    if (displayValue.length > 0) {
        displayValue = displayValue.slice(0, -1);
        updateDisplay();
    }
}