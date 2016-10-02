
function BackgroundControll(context){

	this.context = context;
	divCanvas = document.getElementById("divCanvas");

	this.x = 0;
	this.y = 0;
}

BackgroundControll.prototype.update = function(){

	this.nav = this.context.nav;


	this.x -= Math.cos(Math.PI / 180 * this.nav.ang) * this.nav.vel * Math.abs(this.nav.acl * 2 + 1);
	this.y -= Math.sin(Math.PI / 180 * this.nav.ang) * this.nav.vel * Math.abs(this.nav.acl * 2 + 1);


	divCanvas.style.backgroundPosition = this.x + "px " + this.y + "px";


}