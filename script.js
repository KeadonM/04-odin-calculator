let operator = "";
let num1 = "0";
let num2 = "";
let mainDisplayText = "0";
let historyDisplayText = "";

const mainDisplay = document.querySelector(".main-text");
const historyDisplay = document.querySelector(".history-text");
const clearE = document.querySelector(".entry");
const clearA = document.querySelector(".all");
const backspace = document.querySelector(".backspace");
const sign = document.querySelector(".sign-toggle");
const dot = document.querySelector(".dot");
const equals = document.querySelector(".equals");
const operators = document.querySelectorAll(".operator");
const numbers = document.querySelectorAll(".number");

/*---INPUTS---*/

clearE.onclick = () => clearEntry();
clearA.onclick = () => clearAll();
backspace.onclick = () => onDelete();
sign.onclick = () => signToggle();
dot.onclick = () => numSelection(".");
equals.onclick = () => displayEquation(operate());

operators.forEach((opButton) => {
  opButton.addEventListener("click", (e) => {
    if (num2) equals.onclick();
    operatorSelection(e.target.getAttribute("data-operator"));
  });
});

numbers.forEach((numButton) => {
  numButton.addEventListener("click", (e) => {
    numSelection(e.target.getAttribute("data-num"));
  });
});

document.addEventListener("keydown", (e) => {
  if (e.shiftKey && e.key === "c") {
    pressKey(clearA, true);
    return;
  }

  switch (e.key) {
    case "+":
      pressKey(operators[0], true);
      return;
    case "-":
      pressKey(operators[1], true);
      return;
    case "x":
    case "*":
      pressKey(operators[2], true);
      break;
    case "/":
      pressKey(operators[3], true);
      break;
    case "=":
    case "Enter":
      pressKey(equals, true);
      break;
    case ".":
      pressKey(equals, true);
      break;
    case "Backspace":
      pressKey(backspace, true);
      break;
    case "c":
      pressKey(clearE, true);
      break;
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      pressKey(numbers[e.key], true);
      break;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.shiftKey && e.key === "c") {
    pressKey(clearA, false);
    return;
  }

  switch (e.key) {
    case "+":
      pressKey(operators[0], false);
      return;
    case "-":
      pressKey(operators[1], false);
      return;
    case "x":
    case "*":
      pressKey(operators[2], false);
      break;
    case "/":
      pressKey(operators[3], false);
      break;
    case "=":
    case "Enter":
      pressKey(equals, false);
      break;
    case ".":
      pressKey(dot, false);
      break;
    case "Backspace":
      pressKey(backspace, false);
      break;
    case "c":
      pressKey(clearE, false);
      break;
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      console.log("up " + e.key);
      pressKey(numbers[e.key], false);
      break;
  }
});

function pressKey(button, down) {
  if (down) button.click();
  button.classList.toggle("pressed");
}

/*---INPUT FUNCTIONS---*/

function numSelection(value) {
  if (!operator) {
    //If the operator hasn't been selected update num1
    num1 = updateNum(num1, value);
  } else {
    num2 = updateNum(num2, value);
  }
  displayMain();
}

function updateNum(num, value) {
  let isNegative = 0;
  if (num.includes("-")) isNegative = 1;
  if (num.length >= 9 + isNegative) return num;
  if (value === "." && num.includes(".")) return num;

  if (value === ".") num += ".";
  else if (num === "0" || !num) num = value;
  else num += value;

  return num;
}

function operatorSelection(op) {
  operator = op;
  displayMain();
}

function onDelete() {
  if (num2) num2 = deleteNum(num2);
  else if (operator) operator = "";
  else if (num1) num1 = deleteNum(num1);

  displayMain();
}

function deleteNum(num) {
  num = num.slice(0, -1);
  if (!num && !operator) num = "0";

  return num;
}

function signToggle() {
  if (!operator) {
    if (num1.includes("-")) num1 = num1.slice(1);
    else num1 = "-" + num1;
  } else {
    if (num2.includes("-")) num2 = num2.slice(1);
    else num2 = "-" + num2;
  }

  displayMain();
}

/*---DISPLAY---*/

function displayMain() {
  mainDisplayText = `${num1} ${operator} ${num2}`;
  mainDisplay.textContent = mainDisplayText;
  checkWidth(mainDisplay);
}

function displayHistory() {
  historyDisplayText = mainDisplayText + " =";
  historyDisplay.textContent = historyDisplayText;
}

function displayEquation(answer) {
  if (answer === "ERROR" || !isFinite(answer)) return;

  answer = +answer.toFixed(8);
  displayHistory();
  displayAnswer(answer);
  resetVariables(`${answer}`);
}

function displayAnswer(a) {
  mainDisplayText = `${a}`;
  mainDisplay.textContent = mainDisplayText;
  checkWidth(mainDisplay);
}

function clearDisplay() {
  mainDisplayText = "0";
  historyDisplayText = "";
  mainDisplay.textContent = mainDisplayText;
  historyDisplay.textContent = historyDisplayText;
}

/*---CALCULATE---*/

function operate(operand1, operand2) {
  operand1 = parseFloat(num1);
  operand2 = parseFloat(num2);

  switch (operator) {
    case "+":
      return operand1 + operand2;
      break;
    case "-":
      return operand1 - operand2;
      break;
    case "x":
      return operand1 * operand2;
      break;
    case "/":
      return operand1 / operand2;
      break;
    default:
      return "ERROR";
      break;
  }
}

/*---RESET---*/

function clearAll() {
  resetVariables("0");
  clearDisplay();
}

function clearEntry() {
  if (num2) num2 = "";
  else if (operator) operator = "";
  else if (num1) clearAll();

  displayMain();
}

function resetVariables(num1Value) {
  num1 = num1Value;
  num2 = "";
  operator = "";
}

/*---FONTSIZE UPDATING---*/

function checkWidth(text) {
  let textWidth = text.offsetWidth;
  let fontSize = window.getComputedStyle(text).fontSize;
  const container = text.parentElement;
  const containerWidth = container.offsetWidth;

  if (textWidth >= containerWidth)
    shrinkFont(text, fontSize, textWidth, containerWidth);
  if (textWidth < containerWidth * 0.95)
    increaseFont(text, fontSize, textWidth, containerWidth);
}

function shrinkFont(text, fontSize, textWidth, containerWidth) {
  while (textWidth >= containerWidth) {
    textWidth = text.offsetWidth;
    fontSize = window.getComputedStyle(text).fontSize;

    if (textWidth >= containerWidth) {
      fontSize = parseFloat(fontSize) * 0.95;
      text.style.fontSize = `${fontSize}px`;
    }
  }
}

function increaseFont(text, fontSize, textWidth, containerWidth) {
  while (textWidth < containerWidth * 0.95 && fontSize != 40) {
    textWidth = text.offsetWidth;
    fontSize = window.getComputedStyle(text).fontSize;

    if (textWidth < containerWidth * 0.95) {
      fontSize = parseFloat(fontSize) * 1.05;
      if (fontSize > 40) fontSize = 40;
      text.style.fontSize = `${fontSize}px`;
    }
  }
}
