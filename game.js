/**
* PONG - HTML5 Game
* @author lvendrame@gmail.com (Luís Fernando Vendrame)
* based on article "How to Get Started with HTML5" by "Maksim Mikityanskiy" 
* http://www.gamedev.net/page/resources/_/technical/game-programming/how-to-get-started-with-html5-r3352
*/
;(function(){
"use strict";
var Game = function(window){

	var canvas = window.document.getElementById('game'),
	    rect = canvas.getBoundingClientRect(),
	    _self = this;

	this.ctx2d = canvas.getContext('2d');

	canvas.style.width = '800px';
	canvas.style.height = '600px';
	
	this.mouse = {x:0, y:0};
	this.cvRect = {
		x:rect.left,
		y:rect.top,
		W:rect.right - rect.left,
		H:rect.bottom - rect.top
	    };
	this.score = {player:0, ai:0};

	this.aiPaddle = new AiPaddle().init(this);
	this.playerPaddle = new PlayerPaddle().init(this);
	this.playerPaddle.x = this.cvRect.W;
	this.ball = new Ball(this, this.playerPaddle, this.aiPaddle);

	canvas.addEventListener("mousemove", function(e){
		Game.prototype.onMouseMove.call(_self, e);
	}, false);

	window.setInterval(function(){
		Game.prototype.run.call(_self);
	}, 20);

};

Game.prototype.onMouseMove = function(e){
	this.mouse.x = e.pageX - this.cvRect.x;
	this.mouse.y = e.pageY - this.cvRect.y;
};

Game.prototype.drawScores = function(){
	this.ctx2d.fillStyle = "white";
	this.ctx2d.font = "regular 400 12px/2 Courrier, sans-serif";
	this.ctx2d.fillText(this.score.ai, 30,30);
	this.ctx2d.fillText(this.score.player, this.cvRect.W-50,30);
};
	
Game.prototype.run = function(){
	this.aiPaddle.update();
	this.playerPaddle.update();
	this.ball.update();

	this.ctx2d.fillStyle="black";
	this.ctx2d.clearRect(0,0, this.cvRect.W, this.cvRect.H);
	this.ctx2d.fillRect(0,0, this.cvRect.W, this.cvRect.H);

	this.ball.draw(this.ctx2d);
	this.aiPaddle.draw(this.ctx2d);
	this.playerPaddle.draw(this.ctx2d);

	this.drawScores();
};

new Game(window);
}(window));
