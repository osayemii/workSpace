document.write("<p> JavaScript:");
document.writeln("is a\t scripting");
document.write("and a case-sensitive language.");
// let prom = prompt("Enter your name:", value);

// document.writeln(" " + prom);
var value = "";
var numone = prompt("enter first value to perform the multiplication operation", value);
var numtwo = prompt("enter second value to perform the multiplication operation", value);
var result = eval(numone * numtwo);
document.write("The result of multiplying: " + numone + " and " + numtwo + " is: " + result + ".");