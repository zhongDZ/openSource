//继承自Sprite类
class GameOverPanel extends egret.Sprite{
    public constructor(){
        super();
        //绘图
        this.draw();
        //监听一个事件，当此面板被添加到舞台的时候触发
        this.addEventListener(egret.Event.ADDED, this.showText, this);
    }
    //显示文本
    private txt:egret.TextField;
    private draw(){
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
        btn.x = (w - 200)/2;
        btn.y = (h - 100)/2;
        this.addChild(btn);
        btn.touchEnabled = true;
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);
    }
    //更新文本内容
    private showText(){
        this.txt.text = '我努力点击了'+Data.score+'步';
    }
    private startGame(){
        this.parent.removeChild(this);
        this.dispatchEventWith('startGame')
    }
}