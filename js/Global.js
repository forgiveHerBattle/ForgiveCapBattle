//整体布局
window.onload = function() {
	//设置画布大小
	document.body.scroll = "no";
}
var canv = document.getElementById('canv');
var canv_bg = document.getElementById('canv_bg');
var canvW = screen.width * 0.8;
var canvH = screen.height * 0.8;
var gameW = canvW * 4;
var gameH = canvH * 4;
var nowW = canvW / 2;
var nowH = canvH / 2;
canv.width = canvW;
canv.height = canvH;
canv_bg.width = canvW;
canv_bg.height = canvH;
canv.style.marginLeft = screen.width * 0.1;
canv.style.marginTop = screen.height * 0.025;
canv_bg.style.marginLeft = screen.width * 0.1;
canv_bg.style.marginTop = screen.height * 0.025;
var conv_p = canv.getContext('2d');
var conv_bg_p = canv_bg.getContext('2d');
//砖长宽
var brick_side = canvW / 20;
var capImage = new Image();
var capReady = false;
capImage.onload = function() {
	capReady = true;
};
capImage.src = "img/cap.png";
capImage.width = screen.width * 0.06;
capImage.height = screen.width * 0.04;
var bgImage = new Image();
bgImage.src = "img/background.jpg";
var cap;
cap = new Object();
cap.x = canvH / 2 + brick_side * 2;
cap.y = canvH / 2 - brick_side * 2;
cap.speed = 256;

function paint_brick(x, y) {
	conv_bg_p.rect(x, y, brick_side, brick_side);
	conv_bg_p.fillStyle = "black";
	conv_bg_p.fill();
	conv_bg_p.lineWidth = 1;
	conv_bg_p.strokeStyle = 'darkred';
	conv_bg_p.stroke();
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

for(var i = 0; i < 22; i++) {
	paint_brick(i * brick_side, canvH - brick_side);
}
var main = function() {
	conv_p.clearRect(0, 0, canvW, canvH);
	conv_p.drawImage(bgImage, nowW - canvW / 2, nowH - canvH / 2);
	if(capReady) {
		conv_p.drawImage(capImage, cap.x + nowW - canvW / 2, cap.y + nowH - canvH / 2, capImage.width, capImage.height);
	}
	move_rel();
	requestAnimationFrame(main);
	var now = Date.now();
	var delta = now - then;
	update(delta / 1000);
	then = now;
};
main();
function move_rel(){
	//if(cap.x)
}
function gete(e) {
	if(e.offsetX>canvW / 2){
		if(nowW>0)
			nowW--;
	}else if(nowW<gameW)
		nowW++;
	if(e.offsetY>canvH / 2){
		if(nowH>0)
			nowH--;
	}else if(nowH<gameH)
		nowH++;
}