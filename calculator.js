/*
js-calculator

Author: Caleb McDonnell
email: caleb@mcdonnell.geek.nz

Copyright 2016 Caleb McDonnell
*/

window.onload = function(){
var calculator = document.getElementById("calculator");
var calc_form = document.getElementById("calc");
var calc_input = document.getElementsByName("calc_input")[0];
var calculaterable_inputs = document.querySelectorAll("[data-calculator]");

//a calculation object.
var calculation = {
  first_value: 0,
  second_value: 0,
  operation: "+"
}

//calculates the total vcalue in and returns the calcualtion object.
var calculateTotal = function(calc) {
	var total_value = 0;
  first_value = parseFloat(calc.first_value);
  second_value = parseFloat(calc.second_value);

	switch (calc.operation) {
  	case "+":
  		total_value = first_value + second_value;
    break;
    case "-":
  		total_value = first_value - second_value;
    break;
    case "/":
  		total_value = first_value/second_value;
    break;
    case "*":
  		total_value = first_value*second_value;
    break;
  }
  return total_value;
}

console.debug(calculator, calculaterable_inputs);

// Calculator functions
//When initiated, the calculator sets it's calculation object
function initCalculator(ev) {
	calculation.first_value = ev.target.value || 0;
  calculation.total_value = ev.target.value || 0;
  calc_input.value = "";
  calculation.second_value = 0;
  calculation.operation = ev.key;
  calculation.target = ev.target;

  //set calc postition
  	//find input locaiton
  var rect = ev.target.getBoundingClientRect();
	console.debug("Input bounding box",rect);


  //display calculator
  calculator.style.display = "block";
	calculator.style.top = rect.bottom+"px";
  calculator.style.left = rect.left+"px";

  calc_input.focus();
}



// after initiation, the calculator listens for keypress events.
// on keypress events, the calculator checks whether it is an operation, or number button.
//If it's a number, then ignore it.
//if it's an operation, then:
//    perform the pending calculation,
//    reset the current value/first_value to the result of the operation,
//    set the target value to the current_value
//    reset the current operation to the selected operation
//    reset the next value to

function submitCalculation(ev) {
  //called when the calculator is submitted, and updates the inputs accordingly
	if (calc_input.value == "") {
    ev.preventDefault();
    return false;
  }

  calculation.second_value = calc_input.value;

  var total = calculateTotal(calculation);

  calculation.first_value = total;
  calculation.target.value = total;
  calculation.operation = "+";
  calculation.second_value = "";
  calc_input.value = "";


  //If this is called from the final form submission. then  close it.
  if (ev) {
  	ev.preventDefault();
    //Hide the calculator when submitted
    calculator.style.display="none";
    //focus on the input again
    calculation.target.focus();

  }
  return false;
}



function calcInputListener(ev) {
  //called when button is pressed in calculator
  if (ev.key == "+" || ev.key == "-" || ev.key == "*" || ev.key == "/") {
    //if an operator button is pressed, then perform the calucation and queue up the next operation
    ev.preventDefault();
    if (ev.target.value !== "") {
    	submitCalculation(); //Pass in an empty value for the event so the calculator doesn't get hidden
    }
  	calculation.operation = ev.key;
		return false;
  }
  return true;
}

calc_form.addEventListener("submit", submitCalculation, true);
calc_form.addEventListener("keydown", calcInputListener, true);

// ------ Input listeners
function inputListener(ev) {

  //console.debug("Button pressed: "+ ev.key);

  if (ev.key == "+" || ev.key == "-" || ev.key == "*" || ev.key == "/") {
  	//console.debug("Opening Calculator")
    ev.preventDefault();
		initCalculator(ev);
		return false;
  }
	//console.debug("Allowing change")
  return true;
}

for (var i = 0 ; i < calculaterable_inputs.length ; i++){
	input = calculaterable_inputs[i];
	input.addEventListener("keydown", inputListener, true);
}

}
