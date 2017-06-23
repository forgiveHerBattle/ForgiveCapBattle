(function () {
paint.raf=requestAnimationFrame||mozRequestAnimationFrame||webkitRequestAnimationFrame;
paint.paint=function paint(){
	console.log("画了图片");
	paint.raf(paint);
};
paint.raf(paint.paint);
})();