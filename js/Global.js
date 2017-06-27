//整体布局
window.onload = function() {
	//设置画布大小
	document.body.scroll = "no";
}
//定义画布属性
var canv = document.getElementById('canv');
var canv_bg = document.getElementById('canv_bg');
var canvW = screen.width * 0.7;
var canvH = screen.height * 0.7;
var gameW = canvW * 3;
var gameH = canvH * 3;
canv.width = canvW;
canv.height = canvH;
canv_bg.width = canvW;
canv_bg.height = canvH;
canv.style.marginLeft = screen.width * 0.15;
canv.style.marginTop = screen.height * 0.025;
canv_bg.style.marginLeft = screen.width * 0.15;
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
brickImage.width = canvW / 14;
brickImage.height = canvW / 42;
//定义背景
var bgImage = new Image();
bgImage.src = "img/background.jpg";
var cap;
cap = new Object();
cap.x = canvW + brickImage.width * 2;
cap.y = canvH - brickImage.height * 2.8;
cap.speed = 956;
//画砖头的方法
function paint_brick(x, y) {
	conv_bg_p.drawImage(brickImage, x, y, brickImage.width, brickImage.height);
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
		if(cap.x > 0)
			cap.x -= cap.speed * modifier;
	}
	if(39 in keysDown) { //right
		if(cap.x <= gameW - capImage.width)
			cap.x += cap.speed * modifier;
	}
	if(38 in keysDown) { //up
		if(cap.y > 0)
			cap.y -= cap.speed * modifier;
	}
	if(40 in keysDown) { //down
		if(cap.y <= gameH - capImage.height)
			cap.y += cap.speed * modifier;
	}
};
//main函数
var w = window;
var then = Date.now();
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
var main = function() {
	var now = Date.now();
	var delta = now - then;
	update(delta / 1000);
	then = now;
	conv_p.clearRect(0, 0, gameW, gameH);
	conv_bg_p.clearRect(0, 0, gameW, gameH);
	//conv_p.drawImage(bgImage, nowW - canvW / 2, nowH - canvH / 2); 	
	if(cap.x <= canvW * 2.5 && cap.x >= canvW * 0.5 || cap.y <= canvH * 2.5 && cap.y >= canvH * 0.5) {
		conv_p.restore();
		conv_bg_p.restore();
		conv_p.save();
		conv_bg_p.save();
		if(cap.x <= canvW * 2.5 && cap.x >= canvW * 0.5) {
			conv_p.translate(-cap.x + canvW / 2, 0);
			conv_bg_p.translate(-cap.x + canvW / 2, 0);
		} else if(cap.y <= canvH * 2.5 && cap.y >= canvH * 0.5 && cap.x >= canvW * 2.5) {
			conv_p.translate(-canvW * 2, 0);
			conv_bg_p.translate(-canvW * 2, 0);
		}
		if(cap.y <= canvH * 2.5 && cap.y >= canvH * 0.5) {
			conv_p.translate(0, -cap.y + canvH / 2);
			conv_bg_p.translate(0, -cap.y + canvH / 2);
		} else if(cap.x <= canvW * 2.5 && cap.x >= canvW * 0.5 && cap.y >= canvH * 2.5) {
			conv_p.translate(0, -canvH * 2);
			conv_bg_p.translate(0, -canvH * 2);
		}
	}
	if(capReady) {
		conv_p.drawImage(capImage, cap.x, cap.y, capImage.width, capImage.height);
	}
	for(var i = 0; i < 30; i++) {
		paint_brick(i * brickImage.width, canvH - brickImage.height);
	}

	requestAnimationFrame(main);
};
main();