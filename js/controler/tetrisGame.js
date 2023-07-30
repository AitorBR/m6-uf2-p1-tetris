const grid = {
    x: 10,
    y: 20
};

var gameData;
var pieceMain;
var pieceNext;

function inicia() {
    crea_game_view();
    crea_box();
    create_game();
    loadText();
    writeBox();
    loadScoreboard();
}

function startGame() {
    generateMainPieces();
    printPieces();
    startGameLogic(); // unicamente se usa para que la primera pieza no baje del tiron
}

function startGameLogic() {
    setTimeout(play, gameData.timer);
}


function play() {
    if (gameData.playing) {
        nextMove();
        setTimeout(play, gameData.timer);
    }
}

function nextMove() {
    pieceMain.position.y++;
    if (validatePosition()) {
        clean_piece_main(1);
        printMainPiece();
    } else {
        place_piece();
    }
}

function validatePosition() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (pieceMain.form[i][j] == 1) {
                if (i + pieceMain.position.y > grid.y - 1 || pieceMain.position.x + j > grid.x - 1 || pieceMain.position.x + j < 0) { // valida que no salga del area
                    return false
                } else if (gameData.cuadriculaNoMainPiece[i + pieceMain.position.y][pieceMain.position.x + j] == 1) { // valida que no haya una pieza ya en el lugar
                    return false
                }
            }
        }
    }
    return true;
}

function place_piece() {
    actuCuadricula(1, -1);
    updatValues();
    for (var i = 0; i < grid.y; i++) {
        checkLine(i);
    }
    copyArrayAtoB(gameData.cuadricula, gameData.cuadriculaNoMainPiece)
    clean_piece_next();
    pieceMain = pieceNext;
    pieceMain.position.x = 4;
    pieceNext = new Piece(0, 0);
    if (validatePosition()) {
        printPieces();
    } else {
        gameData.playing = false;
        save_score();
        resultAlert();
        hidePause();
        displayNewGame();
    }
}

function updatValues() {
    increaseScore(10);
    countLevel();
}

function checkLine(i) {
    for (var j = 0; j < grid.x; j++) {
        if (gameData.cuadricula[i][j] == 0) {
            return false;
        }
    }
    cleanLine(i);
}

function actuCuadricula(value, value2) { // al final solo es llamado desde un sitio, lo pense en su momento para usarlo en varios
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (pieceMain.form[i][j] == 1) {
                gameData.cuadricula[i + pieceMain.position.y + value2][pieceMain.position.x + j] = value;
            }
        }
    }
}

function copyArrayAtoB(a, b) {
    for (var i = 0; i < grid.y; i++) {
        for (var j = 0; j < grid.x; j++) {
            b[i][j] = a[i][j];
        }
    }
}

function create_game() {
    gameData = new Game(game_cuadricula, game_cuadriculanext);
}

function generateMainPieces() {
    pieceMain = new Piece()
    pieceNext = new Piece(0, 0);
}

function printPieces() {
    printMainPiece();
    printNextPiece();
}

// control teclado

function writeBox() {
    addEventListener('keydown', (event) => {
        if (gameData.playing) {
            pressed_key(`${event.key}`.toUpperCase());
        }
    });
}

function pressed_key(key) {
    switch (key) {
        case "A":
            pieceMain.moveLeft();
            break;
        case "ARROWLEFT":
            pieceMain.moveLeft();
            break;
        case "D":
            pieceMain.moveRight();
            break;
        case "ARROWRIGHT":
            pieceMain.moveRight();
            break;
        case "W":
            pieceMain.rotatePiece();
            break;
        case "ARROWUP":
            pieceMain.rotatePiece();
            break;
        case "S":
            pieceMain.moveDown();
            break;
        case "ARROWDOWN":
            pieceMain.moveDown();
            break;
    }
}


window.onload = inicia;