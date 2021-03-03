const divBoard = document.querySelector('.board');
const neighborsPos = {
    up:[-1, 0], 
    down:[1, 0],
    left:[0, -1],
    right:[0, 1],
    leftUp:[-1, -1],
    rightUp:[-1, 1],
    leftDown:[1, -1],
    rightDown:[1, 1]
}
let cellOpened = 0;

// struktur data Queue (FIFO)
function Queue() {
    this.els = new Array();
    this.head = 0;
    this.size = 0;
}

// menambah data pada queue
Queue.prototype.enqueue = function(el) {
    this.els.push(el);
    this.size++;
}

// cek queue kosong
Queue.prototype.isEmpty = function() {
    return this.size == 0;
}

// mengambil dan menghapus data pada queue
// menggunakan prinsip FIFO
Queue.prototype.dequeue = function() {
    if(this.isEmpty()) return -1;
    const taken = this.els[this.head];
    this.size--;
    this.head++;
    return taken;
}

// membuat papan
const board = new Board(divBoard);

for(let j = 0; j < 10; j++) {
    for(let i = 0; i < 10; i++) {

        board.btnCells[j][i].onclick = function() {
            if(board.cells[j][i].nearBomb != 0) {
                cellOpened++;
                board.cells[j][i].opened = true;
                if(board.cells[j][i].isBomb) {
                    this.style.backgroundColor = "red"
                    board.freezeBoard();
                }
                else {
                    this.style.backgroundColor = "rgba(220, 220, 220, 0.895)"
                }
                this.style.color = "black";            
            }
            else {
    
                const frontier = new Queue();
                frontier.enqueue([j, i]);
                const explored = new Set();
                while(true) {
                    
                    if(frontier.isEmpty()) return;
                    const pos = frontier.dequeue();
                    const row = pos[0]; const col = pos[1];
                    const cell = board.cells[row][col];
                    cell.opened = true;
                    board.btnCells[row][col].style.backgroundColor = "rgba(230, 230, 230, 0.895)"
                    board.btnCells[row][col].style.color = "black";
                    const neighbors = zeroNeighbor(row, col);
                    for(let r = 0; r < neighbors.length; r++) {
                        const newCell = board.cells[neighbors[r][0]][neighbors[r][1]];
                        console.log(newCell.opened)
                        if(!newCell.opened) {
                            console.log(neighbors[r][0] + " " +  neighbors[r][1])
                            console.log(cellOpened);
                            cellOpened++;
                            frontier.enqueue([neighbors[r][0], neighbors[r][1]]);
                        }
                    }
    
                }
            }
            
        }   
    }
} 


function zeroNeighbor(i, j) {
    if(board.cells[i][j].nearBomb != 0) {
        return [];
    }

    const neighbors = [];
    let el = 0;
    for(const neighbor in neighborsPos) {
        const i_ = neighborsPos[neighbor][0];
        const j_ = neighborsPos[neighbor][1];
        if((i+i_ < 0 || i+i_ >= 10) || (j+j_ < 0 || j+j_ >= 10)) {
            continue;
        }

        // console.log(board.cells[i+i_][j+j_]);
        neighbors[el] = [(i+i_), (j+j_)];
        el++;
        }

        return neighbors;
    }


