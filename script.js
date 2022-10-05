let operand1;
let operand2;
let operator;

const screen = document.querySelector(".screen");
const equals = document.querySelector(".equals");
const dot = document.querySelector(".dot");
const clear = document.querySelector(".clear");
const operators = document.querySelectorAll(".operator");
const numbers = document.querySelectorAll(".number");

operators.forEach((opButton) => {});

numbers.forEach((number) => {});

function calculate() {
  const answer = operate(operand1, operand2, operator);
  updateDisplay("= " + answer);
}

function updateDisplay(content) {
  screen.textContent = screen.textContent + " " + content;
}

function clearDisplay() {
  screen.textContent = "";
}

function operate(num1, num2, operator) {
  switch (operator) {
    case "+":
      return num1 + num2;
      break;
    case "-":
      return num1 - num2;
      break;
    case "*":
      return num1 * num2;
      break;
    case "/":
      return num1 / num2;
      break;
  }
}
