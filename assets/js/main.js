function App(){
	this.init();  
}

App.prototype.init = function(){
	this.canvas = document.getElementById("main-canvas");
    this.ctx = this.canvas.getContext("2d");

    __app = this;
    document.addEventListener("keydown", function(e){
    	if(e.keyCode == 38){
    		__app.nav.status = __app.nav.MOVING;
    	}
    	else if(e.keyCode == 39){
    		__app.nav.status_ang = __app.nav.MOVING;
    	}
    	else if(e.keyCode == 37){
    		__app.nav.status_ang = __app.nav.MOVING_INVERSE;
    	}

    });

    document.addEventListener("keyup", function(e){
    	if(e.keyCode == 38){
    		__app.nav.status = __app.nav.STOPING
    	}
    	else if(e.keyCode == 39){
    		__app.nav.status_ang = __app.nav.STOPING
    	}
    	else if(e.keyCode == 37){
    		__app.nav.status_ang = __app.nav.STOPING
    	}
    })



    this.initialize();    
}

App.prototype.initialize = function(){
	this.nav = new Nav(30, 20, this);	
}

App.prototype.update = function(){
	this.nav.update();
}

App.prototype.draw = function(){
	this.nav.draw(this.ctx);
}

App.prototype.clear = function(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}



App.prototype.start = function(){
	
	var frames = 0;
    var start = 0;

    __app = this;

    function anim(t){

		__app.tick = t;    	
		if(!start) start = t;

		if(t - start >= 1000){

		frames = 0;
		start = t;
		}else{
		frames ++;
		}

		// altera
		__app.update();

		//limpa
		__app.clear();

		// pinta
		__app.draw();

		window.requestAnimationFrame(anim);
    }
    window.requestAnimationFrame(anim);
}


document.onreadystatechange = function(){
  if(document.readyState == "complete"){
    
    window.app = new App();
   	app.start(); 
    
  }
}

