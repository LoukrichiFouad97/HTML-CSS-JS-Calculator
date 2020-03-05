let runningTotal = 0;
let buffer = "0";
let previousOperator;
const screen = document.querySelector(".screen");

function buttonClick(value) {
	if (isNaN(parseInt(value))) {
		handleSymbol(value);
	} else {
		handleNumber(value);
	}
	rerender();
}

function handleSymbol(value) {
	switch (value) {
		case "c":
			buffer = "0";
			runningTotal = 0;
			break;
		case "=":
			if (previousOperator === null) {
				// need two numbers to do math
				return;
			}
			flushOperation(parseInt(buffer));
			previousOperator = null;
			buffer = runningTotal;
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
			break;
	}
}

function handleNumber(value) {
	if (buffer === "0") {
		buffer = value;
	} else {
		buffer += value;
	}
}

function rerender() {
	screen.innerText = buffer;
}

function handleMath(value) {
	if (buffer === "0") {
		// do nothing
		return;
	}
	const intBuffer = parseInt(buffer);
	if (runningTotal === 0) {
		runningTotal = intBuffer;
	} else {
		flushOperation(intBuffer);
	}
	previousOperator = value;
	buffer = "0";
}

function flushOperation(intBuffer) {
	if (previousOperator === "+") {
		runningTotal += intBuffer;
	} else if (previousOperator === "-") {
		runningTotal -= intBuffer;
	} else if (previousOperator === "×") {
		runningTotal *= intBuffer;
	} else {
		runningTotal /= intBuffer;
	}
}

function init() {
	document
		.querySelector(".calc-buttons")
		.addEventListener("click", function(event) {
			buttonClick(event.target.innerText);
		});
}
init();

/** Calculator
 * 1 - Get the value of taget event
 *   -- if it's number call handleNumber function
 *   -- else it's a symbol therefor call handleSymbol
 * 2 - clean the screen
 * 3 -
 */
