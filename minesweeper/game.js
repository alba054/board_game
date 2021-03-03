
class Cell {
    constructor() {
        // sudah ditekan atau belum
        this.opened = false;
        // terdapat 50% bomb pada papan
        this.isBomb = (Math.random() < 0.3) ? true:false;
        // banyaknya bomb pada cell terdekat (-1 jika cell merupakan bomb)
        this.nearBomb = (this.isBomb) ? -1:0;
    }
}

class Board {
    
    constructor(board) {
        this.divRow = [];
        this.btnCells = new Array(10);
        this.cells = new Array(10)
        this.notBomb = 0;
        // inisialisasi array 2d
        this.create2DArray();
        // membuat 10 baris div pada papan
        // papan berukuran 10 X 10
        this.createRow();
        // membuat tombol untuk merepresentasikan papan
        // membuat objek cell
        this.createButtons();
        // menaruh semua tombol pada div row
        this.appendButtons();
        // menghitung banyak bomb disekitar cell
        this.countNearBomb();
        // menghitung jumlah cell bukan bomb
        this.countNotBomb();
        // memberikan label yang sesuai untuk setiap cell(tombol) pada papan
        this.setInnerCell();
        // membuat papan pada awal game
        this.createBoard(board);
    }

    freezeBoard() {
        for(let i = 0; i < 10; i++) {
            for(let j = 0; j < 10; j++) {
                this.btnCells[i][j].disabled = true;
            }
        }
    }

    countNotBomb() {
        for(let i = 0; i < 10; i++) {
            for(let j = 0; j < 10; j++) {
                this.notBomb += this.cells[i][j].isBomb ? 0:1;
            }
        }
    }

    countNearBomb() {
        // tetangga dari sebuah cell
        // atas, bawah, kiri, kanan, kiri-atas, kanan-atas, kiri-bawah, kanan-bawah
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

        // let counter = 0;
        for(let i = 0; i < 10; i++) {
            for(let j = 0; j < 10; j++) {
                // if(counter > 0) break;
                if(this.cells[i][j].nearBomb == -1) continue;
                for(const neighbor in neighborsPos) {
                    const i_ = neighborsPos[neighbor][0];
                    const j_ = neighborsPos[neighbor][1];
                    try {
                        this.cells[i][j].nearBomb += (this.cells[i+i_][j+j_].nearBomb == -1) ? 1:0;
                        // console.log(this.cells[i+i_][j+j_].nearBomb)
                    }
                    catch(err) {
                        continue;
                    }
                }
                // counter++;
            }
        }
    }
    
    createBoard(body) {
        for(let i = 0; i < 10; i++) {
            body.appendChild(this.divRow[i]);
        }
    }

    create2DArray() {
        for(let i = 0; i < 10; i++) {
            this.btnCells[i] = new Array(10);
            this.cells[i] = new Array(10);
        }
    }

    createRow() {
        for(let i = 0; i < 10; i++) {
            this.divRow[i] = document.createElement('div');
            this.divRow[i].className = 'row';
        }
    }

    createButtons() {
        for(let i = 0; i < 10; i++) {
            for(let j = 0; j < 10; j++) {
                this.cells[i][j] = new Cell();
                this.btnCells[i][j] = document.createElement('button');
            }
        }
    }

    setInnerCell() {
        for(let i = 0; i < 10; i++) {
            for(let j = 0; j < 10; j++) {
                this.btnCells[i][j].style.width = '30px';
                this.btnCells[i][j].style.height = '30px';
                this.btnCells[i][j].style.color = 'white';
                this.btnCells[i][j].style.backgroundColor = 'white';

                // cell merupakan bomb ditandai oleh ※
                if(this.cells[i][j].isBomb) {
                    this.btnCells[i][j].innerHTML = "※";
                }
                // cell bukan bomb diberikan angka sesuai dengan berapa banyak bomb di dekatnya
                else {
                    this.btnCells[i][j].innerHTML = this.cells[i][j].nearBomb;
                }
            }
        }
    }

    appendButtons() {
        for(let i = 0; i < 10; i++) {
            for(let j = 0; j < 10; j++) {
                this.divRow[i].appendChild(this.btnCells[i][j]);
            }
        }
    }
    
}