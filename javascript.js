// the code should operate when 2 numbers exist and a second operator is clicked, the result should become the first number
// round answers with long decimals to 3 decimal places
// decimal . button, disabled if there is already a . in the display
// backspace button
// keyboard support
var operator;
var firstNumber = "";
var secondNumber = "";
var displayText = "";

const zeroButton = document.querySelector("#zero-button");
const oneButton = document.querySelector("#one-button");
const twoButton = document.querySelector("#two-button");
const threeButton = document.querySelector("#three-button");
const fourButton = document.querySelector("#four-button");
const fiveButton = document.querySelector("#five-button");
const sixButton = document.querySelector("#six-button");
const sevenButton = document.querySelector("#seven-button");
const eightButton = document.querySelector("#eight-button");
const nineButton = document.querySelector("#nine-button");

const plusButton = document.querySelector("#plus-button");
const subtractButton = document.querySelector("#subtract-button");
const multiplyButton = document.querySelector("#multiply-button");
const divideButton = document.querySelector("#divide-button");
const equalsButton = document.querySelector("#equals-button");
const clearButton = document.querySelector("#clear-button");

const calculatorDisplay = document.querySelector("#calculator-display");

zeroButton.addEventListener("click", () => {
  setFirstOrSecondNumber("0");
});

oneButton.addEventListener("click", () => {
  setFirstOrSecondNumber("1");
});

twoButton.addEventListener("click", () => {
  setFirstOrSecondNumber("2");
});

threeButton.addEventListener("click", () => {
  setFirstOrSecondNumber("3");
});

fourButton.addEventListener("click", () => {
  setFirstOrSecondNumber("4");
});

fiveButton.addEventListener("click", () => {
  setFirstOrSecondNumber("5");
});

sixButton.addEventListener("click", () => {
  setFirstOrSecondNumber("6");
});

sevenButton.addEventListener("click", () => {
  setFirstOrSecondNumber("7");
});

eightButton.addEventListener("click", () => {
  setFirstOrSecondNumber("8");
});

nineButton.addEventListener("click", () => {
  setFirstOrSecondNumber("9");
});

plusButton.addEventListener("click", () => {
  setOperator("+");
});

subtractButton.addEventListener("click", () => {
  setOperator("-");
});

multiplyButton.addEventListener("click", () => {
  setOperator("×");
});

divideButton.addEventListener("click", () => {
  setOperator("÷");
});

equalsButton.addEventListener("click", () => {
  if (operator !== undefined && firstNumber !== "" && secondNumber !== "") {
    operate(operator, firstNumber, secondNumber);
    clear();
  }
});

clearButton.addEventListener("click", () => {
  clearText();
  console.log(firstNumber + " " + operator + " " + secondNumber);
});

function appendDisplayText(appendingText) {
  calculatorDisplay.textContent = displayText += appendingText;
}

function setFirstOrSecondNumber(number) {
  if (operator === undefined) {
    firstNumber += number;
    appendDisplayText("" + number);
  } else {
    secondNumber += number;
    appendDisplayText("" + number);
  }

  console.log(firstNumber);
  console.log(secondNumber);
  console.log(operator);
}

function setOperator(pendingOperator) {
  if (firstNumber !== "" && operator === undefined) {
    operator = pendingOperator;
    appendDisplayText(" " + operator + " ");
  }

  console.log(firstNumber + " " + operator + " " + secondNumber);
}

function add(number1, number2) {
  return number1 + number2;
}

function subtract(number1, number2) {
  return number1 - number2;
}

function multiply(number1, number2) {
  return number1 * number2;
}

function divide(number1, number2) {
  if (number2 == 0) {
    return "Nice try! You can't divide by zero.";
  } 
  return number1 / number2;

}

function clear() {
  firstNumber = "";
  operator = undefined;
  secondNumber = "";
  displayText = "";
}

function clearText() {
  clear();
  calculatorDisplay.textContent = ""
}

function operate(theOperator, number1, number2) {
  number1 = Number(number1);
  number2 = Number(number2);

  if (theOperator == "+") {
    appendDisplayText(" = " + add(number1, number2));
  } else if (theOperator == "-") {
    appendDisplayText(" = " + subtract(number1, number2));
  } else if (theOperator == "×") {
    appendDisplayText(" = " + multiply(number1, number2));
  } else if (theOperator == "÷") {
    appendDisplayText(" = " + divide(number1, number2));
  }

  console.log(calculatorDisplay.textContent);
}