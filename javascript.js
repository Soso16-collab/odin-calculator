// the code should operate when 2 numbers exist and a second operator is clicked, the result should become the first number
// change instances of undefined with !
// round answers with long decimals to 3 decimal places
// decimal . button, disabled if there is already a . in the display
// backspace button
// keyboard support
// html + css
var operator;
var firstNumber = "";
var secondNumber = "";
var displayText = "";
var divideByZeroText = "Nice try! You can't divide by zero."

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
  }
});

clearButton.addEventListener("click", () => {
  clearText();
  testLog();
});

function appendDisplayText(appendingText) {
  calculatorDisplay.textContent = displayText += appendingText;
}

function setFirstOrSecondNumber(number) {
  if (number === divideByZeroText) {
    return;
  } else if (operator === undefined) {
    firstNumber += number;
    appendDisplayText("" + number);
  } else {
    secondNumber += number;
    appendDisplayText("" + number);
  }

  testLog();
}

function setOperator(pendingOperator) {
  if (operator === "÷" && secondNumber === "0") { // If the user attempts to divide by zero, the answer of that cannot be operated on and so the operator buttons will be disabled
    return;
  } else if (firstNumber !== "" && operator === undefined) {
    operator = pendingOperator;
    appendDisplayText(" " + operator + " ");
  } else if (operator !== undefined && firstNumber !== "" && secondNumber !== "") { // This will run if an equation is present but an operator is clicked
    operate(operator, firstNumber, secondNumber);
    operator = pendingOperator;
    appendDisplayText(" " + operator + " ");
  };
  testLog();
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
    return divideByZeroText;
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
  let answer = null;

  if (theOperator == "+") {
    answer = add(number1, number2);
  } else if (theOperator == "-") {
    answer = subtract(number1, number2);
  } else if (theOperator == "×") {
    answer = multiply(number1, number2);
  } else if (theOperator == "÷") {
    answer = divide(number1, number2);
  }

  clear();
  if (answer === divideByZeroText) calculatorDisplay.textContent = answer
  setFirstOrSecondNumber(answer.toString());

  console.log(calculatorDisplay.textContent);
}

function testLog() {
  console.log(firstNumber + " " + operator + " " + secondNumber);
}