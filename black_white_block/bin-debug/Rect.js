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
//继承自Sprite类
var Rect = (function (_super) {
    __extends(Rect, _super);
    function Rect() {
        var _this = _super.call(this) || this;
        //4种颜色<黑、白、红、蓝>，不同状态对应不同的颜色
        _this._colors = [0x000000, 0xffffff, 0xff0000, 0x0000ff];
        //当前的颜色值下表
        _this._currentColor = 1;
        //默认不可点击
        _this._type = RectType.NONCLICKABLE;
        //打开点击事件
        _this.touchEnabled = true;
        _this.draw();
        return _this;
    }
    //执行绘图
    Rect.prototype.draw = function () {
        this.width = Data.getRectWidth();
        this.height = Data.getRectWidth();
        this.graphics.lineStyle(2, 0x000000);
        this.graphics.beginFill(this._colors[this._currentColor]);
        this.graphics.drawRect(0, 0, Data.getRectWidth(), Data.getRectWidth());
        this.graphics.endFill();
    };
    Object.defineProperty(Rect.prototype, "type", {
        //get属性
        get: function () {
            return this._type;
        },
        //set属性
        set: function (val) {
            // if(val != this._type){
            this._type = val;
            //根据类型不同改变颜色
            if (this._type == RectType.CLICKABLE) {
                this._currentColor = 0;
            }
            else {
                this._currentColor = 1;
            }
            this.draw();
            // }
        },
        enumerable: true,
        configurable: true
    });
    //处理点击业务逻辑
    Rect.prototype.onRectClick = function () {
        //根据类型不同改变颜色
        if (this._type == RectType.CLICKABLE) {
            this._currentColor = 3;
        }
        else {
            this._currentColor = 2;
        }
        this.draw();
    };
    return Rect;
}(egret.Sprite));
__reflect(Rect.prototype, "Rect");
