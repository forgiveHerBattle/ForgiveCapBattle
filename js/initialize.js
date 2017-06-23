var control = new Object();
var initialize = new Object();
var paint = new Object();
var role = new Object();
(function() { //初始化图片
	//图片列表
	var imgList = [
		["img_cap", "img/cap.png"],
		["img_role", "img/people.png"],
		["img_role_throw", //键值
			"img/people_throw_1.png", //图片
			"img/people_throw_2.png", //图片
			"img/people_throw_3.png", //图片
			"img/people_throw_4.png" //图片
		]
	];
	for(var i in imgList) {
		var k = imgList[i][0];
		paint[k] = new Array();
		for(var j = 1; j < imgList[i].length; j++) {
			paint[k][j - 1] = new Image();
			paint[k][j - 1].src = imgList[i][j];
		}
	}
})();
(function() { //动态加载"control.js","paint.js"等js文件
	var obj = {};
	var jsList = ["js/control.js", "js/paint.js", "js/role.js"];
	/**
	 * 动态加载脚本函数
	 * @param url 要加载的脚本路径
	 * @param callback  回调函数
	 */
	obj.loadScript = function(url, callback) {
		var doc = document;
		var script = doc.createElement("script");
		script.type = "text/javascript";
		if(script.readyState) { //IE
			script.onreadystatechange = function() {
				if(script.readyState == "load" || script.readyState == "complete") {
					script.onreadystatechange = null;
					callback();
				}
			};
		} else {
			script.onload = function() {
				callback();
			};
		}
		script.src = url;
		doc.getElementsByTagName("head")[0].appendChild(script);
	};
	obj.callback = function callback() {
		if(jsList.length) obj.loadScript(jsList.shift(), callback);
	};
	obj.loadScript(jsList.shift(), obj.callback);
})();