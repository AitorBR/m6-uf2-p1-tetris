class Piece {
    constructor(j = 0, i = 4) { // ns si funciona en caso de que no, puedo reutilizar la funcion
        this.shape = random_figure();
        this.color = inColor(this.shape);
        this.position = {
            y: j,
            x: i
        };
        this.form = getForm(this.shape);
    }

    moveDown() { // faltan comprobantes pero por el momento esto
        if (this.position.y < grid.y) {
            this.position.y++;
            if (validatePosition()) {
                clean_piece_main(1)
                printMainPiece();
                increaseScore(1);
                return true;
            } else { // ya cuento que hace el ++
                place_piece();
            }
        }
        return false;
    }

    moveLeft() {
        this.position.x--;
        if (validatePosition()) {
            clean_piece_main(0, -1)
            printMainPiece();
            return true;
        } else {
            this.position.x++;
        }
        return false;
    }

    moveRight() {
        this.position.x++;
        if (validatePosition()) {
            clean_piece_main(0, 1)
            printMainPiece();
            return true;
        } else {
            this.position.x--;
        }
        return false;
    }

    rotatePiece() {
        if (this.shape != "O") {
            let a = this.form;
            this.rotateClockWise();
            if (validatePosition()) {
                this.form = a;
                clean_piece_main()
                this.rotateClockWise();
                printMainPiece();
            } else {
                this.form = a;
            }
        }
    }

    rotateClockWise() {
        let result = new Array(4);;
        for (let i = 0; i < 4; i++) result[i] = new Array(4).fill(0);
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                result[j][(2 - i).mod(4)] = this.form[i][j];
            }
        }
        this.form = result;
    }


}

const getColumn = (array, column) => array.map(row => row[column]);

function getForm(shape) {
    return shapes[shape];
}

function random_figure() { // te devulve una letra que sera la pieza generada
    let piecesArray = ['I', 'O', 'T', 'L', 'J', 'Z', 'S'];
    return (piecesArray[Math.floor(Math.random() * piecesArray.length)]);
}

function inColor(shape) {
    switch (shape) {
        case "I":
            return "red";
            break;
        case "J":
            return "brown";
            break;
        case "L":
            return "yellow";
            break;
        case "O":
            return "orange";
            break;
        case "S":
            return "purple";
            break;
        case "T":
            return "green";
            break;
        case "Z":
            return "blue";
            break;
    }
}

Number.prototype.mod = function(n) {
    return ((this % n) + n) % n;
};