;(function(global){
"use strict";

/*
*******************Paddle
*/
var Paddle = function(){
	return this;
};

Paddle.prototype.init = function(game){
	this.game = game;
	this.x=0;
	this.y = this.game.cvRect.H/2;
	this.w = 32;
	this.h=64;

	this.aiv=6; //the maximum velocity with which the ai paddle can move
	this.aiOffset = 0; //how far off center the paddle will be when the ball reaches the end
	
	return this;
};


Paddle.prototype.draw = function(ctx2d){
	ctx2d.fillStyle="white";
	ctx2d.fillRect(this.x - this.w/2, this.y - this.h/2, this.w, this.h);
};

Paddle.prototype.floorAndCeiling = function(){
	if(this.y < this.h/2)
		this.y = this.h/2;
	if(this.y > this.game.cvRect.H-this.h/2) 
		this.y = this.game.cvRect.H-this.h/2;
};

Paddle.prototype.update = function(){
	console.log('implemente isto');
};

Paddle.prototype.aiChangeOffset = function(){
	this.aiOffset = (Math.random()-0.5)*0.9;
};

/*
*******************Player Paddle
*/
var PlayerPaddle = function(){
};
PlayerPaddle.prototype = new Paddle();

PlayerPaddle.prototype.update = function(){
	this.y = this.game.mouse.y;
	this.floorAndCeiling();
};


/*
*******************AI Paddle
*/
var AiPaddle = function(){
};
AiPaddle.prototype = new Paddle();

AiPaddle.prototype.update = function(){
	if(this.game.ball.speedy.y < 1){
		if(this.game.ball.y + this.h*this.aiOffset > this.y-this.aiv){
			if(this.y+this.aiv < this.game.ball.y + this.h*this.aiOffset){
				this.y += this.aiv;
			}else{
				this.y = this.game.ball.y + this.h*this.aiOffset;
			}
		}
		if(this.game.ball.y + this.h*this.aiOffset < this.y + this.aiv){
			if(this.y-this.aiv>this.game.ball.y + this.h*this.aiOffset){
				this.y -= this.aiv;
			}else{
				this.y = this.game.ball.y + this.h*this.aiOffset;
			}
		}
		this.floorAndCeiling();
	}
};

global.PlayerPaddle = PlayerPaddle;
global.AiPaddle = AiPaddle;

}(window));
