////*********************************************
////此JS文件负责：
////	角色位置、动作等状态改变
////*********************************************
(function() {
	var z=0;
	var Role = function(x1, y1) {
		var x = 0;
		var y = 0;
		x = x1;
		y = y1;
		z++;
		this.show = function() {
			console.log(x, y);
		}
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