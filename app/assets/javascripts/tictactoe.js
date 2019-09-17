// Code your JavaScript / jQuery solution here
var turn = 0
const winning_combo = [
    [0,1,2], [3,4,5], [6,7,8], 
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
]
$(document).ready(function() {
    tds = document.querySelectorAll('td');
    attachListeners()
})

var player = function() { 
    if (turn % 2 === 0) {
        return "X";
    } else {
        return "O";
} 
}

var validMove = function(square) {
    if (square.innerHTML === "" || square.innerHTML === " "){
        updateState(square)
        turn ++
    }else{
        alert("Location already taken. Please select a different spot.")
    }
}


var updateState = function(square) {
    var token = player()
    $(square).text(token) 
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
    setMessage("")
}

var doTurn = function(letter) {
    // var td = tds.forEach(function(el) {
    //     el.innerHTML != "";
    // })
    validMove(letter)
    // updateState(letter)
    // turn ++
    if (checkWinner() === true) {
        saveGame()
        resetGame()
    } else if (turn === 9) {     
        setMessage("Tie game.");
        saveGame()
        resetGame();
    }
}
    
var attachListeners = function() {
    tds.forEach(function(el) {
     el.addEventListener('click', function(event) {
        doTurn(this) 
    })
    })

    var saveBoard = document.querySelector("button#save")
    saveBoard.addEventListener('click', function(event){
      
        // $("div#games").forEach(function(obj) { 
        //         var gameId = obj.id
        //         debugger
        //         if (gameId === this.id) {
        //             $.patch(`/games/${this.id}`)
        //         }else {
                    saveGame()
                    $.post('/games')
                // }
                
                
    //         })
    })

    var previousBoard = document.querySelector("button#previous")
    previousBoard.addEventListener('click', function(event){
        
        $.get('/games', function(object) {
            // debugger
            $("div#games").empty()
            object.data.forEach(function(obj) { 
                button = `<button>${obj.id} </button>`
                $("div#games").append(button)
                // obj.attributes.state 
            })
        }   )    
    })
        
    

    var clearBoard = document.querySelector("button#clear")
    clearBoard.addEventListener('click', function(event){
        resetGame()

    })

}
    

var saveGame = function() {
    debugger
    var board = []    
    tds.forEach(function(el) {
        board.push(el.innerHTML);
    })
    // return board
    button = `<button id=data-id> ${this.id}</button>`
    
    $("div#games").append(button)
}
