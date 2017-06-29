////*********************************************
////此JS文件负责：
////	处理画布的重画
////*********************************************
(function () {
	//var raf=requestAnimationFrame||mozRequestAnimationFrame||webkitRequestAnimationFrame;
	var paint=function paint() {
		raf(paint);
	}
//raf(paint);
paint.prototype.__createHammer = function() {
        var hammer = new Hammer();
        this.hammer = hammer;
    }
/*
paint.paint=function paint(){
	console.log("画了图片");
	paint.raf(paint);
};
paint.raf(paint.paint);*/
window.paint=paint;
})();