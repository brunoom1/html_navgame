function Nav(w, h, context){

	this.context = context;

	this.navStyle = "black";

	this.x = 100;
	this.y = 100;
	this.w = w;
	this.h = h;
	this.ang = 0;

	// auxiliares para mover e rotacionar
	this.new_x = 0;
	this.new_y = 0
	this.new_ang = 0;

	this.vel = 1;
	this.acl = 0;
	this.vel_m= 5;

	this.MOVING = 1;
	this.MOVING_INVERSE = 3;
	this.STOPED = 2;

	this.status = this.STOPED;
	this.status_ang = this.STOPED;
}



Nav.prototype.draw = function(ctx){

	ctx.save();
	ctx.translate(this.x, this.y);
	ctx.rotate(Math.PI / 180 * this.ang);
	ctx.fillStyle=this.navStyle;
	ctx.beginPath();

	var x = -this.w/2;
	var y = -this.h/2;
	var w = this.w/2;
	var h = this.h/2;

	ctx.lineTo(x, y);
	ctx.lineTo(w, h/2);
	ctx.lineTo(x, h)
	ctx.lineTo(x, y);
	ctx.closePath();
	ctx.fill();
	ctx.restore();

}

Nav.prototype.update = function(){

	if(this.status == this.MOVING){
		this.acl += (this.acl < this.vel_m)? .1 : 0;		
	}
	else{
		this.acl -= (this.acl > 0)? .1 : 0;
	}

	if(this.status_ang == this.MOVING){
		this.ang += this.vel * this.acl;
		if (this.ang >= 360) this.ang = 0;
	}else if(this.status_ang == this.MOVING_INVERSE){
		this.ang -= this.vel * this.acl;
		if (this.ang <= 0) this.ang = 360;
	}


	this.x += Math.cos(Math.PI / 180 * this.ang) * this.vel * Math.abs(this.acl);
	this.y += Math.sin(Math.PI / 180 * this.ang) * this.vel * Math.abs(this.acl);

	if(this.new_x){
		deltax = parseInt(this.new_x - this.x);
		if(deltax != 0){
			this.x += (deltax > 0 ? 1 : -1) * this.vel * this.acl;
		}
		else{
			this.new_x = 0;
		}
	}

	if(this.new_y){
		deltay = parseInt(this.new_y - this.y);
		if(deltay != 0){
			this.y += (deltay > 0 ? 1 : -1) * this.vel * this.acl;
		}
		else{
			this.new_y = 0;
		}
	}

	if(this.new_ang){
		delta_ang = this.new_ang - this.ang;

		if(delta_ang != 0){
			this.ang += (delta_ang > 0 ? 1 : -1) * this.vel * this.acl;
		}
		else{
			this.new_ang = 0;
		}
	}

}



