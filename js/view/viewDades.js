function resultAlert() { // mensaje con los scores de partidas anteriores
    alert("Tu Score:" + gameData.score + "\n" +
        "Primer puesto: " + gameData.scoreBoard[0] + "\n" +
        "Segundo puesto: " + gameData.scoreBoard[1] + "\n" +
        "Tercer puesto: " + gameData.scoreBoard[2] + "\n" +
        "Cuarto puesto: " + gameData.scoreBoard[3] + "\n" +
        "Quinto puesto: " + gameData.scoreBoard[4] + "\n" +
        "Sexto puesto: " + gameData.scoreBoard[5] + "\n" +
        "Septimo puesto: " + gameData.scoreBoard[6] + "\n" +
        "Octavo puesto: " + gameData.scoreBoard[7] + "\n" +
        "Noveno puesto: " + gameData.scoreBoard[8] + "\n" +
        "Decimo puesto: " + gameData.scoreBoard[9] + "\n")
}

// actualiza el html ////////
function updateScore() {
    text_score.innerHTML = "Score: " + gameData.score;
}

function updateHighScore() {
    text_scoreHigh.innerHTML = "High Score: " + gameData.scoreBoard[0];
}

function updateLevel() {
    text_level.innerHTML = "Level " + gameData.level;
}

function hideNewGame() {
    btn_newGame.style.display = "none";
}

function displayNewGame() {
    btn_newGame.style.display = ""
}

function displayPause() {
    btn_pause.style.display = ""
}

function hidePause() {
    btn_pause.style.display = "none";
}