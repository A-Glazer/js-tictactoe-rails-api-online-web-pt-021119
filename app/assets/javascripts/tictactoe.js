// Code your JavaScript / jQuery solution here
var turn = 0
const winning_combo = [
    [0,1,2], [3,4,5], [6,7,8], 
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
]

var player = function() { 
    if (turn % 2 === 0) {
        return "X";
    // }else if (turn === 0) {
    //     return "X";
    } else {
        return "O";
    } 
}

var updateState = function(square) {
    var token = player()
    square.innerHTML = token
}

var setMessage = function (string) {
    document.querySelector("#message").innerHTML = string
} 

var checkWinner = function() {
    var board = []
    var winner = false
    var tds = document.querySelectorAll('td');

    tds.forEach(function(el) {
        board.push(el.innerHTML);
    })
    
    winning_combo.forEach(function(combo) {
        if (board[combo[0]] !== "" && board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]) {
           setMessage(`Player ${board[combo[0]]} Won!`)
            return winner = true
        }

    })
    return winner
}