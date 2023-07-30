// html element
var text_score;
var text_scoreHigh;
var text_level;
var btn_newGame;
var btn_pause;

function loadText() {
    text_score = document.getElementById("score");
    text_scoreHigh = document.getElementById("highScore");
    text_level = document.getElementById("level");
    btn_newGame = document.getElementById("newGame");
    btn_newGame.onclick = clickNewGame;
    btn_pause = document.getElementById("pause");
    btn_pause.onclick = clickPause;
}

function loadScoreboard() { // creo que esta mal porque no devuelve un array como tal, creo k era un string con comas !!! comprobar
    let a = localStorage.getItem("scoreBoard");
    if (a != null) {
        gameData.scoreBoard = a.split(",");
        resultAlert();
        updateHighScore();
    }
}

function reduceTime() {
    gameData.timer = gameData.timer * 0.9;
}

function save_score() { // guarda el score en localStorage
    for (var i = 0; i < 10; i++) { // comprueba si has superado algun valor
        if (gameData.scoreBoard[i] < gameData.score) {
            calculate_scoreBoard(i);
            localStorage.setItem("scoreBoard", gameData.scoreBoard); // guarda el array
            return true;
        }
    }
}
// aumenta el score segun el valor
function increaseScore(sum) {
    gameData.score = gameData.score + sum;
    updateScore();
}

function countLevel() { // comprueba que el contador de piezas no pase de 10 y actualiza el lv
    gameData.count_numPieza++;
    if (gameData.count_numPieza >= 10) { // no deberia nunca de pasar de 10
        gameData.level++;
        gameData.count_numPieza = 0;
        reduceTime();
        updateLevel();
    }

}

function calculate_scoreBoard(i) { // posiciona en orden los valores en la tabla
    for (var j = 10; j > i; j--) {
        gameData.scoreBoard[j] = gameData.scoreBoard[j - 1];
    }
    gameData.scoreBoard[i] = gameData.score;
}

function clickNewGame() {
    setTimeout(logicClickNewGame, gameData.timer); // esto es necesario para que muera el bucle anterior, en caso de que el bucle anterior no muera, la pieza se mueve de 2 en 2 porque corren a la vez
}

function logicClickNewGame() {
    clean_screen();
    let placeHolderScoreboard = gameData.scoreBoard;
    create_game();
    gameData.scoreBoard = placeHolderScoreboard;
    updateHighScore();
    hideNewGame();
    displayPause();
    startGame();
}

function clickPause() {
    gameData.playing = !gameData.playing;
    displayNewGame();
    if (gameData.playing) {
        setTimeout(play, gameData.timer);
        hideNewGame();
    }
}