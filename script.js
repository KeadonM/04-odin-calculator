let operator = "";
let num1 = "";
let num2 = "";
let answer = "";

const mainDisplay = document.querySelector(".main-display");
const historyDisplay = document.querySelector(".history-display");
const equals = document.querySelector(".equals");
const dot = document.querySelector(".dot");
const clear = document.querySelector(".clear");
const clearEntry = document.querySelector(".clear-entry");
const operators = document.querySelectorAll(".operator");
const numbers = document.querySelectorAll(".number");

equals.onclick = () => displayAnswer();
clear.onclick = () => clearDisplay();

/*Inputs*/
operators.forEach((opButton) => {
  opButton.addEventListener("click", (e) => {
    if (!num1) num1 = "0";
    operator = e.target.getAttribute("data-operator");
    updateMainDisplay();
  });
});

numbers.forEach((numButton) =>
  numButton.addEventListener("click", (e) => {
    updateOperands(e.target.getAttribute("data-num"));
  })
);

function updateOperands(num) {
  if (num === "0") {
    //Stops user from entering 0 first
    if (!num1) return;
    if (!num2) return;
  }

  if (!operator) {
    //Selects num1 if the operator hasn't been selected
    num1 += num;
  } else {
    num2 += num;
  }
  updateMainDisplay();
}

/*Display*/
function updateMainDisplay() {
  mainDisplay.textContent = `${num1} ${operator} ${num2}`;
}

function displayAnswer() {
  const answer = operate(parseFloat(num1), parseFloat(num2));
  if (answer === "ERROR" || !answer) return;
  updateHistoryDisplay();
  mainDisplay.textContent = `${answer}`;
  num1 = answer;
  num2 = "";
  operator = "";
}

function updateHistoryDisplay() {
  // historyDisplay.textContent =
  historyDisplay.textContent = mainDisplay.textContent + " =";
}

function clearDisplay() {
  mainDisplay.textContent = "";
}

/*Calculate*/

function operate(num1, num2) {
  switch (operator) {
    case "+":
      return num1 + num2;
      break;
    case "-":
      return num1 - num2;
      break;
    case "x":
      return num1 * num2;
      break;
    case "/":
      return num1 / num2;
      break;
    default:
      return "ERROR";
      break;
  }
}
