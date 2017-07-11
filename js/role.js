////*********************************************
////此JS文件负责：
////	角色位置、动作等状态改变
////*********************************************
(function() {
	var x = 0;
	var y = 0;
	var z = 0;
	var Role = function(x, y) {
		this.x = x;
		this.y = y;
		z++;
	}
	/**
	 * @private
	 * 创建锤子
	 */
	Role.prototype.create = function() {
		console.log(z);
	}
	Role.prototype.show = function() {

	}
	window.Role = Role;
})();