//整体布局
window.onload = function() {
	//设置画布大小
	document.body.scroll = "no";
}
var canv = document.getElementById('canv');
var canvW = screen.width * 0.8;
var canvH = screen.height * 0.8;
canv.width = canvW;
canv.height = canvH;
canv.style.marginLeft = screen.width * 0.1;
canv.style.marginTop = screen.height * 0.025;
//砖长宽
var brick_side = canvW / 20;
var context = canv.getContext('2d');
var capReady = false;
var capImage = new Image();
capImage.src = "img/cap.png";
var cap;
cap = new Object();
cap.x = 0;
cap.y = canvH - brick_side * 2;

function paint_brick(x, y) {
	context.rect(x, y, brick_side, brick_side);
	context.fillStyle = "black";
	context.fill();
	context.lineWidth = 1;
	context.strokeStyle = 'darkred';
	context.stroke();
}
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
var main = function() {
	context.clearRect(0, 0, canvW, canvH);
	context.drawImage(capImage, cap.x, cap.y);
	for(var i = 0; i < 22; i++) {
		paint_brick(i * brick_side, canvH - brick_side);
	}
	requestAnimationFrame(main);
};
main();

var capadd = function() {
	cap.x += 1;
	setTimeout("capadd()", 5);
};
document.onkeydown = function(event) {
	var e = event || window.event || arguments.callee.caller.arguments[0];
	if(e && e.keyCode == 37) {
		cap.x-=5;
	}
	if(e && e.keyCode == 39) {
		cap.x+=5;
	}
};