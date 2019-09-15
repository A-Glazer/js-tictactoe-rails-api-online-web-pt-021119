// Code your JavaScript / jQuery solution here
var turn = 0
const winning_combo = [
    [0,1,2], [3,4,5], [6,7,8], 
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
]
var tds = document.querySelectorAll('td');

var player = function() { 
    if (turn % 2 === 0) {
        return "X";
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

var resetGame = function() {
    tds.forEach(function(el) {
        el.innerHTML = "";
    })
    turn = 0
}

var doTurn = function(letter) {
    updateState(letter)
    turn ++
    if (checkWinner() === true) {
        // resetGame()
    } else {
        return setMessage("Tie game.")
    }
    resetGame()
}
    
var attachListeners = function() {
    tds.forEach(function(el) {
     el.addEventListener('click', function(event) {
        doTurn(this) 
    })
    })

    var saveBoard = document.querySelector("button#save")
    saveBoard.addEventListener('click', function(event){
        
        $.post('/games')
    })

}
    
$(document).ready(function() {
    attachListeners()
})


