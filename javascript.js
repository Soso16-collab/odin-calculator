// prevent calculator-display overflow ??
// meme that shows up if you try dividing by zero?
// pi?
// exponentiation?
// square root? bonus for negative error message
// percent?
// negative (-) symbols for inputting negative numbers?
// reciprocals? this is a tough one
// remove displayText ???

// CURRENT:
// Add additional clause accounting for pi in setFirstOrSecondNumber that will set the screen element as π but the actual value as the variable pi
let operator = null;
let firstNumber = "";
let secondNumber = "";
let displayText = "";
let divideByZeroText = "Nice try! You can't divide by zero.";
let reciprocalOfZeroText = ".ytinifnI"
let squareRootNegativeText = "Well well well. Imaginary numbers are not built in.";
const pi = Math.PI;

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
  if (operator && firstNumber && secondNumber) {
    operate(operator, firstNumber, secondNumber);
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
  if (!Number.isNaN(Number(event.key))) {
    setFirstOrSecondNumber(event.key);
  } else if (event.key === ".") {
    addDecimalPoint();
  } else if (event.key === "+" || event.key === "-" || event.key === "*" || event.key === "/" || event.key === "%" || event.key === "^") {
    setOperator(event.key);
  } else if (event.key === "=" && firstNumber && secondNumber || event.key === "Enter" && (operator && firstNumber && secondNumber)) {
    operate(operator, firstNumber, secondNumber);
  } else if (event.key === "Backspace") {
    backspace();
  }
  console.log(event.key); // TESTING
});



function setFirstOrSecondNumber(number) {
  if (number === divideByZeroText || number === squareRootNegativeText) return; 
  else if (!operator) {
    firstNumber += number;
    appendDisplayText(number.toString());
  } else {
    secondNumber += number;
    appendDisplayText(number.toString());
  }

  testLog();
}

function setOperator(pendingOperator) {
  if (operator === "/" && Number(secondNumber) === 0) return; // If the user attempts to divide by zero, the answer of that cannot be operated on and so the operator buttons will be disabled
  else if (firstNumber && !operator && pendingOperator === "%") {
    operator = pendingOperator
    appendDisplayText(operator + " of ");
  } else if (firstNumber && !operator) {
    operator = pendingOperator;
    appendDisplayText(" " + operator + " ");
  } else if (operator && firstNumber && secondNumber && pendingOperator === "%") {
    operate(operator, firstNumber, secondNumber);
    operator = pendingOperator;
    appendDisplayText(operator + " of ");
  } else if (operator && firstNumber && secondNumber) { // This will run if an equation is present but an operator is clicked
    operate(operator, firstNumber, secondNumber);
    operator = pendingOperator;
    appendDisplayText(" " + operator + " ");
  };
  testLog();
}

function addDecimalPoint() {
  if (!operator && firstNumber && !firstNumber.includes(".")) {
    firstNumber += ".";
    appendDisplayText(".");
  } else if (operator && secondNumber && !secondNumber.includes(".")) {
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

function unaryOperate(unaryFunction) {
  if (firstNumber && !operator && !secondNumber) {
    firstNumber = roundNumber(unaryFunction(firstNumber));
    if (typeof firstNumber === "string") { // This means an error message was pushed
      calculatorDisplay.textContent = firstNumber;
      clear();
      return;
    }
    displayText = firstNumber;
    calculatorDisplay.textContent = displayText;
  } else if (firstNumber && operator && secondNumber) {
    secondNumber = roundNumber(unaryFunction(secondNumber));
    if (typeof secondNumber === "string") { // This means an error message was pushed
      calculatorDisplay.textContent = secondNumber;
      clear();
      return;
    }
    displayText = firstNumber + ` ${operator} ` + secondNumber;
    calculatorDisplay.textContent = displayText;
  }
  testLog();
}

function clear() {
  firstNumber = "";
  operator = null;
  secondNumber = "";
  displayText = "";
}

function clearText() {
  clear();
  calculatorDisplay.textContent = "";
}

function backspace() {
  if (firstNumber && !operator && !secondNumber) {
    calculatorDisplay.textContent = calculatorDisplay.textContent.slice(0, -1);
    displayText = displayText.slice(0, -1);
    firstNumber = firstNumber.slice(0, -1);
  } else if (firstNumber && operator === "%" && !secondNumber) { // Different because "% of " is 5 characters instead of 3
    calculatorDisplay.textContent = calculatorDisplay.textContent.slice(0, -5);
    displayText = displayText.slice(0, -5);
    operator = null;
  } else if (firstNumber && operator && !secondNumber) {
    calculatorDisplay.textContent = calculatorDisplay.textContent.slice(0, -3);
    displayText = displayText.slice(0, -3);
    operator = null;
  } else if (firstNumber && operator && secondNumber) {
    calculatorDisplay.textContent = calculatorDisplay.textContent.slice(0, -1);
    displayText = displayText.slice(0, -1);
    secondNumber = secondNumber.slice(0, -1);
  }
  testLog();
}

function operate(theOperator, number1, number2) {
  number1 = Number(number1);
  number2 = Number(number2);
  let answer = null;

  if (theOperator == "+") {
    answer = add(number1, number2);
  } else if (theOperator == "-") {
    answer = subtract(number1, number2);
  } else if (theOperator == "*") {
    answer = multiply(number1, number2);
  } else if (theOperator == "/") {
    answer = divide(number1, number2);
  } else if (theOperator == "^") {
    answer = exponentiate(number1, number2);
  } else if (theOperator == "%") {
    answer = percentOf(number1, number2);
  }
  answer = roundNumber(answer);
  clear();
  if (answer === divideByZeroText) calculatorDisplay.textContent = answer;
  setFirstOrSecondNumber(answer.toString());

  console.log(calculatorDisplay.textContent);
}

function roundNumber(number) {
  if (typeof (number) === "number") return Math.round(number * 1000) / 1000;
  else return number; // This clause exists for the sake of the negative square root error message to not make the unary function more complex
}

function testLog() {
  if (operator === "%") {
    console.log(firstNumber + operator + " of " + secondNumber)
  } else {
  console.log(firstNumber + " " + operator + " " + secondNumber);
  }
}
