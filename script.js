
let operandValue = '';
let operand1 = '';
let operand2 = '';
let currentOperation = ''
let currentOperand = 'first';
let lastOperator = null;
let lastButton = null;



const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operator]');


const percentButton = document.getElementById('percentBtn');
const pointButton = document.getElementById('pointBtn');
const signButton = document.getElementById('signBtn');
const deleteButton = document.getElementById('deleteBtn');
const clearButton = document.getElementById('clearBtn');
const equalsButton = document.getElementById('equalsBtn');

const currentOperationScreen = document.getElementById('currentOperationScreen');
const lastOperationScreen = document.getElementById('lastOperationScreen');



numberButtons.forEach((button) => {
  button.addEventListener('click',() => appendNumber(button.textContent));
})
operationButtons.forEach((button) => {
  button.addEventListener('click', () => setOperation(button.textContent));
})


equalsButton.addEventListener('click', () => calculateOperation());
pointButton.addEventListener('click', () => addDecimal());
percentButton.addEventListener('click', () => convertPercentage());
signButton.addEventListener('click', () => changeSign());

clearButton.addEventListener('click', () => clearScreen());
deleteButton.addEventListener('click', () => deleteScreen());


document.addEventListener('keyup', (e) => supportKeys(e));





const appendNumber = function(number) {
  if (lastButton === 'equal') {
    operand1 = '';
    operand2 = '';
    operandValue = ''
    currentOperand = 'first';
    currentOperation = '';
    lastOperationScreen.textContent = '';
  }

  //update operandValue
  operandValue += number;
  currentOperation += `${number}`;
  //update COS
  currentOperationScreen.textContent = currentOperation;

  //update the right operand
  if (currentOperand === 'first') operand1 = operandValue;
  else operand2 = operandValue;

  //update lastButton
  lastButton = 'number';
};


const setOperation = function(operator) {
  if (operandValue === '.' || operandValue === '') {
    return;
  }

  if (lastButton === 'equal') {
    lastOperationScreen.textContent = '';
  }

  if (lastButton === 'operator') {
    return;
  }

  //operand1 and operand2 are both defined, evaluate the result
  if (operand1 && operand2) {
    operand1 = evaluate(lastOperator);
    operand2 = '';
    currentOperation = `${operand1} ${operator} `;
    currentOperationScreen.textContent = currentOperation;
  } else {
    //update COS
    currentOperation += ` ${operator} `;
    currentOperationScreen.textContent = currentOperation;
  }

  //clear operandValue
  operandValue = '';
  //update currentOperand
  currentOperand = 'second';
  //update currentOperator
  lastOperator = operator;
  //update lastButton
  lastButton = 'operator';

};


const calculateOperation = function() {
  if (operand1 && operand2) {
    let result = evaluate(lastOperator);
    currentOperationScreen.textContent += ' = ';
    lastOperationScreen.textContent = result;

    operand1 = result;
    operand2 = '';
    // operandValue = ''
    currentOperand = 'second';
    currentOperation = result;

    //update lastButton
    lastButton = 'equal';
  }
};


const addDecimal = function() {
  if (lastButton === 'number' || operandValue === '') {
    if (!operandValue.includes('.')) {

      if (lastButton === 'equal') {
        operand1 = '';
        operand2 = '';
        operandValue = ''
        currentOperand = 'first';
        currentOperation = '';
        lastOperationScreen.textContent = '';
        currentOperationScreen.textContent = '';
      }

      operandValue += '.';
      currentOperationScreen.textContent += '.';
      currentOperation += '.';

      if (currentOperand === 'first') {
        operand1 = operandValue;
        currentOperation = operand1;
      } else {
        operand2 = operandValue;
        currentOperation = `${operand1} ${lastOperator} ${operand2}`;
      }

      currentOperationScreen.textContent = currentOperation;
      lastButton = 'point';

    }
  }
};

const convertPercentage = function() {

  if (lastButton === 'equal') {
    operandValue = operand1;
    operand1 = '';
    operand2 = '';
    currentOperand = 'first';
    currentOperation = null;
    lastOperationScreen.textContent = '';
    currentOperationScreen.textContent = '';
  }

  if (operandValue !== '') {
    operandValue = (operandValue/100).toFixed(2);

    if (currentOperand === 'first') {
      operand1 = operandValue;
      currentOperation = operand1;
    } else {
      operand2 = operandValue;
      currentOperation = `${operand1} ${lastOperator} ${operand2}`;
    }

    currentOperationScreen.textContent = currentOperation;
    lastButton = 'percent';
  }
};




const changeSign = function() {

  if (lastButton === 'equal') {
    operandValue = operand1;
    operand1 = '';
    operand2 = '';
    currentOperand = 'first'
    currentOperation = null;
    lastOperationScreen.textContent = '';
    currentOperationScreen.textContent = '';
  }

  if (operandValue !== '') {
    if (operandValue.includes('-')) operandValue = operandValue.slice(1, operandValue.length);
    else  operandValue = '-' + operandValue;

    if (currentOperand === 'first') {
      operand1 = operandValue;
      currentOperation = operand1;
    } else {
      operand2 = operandValue;
      currentOperation = `${operand1} ${lastOperator} ${operand2}`;
    }
    currentOperationScreen.textContent = currentOperation;
    lastButton = 'sign';
  }

}



const clearScreen = function() {
  operand1 = '';
  operand2 = '';
  operandValue = ''
  currentOperand = 'first';
  currentOperation = '';
  lastOperationScreen.textContent = '';
  currentOperationScreen.textContent = '';

  lastButton = 'clear';
};




const deleteScreen = function() {
  if (lastButton === 'equal') return;
  if (lastButton === 'operator') return;
  if (operandValue !== '') {
    operandValue = operandValue.slice(0, operandValue.length-1);
    currentOperation = currentOperation.slice(0, currentOperation.length -1);
    currentOperationScreen.textContent =
        currentOperationScreen.textContent
            .slice(0, currentOperationScreen.textContent.length - 1);

    if (currentOperand === 'first') operand1 = operandValue;
    else operand2 = operandValue;
  }
  lastButton = 'delete';
};




const supportKeys = function(e) {

  const keyCode = e.keyCode;
  const key = e.key;

  //if key is a number
  const numbers = ['0','1','2','3','4','5','6','7','8','9'];
  const keyIsANumber = numbers.some(number => number === key)
  if (keyIsANumber) {
    if (e.shiftKey === false) appendNumber(key);
    return;
  }

  //if key is a operator
  const operators = ['/', '+', '-', 'x'];
  const keyIsAnOperator = operators.some(operator => key === operator);
  if (keyIsAnOperator) {
     setOperation(key);
     return;
  }

  //if key is a special operator
  const specialOperators = ['c', 'Backspace', 'v', 'p', '.'];
  const keyIsSpecialOperator = specialOperators.some(specialOperator => key === specialOperator);
  if (keyIsSpecialOperator) {
    if (key === '.') addDecimal();
    if (key === 'p') convertPercentage();
    if (key === 'v') changeSign();
    if (key === 'c') clearScreen();
    if (key === 'Backspace') deleteScreen();
    return;
  }

  //if key is equal
  if (key === '=' || key === 'Enter') {
    calculateOperation();
    return;
  }

}






const evaluate = function(operator) {
  let result;

  if (operator === '+') result = add(Number(operand1), Number(operand2));
  if (operator === '-') result = subtract(Number(operand1), Number(operand2));
  if (operator === 'x') result = multiply(Number(operand1), Number(operand2));
  if (operator === '/') result = divide(Number(operand1), Number(operand2));

  if (result % 1 !== 0) return String(result.toFixed(2));
  else return String(result);
};



const add = function(a,b) { return a + b };
const subtract = function(a,b) { return a - b };
const divide = function(a,b) { return a / b };
const multiply = function(a,b) { return a * b };






