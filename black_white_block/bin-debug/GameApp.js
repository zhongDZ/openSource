var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GameMain = (function (_super) {
    __extends(GameMain, _super);
    function GameMain() {
        var _this = _super.call(this) || this;
        // var rect = new Rect();
        // this.addChild(rect);
        // rect.type = RectType.NONCLICKABLE;
        // rect.onRectClick();
        // var group:GroupRect = new GroupRect();
        // this.addChild(group);
        // group.createBlackRect();
        // group.addEventListener('gameOver', this.gameOver, this);
        // group.addEventListener('clickRight', this.clickRight, this);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addToStage, _this);
        return _this;
    }
    GameMain.prototype.addToStage = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        var game = new Game(this);
    };
    return GameMain;
}(egret.DisplayObjectContainer));
__reflect(GameMain.prototype, "GameMain");
