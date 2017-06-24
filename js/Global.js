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
var capImage = new Image();
capImage.src = "img/cap.png";
var bgImage = new Image();
bgImage.src = "img/background.jpg";
var cap;
cap = new Object();
cap.x = 0;
cap.y = canvH - brick_side * 2;
cap.speed = 256;

function paint_brick(x, y) {
	context.rect(x, y, brick_side, brick_side);
	context.fillStyle = "black";
	context.fill();
	context.lineWidth = 1;
	context.strokeStyle = 'darkred';
	context.stroke();
}
var w = window;
var then = Date.now();
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
var keysDown = {};
addEventListener("keydown", function(e) {
	keysDown[e.keyCode] = true;
}, false);
addEventListener("keyup", function(e) {
	delete keysDown[e.keyCode];
}, false);
var update = function(modifier) {
	if(37 in keysDown) {
		cap.x -= cap.speed * modifier;
	}
	if(39 in keysDown) {
		cap.x += cap.speed * modifier;
	}
};
var main = function() {
	context.clearRect(0, 0, canvW, canvH);
//	context.drawImage(bgImage, 0, 0);
//	for(var i = 0; i < 22; i++) {
//		paint_brick(i * brick_side, canvH - brick_side);
//	}
	context.drawImage(capImage, cap.x, cap.y);
	requestAnimationFrame(main);
	var now = Date.now();
	var delta = now - then;
	update(delta / 1000);
	then = now;
};
main();