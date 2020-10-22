let boardLayer;
let diskLayer;
let gap = 5;
let cellSize = 50;
let diskCellSize = 50;
let turn = 1;
let state;

window.onload = function() {
    boardLayer = document.getElementById("boardLayer");
    boardLayer.style.height = (cellSize * 8) + (gap * 9) + "px";
    boardLayer.style.width = (cellSize * 8) + (gap * 9) + "px";
    diskLayer = document.getElementById("diskLayer");
    newGame();
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
    createBoard();
    createDisk();
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
                play(row,column);
            });
            boardLayer.appendChild(tableCell);            
        }
    }
}

function createDisk() {
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


/**
 * Recreate the disk Layer after onclick.
 * @param {*} row 
 * @param {*} column 
 */
function play(row, column) {
    if(turn == 1 ) {
        state[row][column] = 1;
        turn = 2;
    }
    else {
        state[row][column] = 2;
        turn = 1;
    }
    createDisk();
}