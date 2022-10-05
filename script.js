let operator = "";
let num1 = "0";
let num2 = "";
let mainDisplayText = "0";
let historyDisplayText = "";

const mainDisplay = document.querySelector(".main-display");
const historyDisplay = document.querySelector(".history-display");

const equals = document.querySelector(".equals");
const dot = document.querySelector(".dot");
const backspace = document.querySelector(".backspace");

const clearA = document.querySelector(".clear-all");
const clearE = document.querySelector(".clear-entry");

const operators = document.querySelectorAll(".operator");
const numbers = document.querySelectorAll(".number");

/*---Inputs---*/

equals.onclick = () => displayEquation(operate());
dot.onclick = () => numSelection(".");
backspace.onclick = () => {
  if (operator && !num2) {
    operatorSelection("d");
    return;
  }
  numSelection("d");
};
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
    return;
  }

  switch (e.key) {
    case "+":
      operators[0].click();
      return;
    case "-":
      operators[1].click();
      return;
    case "x":
    case "*":
      operators[2].click();
      break;
    case "/":
      operators[3].click();
      break;
    case "=":
    case "Enter":
      equals.click();
      break;
    case ".":
      dot.click();
      break;
    case "Backspace":
      backspace.click();
      break;
    case "c":
      clearE.click();
      break;
    case "0":
      numbers[0].click();
      break;
    case "1":
      numbers[1].click();
      break;
    case "2":
      numbers[2].click();
      break;
    case "3":
      numbers[3].click();
      break;
    case "4":
      numbers[4].click();
      break;
    case "5":
      numbers[5].click();
      break;
    case "6":
      numbers[6].click();
    case "7":
      numbers[7].click();
      break;
    case "8":
      numbers[8].click();
      break;
    case "9":
      numbers[9].click();
      break;
  }
});
function numSelection(numSelected) {
  if (!operator) {
    //If the operator hasn't been selected update num1
    num1 = updateNum(num1, numSelected);
  } else {
    num2 = updateNum(num2, numSelected);
  }
  displayMain();
}

function updateNum(num, numSelected) {
  if (num.length > 9) return num;
  if (numSelected === "d") return num.slice(0, -1);
  if (numSelected === "." && num.includes(".")) return num;

  if (num === "0") {
    if (numSelected === ".") return (num = "0.");
    return (num = numSelected);
  }

  return (num += numSelected);
}

function operatorSelection(op) {
  if (op === "d") operator = "";
  else operator = op;
  displayMain();
}

/*---Display---*/

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
  resetVariables(answer);
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

/*---Calculate---*/

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

/*---Reset---*/

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
