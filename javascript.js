// prevent calculator-display overflow ??
// meme that shows up if you try dividing by zero?
// remove displayText ???

// CURRENT:

let calculatorState = "empty";
let operator = null;
let firstNumber = "";
let secondNumber = "";
let displayText = "";
let divideByZeroText = "Nice try! You can't divide by zero.";
let reciprocalOfZeroText = ".ytinifnI"
let squareRootNegativeText = "Well well well. Imaginary numbers are not built in.";
const pi = 3.142;

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
const decimalButton = document.querySelector("#decimal-button");
const piButton = document.querySelector("#pi-button");

const plusButton = document.querySelector("#plus-button");
const subtractButton = document.querySelector("#subtract-button");
const multiplyButton = document.querySelector("#multiply-button");
const divideButton = document.querySelector("#divide-button");
const percentOfButton = document.querySelector("#percent-of-button");
const exponentButton = document.querySelector("#exponent-button");
const positiveOrNegativeButton = document.querySelector("#positive-or-negative-button");
const reciprocalButton = document.querySelector("#reciprocal-button");
const squareRootButton = document.querySelector("#square-root-button");
const equalsButton = document.querySelector("#equals-button");
const clearButton = document.querySelector("#clear-button");
const backspaceButton = document.querySelector("#backspace-button");

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

decimalButton.addEventListener("click", addDecimalPoint);

piButton.addEventListener("click", () => {
  setFirstOrSecondNumber(pi);
});

plusButton.addEventListener("click", () => {
  setOperator("+");
});

subtractButton.addEventListener("click", () => {
  setOperator("-");
});

multiplyButton.addEventListener("click", () => {
  setOperator("*");
});

divideButton.addEventListener("click", () => {
  setOperator("/");
});

percentOfButton.addEventListener("click", () => {
  setOperator("%");
});

exponentButton.addEventListener("click", () => {
  setOperator("^");
});

positiveOrNegativeButton.addEventListener("click", () => unaryOperate(switchNumberSign));

reciprocalButton.addEventListener("click", () => unaryOperate(reciprocate));

squareRootButton.addEventListener("click", () => unaryOperate(squareRoot));

equalsButton.addEventListener("click", () => {
  if (calculatorState === "enteringSecondNumber") {
    binaryOperate(operator, firstNumber, secondNumber);
  }
});

clearButton.addEventListener("click", () => {
  clearText();
  testLog();
});

backspaceButton.addEventListener("click", backspace);

function appendDisplayText(appendingText) {
  calculatorDisplay.textContent = displayText += appendingText;
}

document.addEventListener("keydown", (event) => {
  if (!Number.isNaN(Number(event.key))) { // could simplify logic
    setFirstOrSecondNumber(event.key);
  } else if (event.key === ".") {
    addDecimalPoint();
  } else if (event.key === "+" || event.key === "-" || event.key === "*" || event.key === "/" || event.key === "%" || event.key === "^") {
    setOperator(event.key);
  } else if (calculatorState === "enteringSecondNumber" && (event.key === "=" || event.key === "enter")) {
    binaryOperate(operator, firstNumber, secondNumber);
  } else if (event.key === "Backspace") {
    backspace();
  }
  console.log(event.key); // TESTING
});



function setFirstOrSecondNumber(number) {
  if ((calculatorState === "empty" || (calculatorState === "enteringFirstNumber" && number !== pi))) { // Make logic simplier considering empty is repeated?
    firstNumber += number;
    appendDisplayText(number.toString());
    calculatorState = "enteringFirstNumber";
  } else if ((number !== pi) || (number === pi && calculatorState === "operatorSelected")) { // The first logic statement does not check if the calculatorState is enteringSecondNumber because if the state was not empty or enteringFirstNumber (as seen in the first logic statement above) and a number was inputted, the operator must exist.
    secondNumber += number;
    appendDisplayText(number.toString());
    calculatorState = "enteringSecondNumber";
  }
  testLog();
}

function setOperator(pendingOperator) {
  if (operator === "/" && Number(secondNumber) === 0) return; // If the user attempts to divide by zero, the answer of that cannot be operated on and so the operator buttons will be disabled
  else if (calculatorState === "enteringFirstNumber") {
    operator = pendingOperator;
    appendDisplayText(
      `${pendingOperator === "%" 
        ? "% of " 
        : ` ${operator} `
      }`);
    calculatorState = "operatorSelected";
  } else if (calculatorState === "enteringSecondNumber") {
    binaryOperate(operator, firstNumber, secondNumber);
    operator = pendingOperator;
    appendDisplayText(
      `${pendingOperator === "%" 
        ? "% of " 
        : ` ${operator} `
      }`);
    calculatorState = "operatorSelected";
  };
  testLog();
}

function addDecimalPoint() {
  if (calculatorState === "enteringFirstNumber" && !firstNumber.includes(".")) {
    firstNumber += ".";
    appendDisplayText(".");
  } else if (calculatorState === "enteringSecondNumber" && !secondNumber.includes(".")) {
    secondNumber += ".";
    appendDisplayText(".");
  }
}

// Binary Operators

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
  if (Number(number2) == 0) {
    return divideByZeroText;
  } 
  return number1 / number2;

}

function exponentiate(number1, number2) {
  return number1 ** number2;
}

function percentOf(number1, number2) {
  return (number1 / 100) * number2;
}

function switchNumberSign(number) {
  return -number;
}

function reciprocate(number) {
  if (Number(number) === 0) return reciprocalOfZeroText;
  else return 1 / number;
}

function squareRoot(number) {
  if (number < 0) return squareRootNegativeText;
  else return Math.sqrt(number);
}

function clear() {
  firstNumber = "";
  operator = null;
  secondNumber = "";
  displayText = "";
  calculatorState = "empty";
}

function clearText() {
  clear();
  calculatorDisplay.textContent = "";
}

function backspace() {
  let characterSliceAmount = 0;
  if (calculatorState === "enteringFirstNumber") {
    characterSliceAmount = 1;
    firstNumber = firstNumber.slice(0, -1);
    if (firstNumber === "") calculatorState = "empty";
  } else if (calculatorState === "operatorSelected") {
    characterSliceAmount = operator === "%" ? 5 : 3;
    operator = null;
    calculatorState = "enteringFirstNumber";  
  } else if (calculatorState === "enteringSecondNumber") {
    characterSliceAmount = 1;
    secondNumber = secondNumber.slice(0, -1);
    if (secondNumber === "") calculatorState = "operatorSelected";
  }
  calculatorDisplay.textContent = calculatorDisplay.textContent.slice(0, -characterSliceAmount);
  displayText = displayText.slice(0, -characterSliceAmount);
  testLog();
}

function binaryOperate(binaryOperator, number1, number2) {
  number1 = Number(number1);
  number2 = Number(number2);
  let answer = null;

  if (binaryOperator == "+") {
    answer = add(number1, number2);
  } else if (binaryOperator == "-") {
    answer = subtract(number1, number2);
  } else if (binaryOperator == "*") {
    answer = multiply(number1, number2);
  } else if (binaryOperator == "/") {
    answer = divide(number1, number2);
  } else if (binaryOperator == "^") {
    answer = exponentiate(number1, number2);
  } else if (binaryOperator == "%") {
    answer = percentOf(number1, number2);
  }
  answer = roundNumber(answer);
  clear();
  if (answer === divideByZeroText || answer === Infinity || Number.isNaN(answer)) { // Errors
    calculatorDisplay.textContent = answer;
  } else {
    setFirstOrSecondNumber(answer.toString());
  }

  console.log(calculatorDisplay.textContent);
}

function unaryOperate(unaryFunction) {
  let answer = null;
  if (calculatorState === "enteringFirstNumber" || calculatorState === "enteringSecondNumber") {
    answer = roundNumber(unaryFunction(calculatorState === "enteringFirstNumber" ? firstNumber : secondNumber));
    if (answer === reciprocalOfZeroText || answer === squareRootNegativeText) { // Errors
      clear();
      calculatorDisplay.textContent = answer;
    } else {
      calculatorState === "enteringFirstNumber" 
      ? ((firstNumber = answer), displayText = answer) 
      : ((secondNumber = answer), displayText = firstNumber + ` ${operator} ` + secondNumber);
      calculatorDisplay.textContent = displayText;
    }
  }
  testLog();
}

function roundNumber(number) {
  if (typeof (number) === "number") return (Math.round(number * 1000) / 1000).toString();
  else return number; // This clause happens when number is an error message
}

function testLog() {
  console.log(firstNumber + 
  `${operator === "%" 
  ? operator + " of " 
  : ` ${operator} `
  }` + secondNumber + ` ${calculatorState}`);
}
