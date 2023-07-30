function crea_game_view() {
    let divGraella = document.getElementById("game");
    let table = document.createElement("table");
    divGraella.appendChild(table);
    // genera tabla
    for (var i = 0; i < grid.y; i++) {
        let linea = document.createElement("tr");
        game_cuadricula[i] = [];
        game_cuadriculanext[i] = [];
        for (var j = 0; j < grid.x; j++) {
            let cel = document.createElement("td");
            game_cuadricula[i][j] = 0;
            game_cuadriculanext[i][j] = 0;
            cel.id = i + "-" + j;
            cel.className = "";
            linea.appendChild(cel);
        }
        table.appendChild(linea);
    }
}

function crea_box() {
    let divGraella = document.getElementById("next_piece");
    let table = document.createElement("table");
    divGraella.appendChild(table);
    // genera tabla
    for (var i = 0; i < 4; i++) {
        let linea = document.createElement("tr");
        for (var j = 0; j < 4; j++) {
            let cel = document.createElement("td");
            cel.id = i + "_" + j;
            cel.className = "";
            linea.appendChild(cel);
        }
        table.appendChild(linea);
    }
}

function printNextPiece() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (pieceNext.form[i][j] == 1) {
                document.getElementById(i + "_" + j).className = pieceNext.color;
            }
        }
    }
}

function printMainPiece() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (pieceMain.form[i][j] == 1) {
                document.getElementById((i + pieceMain.position.y) + "-" + (pieceMain.position.x + j)).className = pieceMain.color;
                gameData.cuadricula[i + pieceMain.position.y][pieceMain.position.x + j] = 1;
            }
        }
    }
}

function clean_screen() {
    if (pieceNext != null && pieceMain != null) {
        for (var i = 0; i < grid.y; i++) {
            for (var j = 0; j < grid.x; j++) {
                document.getElementById(i + "-" + j).className = "";
                gameData.cuadricula[i][j] = 0;
                gameData.cuadriculaNoMainPiece[i][j] = 0;
            }
        }
        clean_piece_next();
    }
}

function clean_piece_next() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (pieceNext.form[i][j] == 1) {
                document.getElementById((i) + "_" + (j)).className = "";
            }
        }
    }
}

function cleanLine(i) {
    for (o = i; o > 0; o--) {
        for (var j = 0; j < grid.x; j++) {
            document.getElementById(o + "-" + j).className = document.getElementById(o - 1 + "-" + j).className;
            gameData.cuadricula[o][j] = gameData.cuadricula[o - 1][j];
        }
    }
}

function clean_piece_main(lower = 0, lower2 = 0) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (pieceMain.form[i][j] == 1) {
                document.getElementById((i + pieceMain.position.y - lower) + "-" + (pieceMain.position.x + j - lower2)).className = "";
                gameData.cuadricula[i + pieceMain.position.y - lower][pieceMain.position.x + j - lower2] = 0;
            }
        }
    }
}