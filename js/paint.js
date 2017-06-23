////*********************************************
////此JS文件负责：
////	处理图片的切换
////	处理画布的重画
////*********************************************
(function () {
paint.raf=requestAnimationFrame||mozRequestAnimationFrame||webkitRequestAnimationFrame;
paint.paint=function paint(){
	console.log("画了图片");
	paint.raf(paint);
};
paint.raf(paint.paint);
})();