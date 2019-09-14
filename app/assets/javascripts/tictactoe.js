// Code your JavaScript / jQuery solution here
var player = function(turn) {
    console.log(turn); 
    if (turn % 2 == 0) {
        return "X";
    } else {
        return "O";
    } 
}