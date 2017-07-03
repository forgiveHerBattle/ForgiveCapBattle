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
(function () {
	var role1=new Role(5,3);
	var role2=new Role(7,4);
	role1.show();
	role2.show();
	role1.create();
})();

var x=function () {

};
x.prototype.x=0;
x.prototype.y=0;
var y;
y.prototype=x;
y.prototype.z=0;
var z=new y();
z.q=0;
