let boardLayer;
let diskLayer;
let scoreLayer;
//let possibleMoveLayer;
let turnBox;
let commandsLayer;
let gap = 5;
let cellSize = 50;
let diskCellSize = 50;
let turn = 2;
let stateCopy;
let gameOverFlag = false;
let tieGameFlag = false;
let blackWinFlag = false;
let whiteWinFlag = false;
let black = 0;
let white = 0;

let state =[
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,1,2,0,0,0],
    [0,0,0,2,1,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0]
];

window.onload = function() {
    turnBox = document.getElementById("turnBox");
    boardLayer = document.getElementById("boardLayer");
    boardLayer.style.height = (cellSize * 8) + (gap * 9) + "px";
    boardLayer.style.width = (cellSize * 8) + (gap * 9) + "px";
    diskLayer = document.getElementById("diskLayer");
    //possibleMoveLayer = document.getElementById("possibleMoveLayer");
    scoreLayer = document.getElementById("scoreLayer");
    commandsLayer = document.getElementById("commandsLayer");
    newGame();
    turnDisk();
    score();
}

/**
 * Funtion to reset the game.
 */
function newGame() {
    state = [
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,1,2,0,0,0],
        [0,0,0,2,1,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]
    ];
    /*
    [
    [2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,1,1],
    [2,2,2,2,2,2,0,0],
    [2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2]
]; 
    */
    turn = 2;
    gameOverFlag = false;
    tieGameFlag = false;
    blackWinFlag = false;
    whiteWinFlag = false;
    createBoard();
    createDisk();
    turnDisk();
    score();
}

/**
 * Create a the board for the game;
 */
function createBoard() {
    for (let row = 0; row < 8; row++) {    
        for (let column = 0; column < 8; column++) {    
            let tableCell = document.createElement("div");
            tableCell.style.position = "absolute";
            tableCell.style.height = cellSize + "px";
            tableCell.style.width = cellSize + "px";
            tableCell.style.backgroundColor = "green";
            tableCell.style.top = (cellSize + gap) * row + gap + "px";
            tableCell.style.left = (cellSize + gap) * column + gap + "px";
            tableCell.addEventListener("click", function() {
                play(turn, row, column);
            });
            boardLayer.appendChild(tableCell);            
        }
    }
}

function createDisk() {
    let affectedList 
    diskLayer.innerHTML = "";
    for (let row = 0; row < 8; row++) {    
        for (let column = 0; column < 8; column++) {    
            if(state[row][column] == 0) {
            }

            else {
                let diskCell = document.createElement("div");
                diskCell.style.position = "absolute";
                diskCell.style.height = diskCellSize + "px";
                diskCell.style.width = diskCellSize + "px";
                diskCell.style.top = (diskCellSize + gap) * row + gap + "px";
                diskCell.style.left = (diskCellSize + gap) * column + gap + "px";
                diskCell.style.borderRadius = "50%";
                
                if(state[row][column] == 1) {
                    diskCell.style.backgroundColor = "white";
                }
                
                if(state[row][column] == 2) {
                    diskCell.style.backgroundColor = "black";
                }

                boardLayer.appendChild(diskCell);
            }
        }
    }
}

/*
function createPossibleMoveLayer() {
    possibleMoveLayer.innerHTML = "";
    for(let row = 0; row < 8; row++) {
        for(let column = 0; column < 8; column++) {
            if(state[row][column] == 0) {

                let diskCellP = document.createElement("div");
                diskCellP.style.position = "absolute";
                diskCellP.style.height = diskCellSize + "px";
                diskCellP.style.width = diskCellSize + "px";
                diskCellP.style.top = (diskCellSize + gap) * row + gap + "px";
                diskCellP.style.left = (diskCellSize + gap) * column + gap + "px";
                diskCellP.style.borderRadius = "50%";
                
                if(state[row][column] == 1) {
                    diskCellP.style.backgroundColor = "white";
                }
                
                if(state[row][column] == 2) {
                    diskCellP.style.backgroundColor = "black";
                }

                boardLayer.appendChild(diskCellP);
            }
        }
    }
}*/

/**
 * Recreate the disk La$yer after onclick.
 * @param {*} row 
 * @param {*} column 
 */
function play(id, row, column) {
    let affectedList = [];
    affectedList = affectedDisks(id, row, column);
    
    if(state[row][column] != 0) {
        window.alert("Invalid position!");
        return;
    }
    if(state[row][column] == 0 && affectedList.length != 0) {
        state[row][column] = id;
        changeDisk(affectedList);
        verifyEndGame();
        if(id == 1 && isPossibleToMove(2)) {
            changeTurn(1);
            //computer(id);
            console.log(turn);
        }
        else if(id == 2 && isPossibleToMove(1)) {
            changeTurn(2);
            //computer(id);
            console.log(turn); 
        } 
        //console.log(state);
        createDisk();
        turnDisk();
        score();
    }
}

function computer(id) {
    
}

function changeTurn(id) {
    if(id == 1) {
        turn = 2;
    }
    else {
        turn = 1;
    }
}

function changeDisk(list) {
    for(let i = 0; i < list.length; i++) {
        let aux = list[i];
        switch(state[aux.row][aux.column]) {
            case 1:
                state[aux.row][aux.column] = 2;
                break;
            case 2:
                state[aux.row][aux.column] = 1;
                break;
        }
    }
}

function affectedDisks(id, row, column) {
    // verify vertically up
    let affectedList = [];//clean the list after each verication
    let possibleDisks = [];
    let tempColumn = column; 
    let tempRow = row;
    //verify right
    
    while(tempColumn < 7) {
        tempColumn += 1;
        if(state[row][tempColumn] == 0) {
            break;
        }
        else if(state[row][tempColumn] == id) {
            affectedList = affectedList.concat(possibleDisks);
            break;
        } 
        else {
            let diskLocation = {row: row, column: tempColumn};
            possibleDisks.push(diskLocation);
        }
    }

    //verify left
    tempColumn = column;
    possibleDisks = [];
    while(tempColumn > 0) {
        tempColumn -= 1;
        if(state[row][tempColumn] == 0) {
            break;
        }
        else if(state[row][tempColumn] == id) {
            affectedList = affectedList.concat(possibleDisks);
            break;
        } 
        else {
            let diskLocation = {row: row, column: tempColumn};
            possibleDisks.push(diskLocation);
        }
    }

    //verify down
    possibleDisks = [];
    tempRow = row;
    while(tempRow < 7) {
        tempRow += 1;
        if(state[tempRow][column] == 0) {
            break;
        }
        else if(state[tempRow][column] == id) {
            affectedList = affectedList.concat(possibleDisks);
            break;
        } 
        else {
            let diskLocation = {row: tempRow, column: column};
            possibleDisks.push(diskLocation);
        }
    }

    //verify up
    possibleDisks = [];
    tempRow = row;
    while(tempRow > 0) {
        tempRow -= 1;
        if(state[tempRow][column] == 0) {
            break;
        }
        else if(state[tempRow][column] == id) {
            affectedList = affectedList.concat(possibleDisks);
            break;
        } 
        else {
            let diskLocation = {row: tempRow, column: column};
            possibleDisks.push(diskLocation);
        }
    }

    //verify diagonal right up
    possibleDisks = [];
    tempRow = row;
    tempColumn = column;
    while(tempRow > 0 && tempColumn < 7) {
        tempRow -= 1;
        tempColumn += 1;
        if(state[tempRow][tempColumn] == 0) {
            break;
        }
        else if(state[tempRow][tempColumn] == id) {
            affectedList = affectedList.concat(possibleDisks);
            break;
        } 
        else {
            let diskLocation = {row: tempRow, column: tempColumn};
            possibleDisks.push(diskLocation);
        }
    }

    //verify diagonal right down
    possibleDisks = [];
    tempRow = row;
    tempColumn = column;
    while(tempRow < 7 && tempColumn < 7) {
        tempRow += 1;
        tempColumn += 1;
        if(state[tempRow][tempColumn] == 0) {
            break;
        }
        else if(state[tempRow][tempColumn] == id) {
            affectedList = affectedList.concat(possibleDisks);
            break;
        } 
        else {
            let diskLocation = {row: tempRow, column: tempColumn};
            possibleDisks.push(diskLocation);
        }
    }

    //verify diagonal left up
    possibleDisks = [];
    tempRow = row;
    tempColumn = column;
    while(tempRow > 0 && tempColumn > 0) {
        tempRow -= 1;
        tempColumn -= 1;
        if(state[tempRow][tempColumn] == 0) {
            break;
        }
        else if(state[tempRow][tempColumn] == id) {
            affectedList = affectedList.concat(possibleDisks);
            break;
        } 
        else {
            let diskLocation = {row: tempRow, column: tempColumn};
            possibleDisks.push(diskLocation);
        }
    }

    //verify diagonal left down
    possibleDisks = [];
    tempRow = row;
    tempColumn = column;
    while(tempRow < 7 && tempColumn > 0) {
        tempRow += 1;
        tempColumn -= 1;
        if(state[tempRow][tempColumn] == 0) {
            break;
        }
        else if(state[tempRow][tempColumn] == id) {
            affectedList = affectedList.concat(possibleDisks);
            break;
        } 
        else {
            let diskLocation = {row: tempRow, column: tempColumn};
            possibleDisks.push(diskLocation);
        }
    }
    return affectedList;
}

function isPossibleToMove(id) {
    let affectedList = [];
    for(let row = 0; row < 8; row++) {
        for(let column = 0; column < 7; column++) {
            affectedList = affectedDisks(id, row, column);
            if(state[row][column] == 0 && affectedList.length != 0) {
                return true;
            }
        }
    }
    return false;
}

/**
 * Calculate the point for black and white pieces.
 */
function score() {
    black = 0;
    white = 0;
    for(let row = 0; row < 8; row++) {
        for(let column = 0; column < 8; column++) {
            if(state[row][column] == 2)  {
                black++; 
            }
            if(state[row][column] == 1) {
                white++;
            }    
        }
    }
    scoreLayer.innerHTML = "Black: " + black + " | " +"White: " + white;
}

function verifyEndGame() {
    if(isPossibleToMove(1) == false && isPossibleToMove(2) == false || (black + white) <= 64) {
        if(black == white) {
            tieGameFlag = true;
        
        }
        else if(black > white) {
            blackWinFlag = true;
        }

        else if(black < white) {
            whiteWinFlag = true;        
        }
        gameOverFlag = true;
    }
    /*
    console.log("blackwin:" + blackWinFlag);
    console.log("whitewin:" + whiteWinFlag);
    console.log("tieFlag:" + tieGameFlag);
    console.log("gameOverFlag:" + gameOverFlag);
    */
}

function giveUp() {
    state = [
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]
    ];
    if(turn == 1) {
        white = 0;
        black = 64;
        blackWinFlag = true;
        gameOverFlag = true;
    }
    if(turn == 2) {
        white = 64;
        black = 0;
        whiteWinFlag = true;
        gameOverFlag = true;
    }

    createBoard();
    createDisk();
    scoreLayer.innerHTML = "Black: " + black + " | " +"White: " + white;
}

function turnDisk() {
    turnBox.innerHTMl = "";
    let turnDiskCell = document.createElement("div");
    turnDiskCell.style.position = "absolute";
    turnDiskCell.style.height = diskCellSize + "px";
    turnDiskCell.style.width = diskCellSize + "px";
    turnDiskCell.style.top = "20%";
    turnDiskCell.style.left = "20%";
    turnDiskCell.style.borderRadius = "50%"

    if(turn == 1) {
        turnDiskCell.style.backgroundColor = "white";
    }
    if(turn ==2) {
        turnDiskCell.style.backgroundColor = "black";
    }

    turnBox.appendChild(turnDiskCell);
}

function minimaxAlgorithmn(id, depth, state) {
    let stateCopy  
    if(depth == 0)  {

      }

}