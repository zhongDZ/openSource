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
//继承自Sprite精灵类
var TimePanel = (function (_super) {
    __extends(TimePanel, _super);
    function TimePanel() {
        var _this = _super.call(this) || this;
        //计时（循环）的次数
        _this._num = 20;
        //计时时间
        _this._timers = 20;
        _this.draw();
        _this.createTimer();
        return _this;
    }
    //创建文本
    TimePanel.prototype.draw = function () {
        this.txt = new egret.TextField();
        this.txt.width = egret.MainContext.instance.stage.stageWidth;
        this.txt.y = 200;
        this.txt.textColor = 0xff0000;
        this.txt.textAlign = egret.HorizontalAlign.CENTER;
        this.txt.text = "20'00''";
        this.addChild(this.txt);
    };
    //创建计时器
    TimePanel.prototype.createTimer = function () {
        this._timer = new egret.Timer(1000, this._num);
        //监听一个TIMER时间，没帧执行
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        //监听计时结束
        this._timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerCom, this);
    };
    TimePanel.prototype.onTimer = function () {
        this._timers -= 1;
        this.txt.text = this._timers + "'00''";
    };
    TimePanel.prototype.onTimerCom = function () {
        this.txt.text = "00'00''";
        this.dispatchEventWith('gameOver');
    };
    //重置计时器和时间
    TimePanel.prototype.start = function () {
        this.txt.text = "20'00''";
        this._timers = 20;
        this._timer.reset();
        this._timer.start();
    };
    //停止计时器
    TimePanel.prototype.stop = function () {
        this._timer.stop();
    };
    return TimePanel;
}(egret.Sprite));
__reflect(TimePanel.prototype, "TimePanel");
