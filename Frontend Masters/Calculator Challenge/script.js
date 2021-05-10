let runningTotal = 0;
// the running total
let buffer = "0";
// what's on the screen
let previousOperator = null;
// + -  * / input
const screen = document.querySelector('.screen')

document.querySelector('.calc-buttons').addEventListener('click', function(event) {
  buttonClick(event.target.innerText);
  // function defined line 14-21
})

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
    // function from 36-64
  } else {
    handleNumber(value);
    // function from 26-34
  }
  rerender();
  // function from  91-93
}

function handleNumber(value) {
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
  rerender();
  // used line 22, defined in 91-93
}

function handleSymbol(value) {
  switch (value) {
    case 'C':
      buffer = "0";
      runningTotal = 0;
      previousOperator = null;
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = "" + runningTotal;
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    default:
      handleMath(value);
      // function defined 66-77
      break
  }
}

function handleMath(value) {
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = value;

  buffer = "0";
}

function flushOperation (intBuffer) {
  if (previousOperator  === "+") {
    runningTotal += intBuffer
  } else if (previousOperator  === "-") {
    runningTotal -= intBuffer
  } else if (previousOperator  === "×") {
    runningTotal *= intBuffer
  } else {
    runningTotal /= intBuffer
  }
}

function rerender() {
  screen.innerText = buffer;
}
