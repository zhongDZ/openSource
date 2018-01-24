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
var GameOverPanel = (function (_super) {
    __extends(GameOverPanel, _super);
    function GameOverPanel() {
        var _this = _super.call(this) || this;
        //绘图
        _this.draw();
        //监听一个事件，当此面板被添加到舞台的时候触发
        _this.addEventListener(egret.Event.ADDED, _this.showText, _this);
        return _this;
    }
    GameOverPanel.prototype.draw = function () {
        var w = egret.MainContext.instance.stage.stageWidth;
        var h = egret.MainContext.instance.stage.stageHeight;
        this.graphics.beginFill(0x111111, 0.5);
        this.graphics.drawRect(0, 0, w, h);
        this.graphics.endFill();
        this.txt = new egret.TextField();
        this.txt.width = w;
        this.txt.y = 100;
        this.txt.textColor = 0xff0000;
        this.txt.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(this.txt);
        var btn = new egret.Sprite();
        btn.graphics.beginFill(0x0000ff);
        btn.graphics.drawRect(0, 0, 200, 100);
        btn.graphics.endFill();
        btn.width = 200;
        btn.height = 100;
        btn.x = (w - 200) / 2;
        btn.y = (h - 100) / 2;
        this.addChild(btn);
        btn.touchEnabled = true;
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);
    };
    //更新文本内容
    GameOverPanel.prototype.showText = function () {
        this.txt.text = '我努力点击了' + Data.score + '步';
    };
    GameOverPanel.prototype.startGame = function () {
        this.parent.removeChild(this);
        this.dispatchEventWith('startGame');
    };
    return GameOverPanel;
}(egret.Sprite));
__reflect(GameOverPanel.prototype, "GameOverPanel");
