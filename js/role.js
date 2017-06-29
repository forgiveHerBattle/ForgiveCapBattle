////*********************************************
////此JS文件负责：
////	角色位置、动作等状态改变
////*********************************************
(function() {

    var Role = function(paint) {


    }


    /**
     * @private
     * 创建锤子
     */
    Role.prototype.__createHammer = function() {
        var hammer = new Hammer();
        this.hammer = hammer;
    }

    window.Role = Role;
})();
