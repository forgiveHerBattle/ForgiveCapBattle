//
//  control.js
//
//  处理用户的输入
//  requestAnimationFrame的循环
//
//  Created by 林嘉豪 on 2017-07-05.
//  Copyright 2017 林嘉豪. All rights reserved.
//
(function() {
	var raf = requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame;
	var rafPaint = function rafPaint() {
		raf(rafPaint);
	}
	var needLoadNum= 1;
	var Control = {

	};
	Control.prototype.loadFinished = function() {
		if(--needLoadNum == 0) {
			raf(rafPaint);
		}
	};
	window.Control = Control;
})();