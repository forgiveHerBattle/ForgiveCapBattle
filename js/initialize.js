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
	//定义玩家的img
	var playerImage = new Image();
	var playerReady = false;
	playerImage.onload = function() {
		playerReady = true;
	};
	playerImage.src = "img/people.png";
	playerImage.width = screen.width * 0.06;
	playerImage.height = screen.width * 0.10;
	//定义帽子的img
	var capImage = new Image();
	var capReady = false;
	capImage.onload = function() {
		capReady = true;
	};
	capImage.src = "img/cap.png";
	capImage.width = screen.width * 0.06;
	capImage.height = screen.width * 0.04;
	//定义砖头的img
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
	var allplayer = {
		player: new Array(),
		img: playerImage,
		draw: function(ctx) {
			for(var i = 0; i < this.player.length; i++) {
				ctx.save();
				//ctx.translate(this.cap[i].x, this.cap[i].y);
				//ctx.rotate(-Math.atan2(-this.cap[i].vy, this.cap[i].vx));
				ctx.globalAlpha = this.player[i].alpha;
				ctx.drawImage(this.img, this.player[i].x, this.player[i].y, playerImage.width, playerImage.height);
				ctx.restore();
				ctx.globalAlpha = 1;
			}
		},
		add: function(x, y, speed) {
			this.player[this.player.length] = {
				x: x,
				y: y,
				xw: x + playerImage.width,
				yw: y + playerImage.height,
				g: 2,
				speed: speed,
				jump: 0,
				status: 0,
				alpha: 1
			};
		},
		//控制
		update: function(modifier) {
			conv_p.clearRect(0, 0, gameW, gameH);
			for(var i = 0; i < this.player.length; i++) {
				var move = this.player[i].speed * modifier;
				//重力
				if(this.player[i].y <= gameH - playerImage.height && this.player[i].status != 0) {
					this.player[i].g += 0.2;
					this.player[i].y += this.player[i].g;
				} else {
					this.player[i].g = 2;
					this.player[i].status = 0;
				}
				this.player[i].y -= this.player[i].jump;
				if(this.player[i].jump > 0)
					this.player[i].jump -= 1;
				if(this.player[i].jump <= 0 && this.player[i].status == 1)
					this.player[i].status = 2;
				if(37 in keysDown) { //left
					if(this.player[i].x > 0)
						this.player[i].x -= move;
				}
				if(39 in keysDown) { //right
					if(this.player[i].x <= gameW - playerImage.width)
						this.player[i].x += move;
				}
				if(38 in keysDown) { //up
					if(this.player[i].y > 0)
						this.player[i].y -= move;
				}
				if(40 in keysDown) { //down
					if(this.player[i].y <= gameH - playerImage.height)
						this.player[i].y += move;
				}
				if(90 in keysDown) { //lay cap
					allcap.add(this.player[i].x, this.player[i].y + 10, 526);
				}
				if(88 in keysDown) { //jump
					if(this.player[i].status == 0 || this.player[i].status == 2) {
						this.player[i].jump = 20;
						if(this.player[i].status == 0)
							this.player[i].status = 1;
						if(this.player[i].status == 2){
							this.player[i].g = 2;
							this.player[i].status = 3;
						}							
					}
				}
				if(this.player[i].x <= canvW * 2.5 && this.player[i].x >= canvW * 0.5 || this.player[i].y <= canvH * 2.5 && this.player[i].y >= canvH * 0.5) {
					conv_p.restore();
					conv_p.save();
					if(this.player[i].x <= canvW * 2.5 && this.player[i].x >= canvW * 0.5) {
						conv_p.translate(-this.player[i].x + canvW / 2, 0);
					} else if(this.player[i].y <= canvH * 2.5 && this.player[i].y >= canvH * 0.5 && this.player[i].x >= canvW * 2.5) {
						conv_p.translate(-canvW * 2, 0);
					}
					if(this.player[i].y <= canvH * 2.5 && this.player[i].y >= canvH * 0.5) {
						conv_p.translate(0, -this.player[i].y + canvH / 2);
					} else if(this.player[i].x <= canvW * 2.5 && this.player[i].x >= canvW * 0.5 && this.player[i].y >= canvH * 2.5) {
						conv_p.translate(0, -canvH * 2);
					}
				}
				this.player[i].xw = this.player[i].x + playerImage.width;
				this.player[i].yw = this.player[i].y + playerImage.height;
			}
		}
	};
	var allcap = {
		cap: new Array(),
		img: capImage,
		draw: function(ctx) {
			for(var i = 0; i < this.cap.length; i++) {
				ctx.save();
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
		}
	};
	allplayer.add(gameW / 2, gameH / 2 - 50, 1726);
	//allplayer.add(gameW / 2 +100, gameH / 2 + 100, 726);
	var allbrick = {
		brick: new Array(),
		img: brickImage,
		draw: function(ctx) {
			for(var i = 0; i < this.brick.length; i++) {
				ctx.save();
				ctx.globalAlpha = this.brick[i].alpha;
				ctx.drawImage(this.img, this.brick[i].x, this.brick[i].y, brickImage.width, brickImage.height);
				ctx.restore();
				ctx.globalAlpha = 1;
			}
		},
		add: function(x, y) {
			this.brick[this.brick.length] = {
				x: x,
				y: y,
				xw: x + brickImage.width,
				yw: y + brickImage.height,
				alpha: 1
			};
		},
		update: function() {
			for(var j = 0; j < allplayer.player.length; j++) {
				for(var i = 0; i < this.brick.length; i++) {
					if(allplayer.player[j].xw >= this.brick[i].x && allplayer.player[j].xw <= this.brick[i].xw && allplayer.player[j].yw >= this.brick[i].y && allplayer.player[j].yw <= this.brick[i].yw && allplayer.player[j].status >= 2 ||
						allplayer.player[j].x >= this.brick[i].x && allplayer.player[j].x <= this.brick[i].xw && allplayer.player[j].yw >= this.brick[i].y && allplayer.player[j].yw <= this.brick[i].yw && allplayer.player[j].status >= 2 ||
						allplayer.player[j].xw >= this.brick[i].x && allplayer.player[j].xw <= this.brick[i].xw && allplayer.player[j].yw >= this.brick[i].y && allplayer.player[j].yw + allplayer.player[j].g <= this.brick[i].yw && allplayer.player[j].status >= 2 ||
						allplayer.player[j].x >= this.brick[i].x && allplayer.player[j].x <= this.brick[i].xw && allplayer.player[j].yw >= this.brick[i].y && allplayer.player[j].yw + allplayer.player[j].g <= this.brick[i].yw && allplayer.player[j].status >= 2) {
						allplayer.player[j].yw = this.brick[i].y;
						allplayer.player[j].status = 0;
					}
				}
			}
		}
	};
	for(var i = 0; i < 30; i++) {
		allbrick.add(i * brickImage.width, canvH - brickImage.height);
		allbrick.add(i * brickImage.width + gameW / 4, canvH - brickImage.height + gameH / 4);
	}
	//main函数
	var w = window;
	requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
	var main = function() {
		var now = Date.now();
		var delta = now - then;
		allbrick.update();
		allplayer.update(delta / 1000);
		then = now;
		allplayer.draw(conv_p);
		allcap.draw(conv_p);
		allbrick.draw(conv_p);
		requestAnimationFrame(main);
	};
	main();
	var Me = new Role(5, 3);
})();
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