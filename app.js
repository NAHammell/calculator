const display = document.getElementById('display');
const numPad = document.getElementById('numPad');
const functions = document.getElementById('functions');

let displayVal = [];

let expression = []
let output = [];
let stack = [];

function isADigit(x) {
    if (x != '+' && x != '-' && x != '*' && x != '/') {
        return true;
    } else {
        return false;
    }
}

function getPrecedence (x) {
    if (x == '+' || x == '-') {
        return 1;
    } else if (x == '*' || x == '/') {
        return 2;
    }
}

function shuntingYardAlgo(expression) {
    for (i = 0; i < expression.length; i++) {
        x = expression[i];

        if (isADigit(x)) {
            output.push(x);
        }  else {
            if (stack.length > 0 && getPrecedence(x) <= getPrecedence(stack[stack.length -1])) {
                output.push(stack.pop());
            }
            stack.push(x);
        }
    }

    while (stack.length != 0) {
        output.push(stack.pop());
    }
}

function postfixEval (expression) {
    for (i = 0; i < expression.length; i++) {
        let x = expression[i];

        if (isADigit(x)) {
            stack.push(x);
        } else {
            let a = stack.pop();
            let b = stack.pop();

            if (x == '+') {
                stack.push(+b + +a);
            } else if (x == '-') {
                stack.push(b - a);
            } else if (x == '*') {
                stack.push(b * a);
            } else if (x == '/') {
                stack.push(b / a);
            }
        }
    }

    return stack[0];
}

numPad.addEventListener('click', function(e) {
    if (e.target.id === 'clear') {
        displayVal.length = 0;
        expression.length = 0;
        output.length = 0;
        stack.length = 0;
        display.textContent = '';
        return;
    } else if (e.target.id === '.' && displayVal.includes('.')) {
        return;
    } else if (e.target.id === 'numPad') {
        return;
    } else if (e.target.id === 'delete') {
        displayVal.pop();
        display.textContent = displayVal.join('');
        return;
    }

    displayVal.push(e.target.id);
    display.textContent = displayVal.join('');
});

functions.addEventListener('click', function(e) {
    if (displayVal != null && e.target.id != '=') {
        expression.push(displayVal.join(''));
        expression.push(e.target.id);

        while (displayVal.length > 0) {
            displayVal.pop();
        }

        display.textContent = displayVal;

        console.log(displayVal);
        console.log(expression);
    } else if (displayVal != null && e.target.id == '=') {
        expression.push(displayVal.join(''));
        
        displayVal.length = 0;

        shuntingYardAlgo(expression);
        console.log(output);
        display.textContent = postfixEval(output);

        expression.length = 0;
        output.length = 0;
        stack.length = 0;
    }
});