;(function(global){
"use strict";

var Ball = function(game, player1, player2){	
	this.game = game;

	this.radius = 8;
	this.x = this.game.cvRect.W/2;
	this.y = this.game.cvRect.H/2;
	this.speedy = {x:5,y:0};
	this.players = [];
	this.players.push(player1);
	this.players.push(player2);

	return this;
};

Ball.prototype.draw = function(ctx2d){
	ctx2d.fillStyle = 'white';
	
	ctx2d.beginPath();
	ctx2d.arc(this.x, this.y, this.radius, 0, Math.PI*2);
	ctx2d.closePath();
	
	ctx2d.fill();
};

Ball.prototype.update = function(){
	this.x += this.speedy.x;
	this.y += this.speedy.y;

	//check if the ball has traveled
	if(this.x > this.players[0].x - this.players[0].w/2 - this.radius){ 
		
		//far enough to the right to possibly interact with the right paddle.
		if(this.y >= this.players[0].y - this.players[0].h/2 && this.y <= this.players[0].y + this.players[0].h/2){

			//check if it actually hit the paddle
        		this.speedy.y = (this.players[0].y-this.y)*-0.4; //change the y velocity depending on which part of the paddle the ball hit.
			this.x = this.players[0].x - this.players[0].w/2 - this.radius; //moves the ball out of the paddle
			this.speedy.x *= -1; //make the ball bounce off
	        }else{ //if the player misses the ball, incriment the ai score and reset the ball.
			this.game.score.ai++;
			this.speedy.y=0;
            		this.x = this.game.cvRect.W/2;
            		this.y = this.game.cvRect.H/2;
        	}
        	this.players[1].aiChangeOffset();//AI thing, will make sense later.
	}
	if(this.x < this.players[1].x + this.players[1].w/2 + this.radius){//same thing
		if(this.y >= this.players[1].y - this.players[1].h/2 && this.y <= this.players[1].y + this.players[1].h/2){
			this.speedy.y = (this.players[1].y-this.y)*-0.2;
			this.x = this.players[1].x + this.players[1].w/2 + this.radius;
			this.speedy.x *= -1;
        	}else{
			this.game.score.player++;
			this.speedy.y=0;
			this.x = this.game.cvRect.W/2;
			this.y = this.game.cvRect.H/2;
        	}
    	}
    
	if(this.y<this.radius){
		this.speedy.y*=-1; this.y=this.radius;
	} else if(this.y>this.game.cvRect.H-this.radius){
		this.speedy.y*=-1; this.y=this.game.cvRect.H-this.radius;
	}
};

global.Ball = Ball;

}(window));
