var game_cuadricula = [];
var game_cuadriculanext = [];

class Game {
    constructor(game_cuadricula, game_cuadriculanext, scoreBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], score = 0, timer = 1000, count_numPieza = 0, playing = true, level = 1) { // ns si funciona en caso de que no, puedo reutilizar la funcion
        this.cuadricula = game_cuadricula;
        this.cuadriculaNoMainPiece = game_cuadriculanext;
        this.scoreBoard = scoreBoard;
        this.score = score;
        this.timer = timer;
        this.count_numPieza = count_numPieza;
        this.playing = playing;
        this.level = level;
    }
}