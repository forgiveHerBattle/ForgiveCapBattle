//整体布局
window.onload = function() {
	//设置画布大小
	document.body.scroll = "no";
}
//定义画布属性
var canv = document.getElementById('canv');
var canv_bg = document.getElementById('canv_bg');
var canvW = screen.width * 0.8;
var canvH = screen.height * 0.8;
var gameW = canvW * 2;
var gameH = canvH * 2;
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
//定义帽子
var capImage = new Image();
var capReady = false;
capImage.onload = function() {
	capReady = true;
};
capImage.src = "img/cap.png";
capImage.width = screen.width * 0.06;
capImage.height = screen.width * 0.04;
//定义砖头
var brickImage = new Image();
var brickReady = false;
brickImage.onload = function() {
	brickReady = true;
};
brickImage.src = "img/砖.png";
brickImage.width = screen.width * 0.06;
brickImage.height = screen.width * 0.02;
//定义背景
var bgImage = new Image();
bgImage.src = "img/background.jpg";
var cap;
cap = new Object();
cap.x = canvH / 2 + brickImage.width * 2;
cap.y = canvH - brickImage.height* 2.8;
cap.speed = 256;
//画砖头的方法
function paint_brick(x, y) {
	conv_bg_p.drawImage(brickImage,x, y, brickImage.width, brickImage.height);
}
//控制
var keysDown = {};
addEventListener("keydown", function(e) {
	keysDown[e.keyCode] = true;
}, false);
addEventListener("keyup", function(e) {
	delete keysDown[e.keyCode];
}, false);
var update = function(modifier) {
	if(37 in keysDown) { //left
		cap.x -= cap.speed * modifier;
		nowW += cap.speed * modifier;
	}
	if(39 in keysDown) { //right
		cap.x += cap.speed * modifier;
		nowW -= cap.speed * modifier;
	}
	if(38 in keysDown) { //up
		cap.y -= cap.speed * modifier;
		nowH += cap.speed * modifier;
	}
	if(40 in keysDown) { //down
		cap.y += cap.speed * modifier;
		nowH -= cap.speed * modifier;
	}
};
//main函数
var w = window;
var then = Date.now();
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
var main = function() {
	conv_p.clearRect(0, 0, canvW, canvH);
	conv_bg_p.clearRect(0, 0, canvW, canvH);
	//conv_p.drawImage(bgImage, nowW - canvW / 2, nowH - canvH / 2);
	if(capReady) {
		conv_p.drawImage(capImage, cap.x + nowW - canvW / 2, cap.y + nowH - canvH / 2, capImage.width, capImage.height);
	}	
	for(var i = 0; i < 22; i++) {
		paint_brick(i * brickImage.width + nowW - canvW / 2, canvH - brickImage.height + nowH - canvH / 2);
	}
	requestAnimationFrame(main);
	var now = Date.now();
	var delta = now - then;
	update(delta / 1000);
	then = now;
};
main();
//鼠标事件(没用到)
function gete(e) {
	if(e.offsetX > canvW / 2) {
		if(nowW > 0)
			nowW--;
	} else if(nowW < gameW)
		nowW++;
	if(e.offsetY > canvH / 2) {
		if(nowH > 0)
			nowH--;
	} else if(nowH < gameH)
		nowH++;
}