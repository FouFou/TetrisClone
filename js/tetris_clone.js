function Game()
{
	this.board = new Board();
};

Game.prototype.init = function(){
	document.getElementById('canvas').getContext('2d').scale(32, 32);
	setInterval("game.board.draw()", 30);
}


