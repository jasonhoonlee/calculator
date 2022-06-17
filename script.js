

let firstOperand = '';
let lastOperand = '';
let currentOperation = null;

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operator]');

const percentButton = document.getElementById('#percentBtn');
const pointButton = document.getElementById('#pointBtn');
const signButton = document.getElementById('#signBtn');
const deleteButton = document.getElementById('#deleteBtn');
const clearButton = document.getElementById('#clearBtn');
const equalsButton = document.getElementById('#equalsBtn');

const currentOperationScreen = document.getElementById('#currentOperationScreen');
const lastOperationScreen = document.getElementById('#lastOperationScreen')


