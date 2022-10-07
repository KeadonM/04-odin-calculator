let operator = "";
let num1 = "0";
let num2 = "";
let mainDisplayText = "0";
let historyDisplayText = "";

const mainDisplay = document.querySelector(".main-text");
const historyDisplay = document.querySelector(".history-text");

const equals = document.querySelector(".equals");
const dot = document.querySelector(".dot");
const backspace = document.querySelector(".backspace");

const clearA = document.querySelector(".all");
const clearE = document.querySelector(".entry");

const operators = document.querySelectorAll(".operator");
const numbers = document.querySelectorAll(".number");

/*---INPUTS---*/

equals.onclick = () => displayEquation(operate());
dot.onclick = () => numSelection(".");
backspace.onclick = () => onDelete();
clearA.onclick = () => clearAll();
clearE.onclick = () => clearEntry();

operators.forEach((opButton) => {
  opButton.addEventListener("click", (e) => {
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
    clearA.click();
    clearA.classList.toggle("pressed");
    return;
  }

  switch (e.key) {
    case "+":
      operators[0].click();
      operators[0].classList.toggle("pressed");
      return;
    case "-":
      operators[1].click();
      operators[1].classList.toggle("pressed");
      return;
    case "x":
    case "*":
      operators[2].click();
      operators[2].classList.toggle("pressed");
      break;
    case "/":
      operators[3].click();
      operators[3].classList.toggle("pressed");
      break;
    case "=":
    case "Enter":
      equals.click();
      equals.classList.toggle("pressed");
      break;
    case ".":
      dot.click();
      dot.classList.toggle("pressed");
      break;
    case "Backspace":
      backspace.click();
      backspace.classList.toggle("pressed");
      break;
    case "c":
      clearE.click();
      clearE.classList.toggle("pressed");
      break;
    case "0":
      numbers[0].click();
      numbers[0].classList.toggle("pressed");
      break;
    case "1":
      numbers[1].click();
      numbers[1].classList.toggle("pressed");
      break;
    case "2":
      numbers[2].click();
      numbers[2].classList.toggle("pressed");
      break;
    case "3":
      numbers[3].click();
      numbers[3].classList.toggle("pressed");
      break;
    case "4":
      numbers[4].click();
      numbers[4].classList.toggle("pressed");
      break;
    case "5":
      numbers[5].click();
      numbers[5].classList.toggle("pressed");
      break;
    case "6":
      numbers[6].click();
      numbers[6].classList.toggle("pressed");
      break;
    case "7":
      numbers[7].click();
      numbers[7].classList.toggle("pressed");
      break;
    case "8":
      numbers[8].click();
      numbers[8].classList.toggle("pressed");
      break;
    case "9":
      numbers[9].click();
      numbers[9].classList.toggle("pressed");
      break;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.shiftKey && e.key === "c") {
    clearA.classList.toggle("pressed");
    return;
  }

  switch (e.key) {
    case "+":
      operators[0].classList.toggle("pressed");
      return;
    case "-":
      operators[1].classList.toggle("pressed");
      return;
    case "x":
    case "*":
      operators[2].classList.toggle("pressed");
      break;
    case "/":
      operators[3].classList.toggle("pressed");
      break;
    case "=":
    case "Enter":
      equals.classList.toggle("pressed");
      break;
    case ".":
      dot.classList.toggle("pressed");
      break;
    case "Backspace":
      backspace.classList.toggle("pressed");
      break;
    case "c":
      clearE.classList.toggle("pressed");
      break;
    case "0":
      numbers[0].classList.toggle("pressed");
      break;
    case "1":
      numbers[1].classList.toggle("pressed");
      break;
    case "2":
      numbers[2].classList.toggle("pressed");
      break;
    case "3":
      numbers[3].classList.toggle("pressed");
      break;
    case "4":
      numbers[4].classList.toggle("pressed");
      break;
    case "5":
      numbers[5].classList.toggle("pressed");
      break;
    case "6":
      numbers[6].classList.toggle("pressed");
      break;
    case "7":
      numbers[7].classList.toggle("pressed");
      break;
    case "8":
      numbers[8].classList.toggle("pressed");
      break;
    case "9":
      numbers[9].classList.toggle("pressed");
      break;
  }
});

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
  if (num.length >= 9) return num;
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
  else num1 = deleteNum(num1);

  displayMain();
}

function deleteNum(num) {
  num = num.slice(0, -1);
  if (!num) num = "0";

  return num;
}

/*---DISPLAY---*/

function displayMain() {
  mainDisplayText = `${num1} ${operator} ${num2}`;
  mainDisplay.textContent = mainDisplayText;
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
  if (num2) {
    num2 = "";
    displayMain();
  } else if (operator) {
    operator = "";
    displayMain();
  } else {
    clearAll();
  }
}

function resetVariables(num1Value) {
  num1 = num1Value;
  num2 = "";
  operator = "";
}
