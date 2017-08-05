//////*********************************************
//////此JS文件负责：
//////	资源的加载
//////	JS文件的加载
//////	以及其他一次性操作
//////*********************************************
//////****分配游戏数据/资源
//var control = new Object();
//var initialize = new Object();
//var paint = new Object();
//var role = new Object();
//////****加载图片
//(function() {
//	//图片列表
//	var imgList = [
//		["img_cap", "img/cap.png"],
//		["img_role", "img/people.png"],
//		["img_role_throw", //键值
//			"img/people_throw_1.png", //图片
//			"img/people_throw_2.png", //图片
//			"img/people_throw_3.png", //图片
//			"img/people_throw_4.png" //图片
//		]
//	];
//	for(var i in imgList) {
//		var k = imgList[i][0];
//		paint[k] = new Array();
//		for(var j = 1; j < imgList[i].length; j++) {
//			paint[k][j - 1] = new Image();
//			paint[k][j - 1].src = imgList[i][j];
//		}
//	}
//})();
//////****加载其他js文件
//(function() {
//	var obj = {};
//	var jsList = ["js/control.js", "js/paint.js", "js/role.js"];
//	/**
//	 * 动态加载脚本函数
//	 * @param url 要加载的脚本路径
//	 * @param callback  回调函数
//	 */
//	obj.loadScript = function(url, callback) {
//		var doc = document;
//		var script = doc.createElement("script");
//		script.type = "text/javascript";
//		if(script.readyState) { //IE
//			script.onreadystatechange = function() {
//				if(script.readyState == "load" || script.readyState == "complete") {
//					script.onreadystatechange = null;
//					callback();
//				}
//			};
//		} else {
//			script.onload = function() {
//				callback();
//			};
//		}
//		script.src = url;
//		doc.getElementsByTagName("head")[0].appendChild(script);
//	};
//	obj.callback = function callback() {
//		if(jsList.length) obj.loadScript(jsList.shift(), callback);
//	};
//	obj.loadScript(jsList.shift(), obj.callback);
//})();
(function() {
	//设置画布大小，定义画布属性
	document.body.scroll = "no";
	var canv = document.getElementById('canv');
	var canvW = screen.width * 0.7;
	var canvH = screen.height * 0.7;
	var gameW = canvW * 3;
	var gameH = canvH * 3;
	canv.width = canvW;
	canv.height = canvH;
	canv.style.marginLeft = screen.width * 0.15;
	canv.style.marginTop = screen.height * 0.025;
	var conv_p = canv.getContext('2d');
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
	var keysDown = {};
	addEventListener("keydown", function(e) {
		keysDown[e.keyCode] = true;
	}, false);
	addEventListener("keyup", function(e) {
		delete keysDown[e.keyCode];
	}, false);
	var then = Date.now();
	var allcap = {
		cap: new Array(),
		img: capImage,
		draw: function(ctx) {
			for(var i = 0; i < this.cap.length; i++) {
				ctx.save();
				ctx.translate(this.cap[i].x, this.cap[i].y);
				//ctx.rotate(-Math.atan2(-this.cap[i].vy, this.cap[i].vx));
				ctx.globalAlpha = this.cap[i].alpha;
				ctx.drawImage(this.img, this.cap[i].x, this.cap[i].y, capImage.width, capImage.height);
				ctx.restore();
				ctx.globalAlpha = 1;
			}
		},
		add: function(x, y, speed) {
			this.cap[this.cap.length] = {
				x: x,
				y: y,
				speed: speed,
				alpha: 1
			};
		},
		//控制
		update: function(modifier) {
			for(var i = 0; i < this.cap.length; i++) {
				if(37 in keysDown) { //left
					if(this.cap[i].x > 0)
						this.cap[i].x -= this.cap[i].speed * modifier;
				}
				if(39 in keysDown) { //right
					if(this.cap[i].x <= gameW - capImage.width)
						this.cap[i].x += this.cap[i].speed * modifier;
				}
				if(38 in keysDown) { //up
					if(this.cap[i].y > 0)
						this.cap[i].y -= this.cap[i].speed * modifier;
				}
				if(40 in keysDown) { //down
					if(this.cap[i].y <= gameH - capImage.height)
						this.cap[i].y += this.cap[i].speed * modifier;
				}
			}
		}
	};
	allcap.add(canvW + brickImage.width * 2, canvH - brickImage.height * 2.8, 926);
	//画砖头的方法
	function paint_brick(x, y) {
		conv_p.drawImage(brickImage, x, y, brickImage.width, brickImage.height);
	}
	//main函数
	var w = window;
	requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
	var main = function() {
		var now = Date.now();
		var delta = now - then;
		allcap.update(delta / 1000);
		then = now;
		conv_p.clearRect(0, 0, gameW, gameH);
		allcap.draw(conv_p);
		//		if(cap.x <= canvW * 2.5 && cap.x >= canvW * 0.5 || cap.y <= canvH * 2.5 && cap.y >= canvH * 0.5) {
		//			conv_p.restore();
		//			conv_p.save();
		//			if(cap.x <= canvW * 2.5 && cap.x >= canvW * 0.5) {
		//				conv_p.translate(-cap.x + canvW / 2, 0);
		//			} else if(cap.y <= canvH * 2.5 && cap.y >= canvH * 0.5 && cap.x >= canvW * 2.5) {
		//				conv_p.translate(-canvW * 2, 0);
		//			}
		//			if(cap.y <= canvH * 2.5 && cap.y >= canvH * 0.5) {
		//				conv_p.translate(0, -cap.y + canvH / 2);
		//			} else if(cap.x <= canvW * 2.5 && cap.x >= canvW * 0.5 && cap.y >= canvH * 2.5) {
		//				conv_p.translate(0, -canvH * 2);
		//			}
		////		}
		//		if(capReady) {
		//			conv_p.drawImage(capImage, cap.x, cap.y, capImage.width, capImage.height);
		//		}
		for(var i = 0; i < 30; i++) {
			paint_brick(i * brickImage.width, canvH - brickImage.height);
		}
		requestAnimationFrame(main);
	};
	main();
	var Me = new Role(5, 3);
})();