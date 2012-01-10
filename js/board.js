function Board(){
	this.canvas = document.getElementById("canvas");
	this.ctx = this.canvas.getContext("2d");
	this.width = 10;
	this.height = 18;
	this.cellwidth = 32;
	this.running = true;
	this.cycle = 0;
	this.completedRows = 0;
	this.currentTile = [4,0];
	this.tile =	[];
	this.map = [
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[1,1,1,1,1,1,1,1,1,1]	
	];
	this.tileone =	 	[[1,0],
						[1,0],
						[1,1]];
	this.tiletwo = 		[[0,1],
						[0,1],
						[1,1]];
	this.tilethree = 	[[1,0],
						[1,1],
						[1,0]];
	this.tilefour = 	[[1,1],
						[1,1]];		
	this.tilefive = 	[[1,1,1,1]];
	this.tilesix =		[[1,1,0],
						[0,1,1]];
	this.tileseven =		[[0,1,1],
						[1,1,0]];				
	this.setTile();
						
}
Board.prototype.draw = function(){
	if(this.running)
	{
		this.clear();
		this.generateGrid();
		this.drawActive();
		this.cycle ++;
		if (this.cycle == 10){
			this.cycle = 0;
			this.moveActiveDown();	
		}
	}
}
Board.prototype.clear = function(){
	this.ctx.clearRect(0,0, this.width, this.height);
}
Board.prototype.generateGrid = function(){
    for (var y = 0; y < 18; y++){
	for (var x = 0; x < 10; x++){
	    tile = this.map[y][x];
	    switch(tile){		
	    case 1: this.ctx.fillStyle = 'rgb(139, 137, 137)'; break;
	    case 2: this.ctx.fillStyle = 'rgb(49, 79, 79)'; break;
	    case 3: this.ctx.fillStyle = 'rgb(255, 105, 180)'; break;
	    default: this.ctx.fillStyle = 'rgb(255, 250, 250)'; break;
	    }		
	    this.ctx.fillRect(x,y,1,1);
	}
    }
}
Board.prototype.moveActiveDown = function(){
	if(this.checkCollision(0,1) == false){
		this.currentTile[1] +=1;
	}
	else{
		if(this.currentTile[1] == 0)
		{
			alert("Game Over");
			this.running = false;
		}
		else{
			for(var i=0; i < this.tile[0].length; i++){
				for(var j=this.tile.length-1; j>=0; j--){
					if(this.tile[j][i] == 1){
						this.map[this.currentTile[1] + j ][this.currentTile[0] + i] = 2;
					}
				}
			}
			this.setTile();		
			this.currentTile = [4,-1];
			this.checkForRow();
		}
	}
	
}

Board.prototype.checkCollision = function(x,y){	
	for(var i=0; i < this.tile[0].length; i++){
		for(var j=this.tile.length-1; j>=0; j--){
			if(this.tile[j][i] == 1  && this.map[this.currentTile[1]+j + y][this.currentTile[0]+i +x] != 0){
				return true;
			}
		}
	}
	return false;
}

Board.prototype.checkForRow = function(){
	for (var y = 0; y < 17; y++){
		var isRow = true;
		var x = 0;
		while (x < 10){
			if(this.map[y][x] == 0){
				isRow = false;	
				x = 10;
			}
			else{
				x++;
			}
		}
		if(isRow == true){
			for (var x = 0; x < 10; x++){
				this.map[y][x] = 3;
			}
			this.completedRows += 1;		
		}		
	}
	while(this.rowsCleared() == false){
		for(var y = 17; y > -1; y--){
			if(this.map[y][0] != 3){
				//Neeeeeext
			}
			else{
				for(var i = y; i > 0; i--){
					for (var x = 0; x < 10; x++){
						this.map[i][x] = this.map[i-1][x];
					}
				}
				for (var x = 0; x < 10; x++){
					this.map[i][x] = 0;
				}
			}	
		}
	}
}

Board.prototype.rowsCleared = function(){
	for(var y = 17; y > -1; y--){
		if(this.map[y][0] == 3){
			return false;
		}
		else{
		}	
	}
	return true;	
}


Board.prototype.drawActive = function(){

	for(var i=0; i < this.tile[0].length; i++){
		for(var j=this.tile.length-1; j>=0; j--){
			if(this.tile[j][i] == 1){
			    this.ctx.fillStyle = 'rgb(218, 112, 214)';
			    this.ctx.fillRect(this.currentTile[0] + i, this.currentTile[1] + j, 1, 1);
			}
		}
	}
}

Board.prototype.moveRight = function(){
	
	if(this.checkCollision(1,0) == false){
		this.currentTile[0] +=1;
	}
}
Board.prototype.moveLeft = function(){	

	if(this.checkCollision(-1,0) == false){
		this.currentTile[0] -=1;
	}
}

Board.prototype.rotate = function(){

var newTile = new Array(this.tile[0].length-1);
for (var i = 0; i < this.tile[0].length; i++) {	
	newTile[i]=new Array(this.tile.length-1);
}
	for(var i=0; i < this.tile[0].length; i++){
		for(var j=this.tile.length-1; j>=0; j--){
			newTile[i][j] = this.tile[this.tile.length-j-1][i];
		}
	}
	var old = this.tile 
	this.tile = newTile;
	if(this.checkCollision(0,0) == true){
		this.tile = old;
	}
}

Board.prototype.setTile = function(){
	switch(Math.floor(Math.random()*7)){
		case 0:
			this.tile = this.tileone;
			break;
		case 1:
			this.tile = this.tiletwo;
			break;
		case 2:
			this.tile = this.tilethree;
			break;
		case 3:
			this.tile = this.tilefour;
			break;
		case 4:
			this.tile = this.tilefive;
			break;
		case 5:
			this.tile = this.tilesix;
			break;
		case 6:
			this.tile = this.tileseven;
			break;
	}
}