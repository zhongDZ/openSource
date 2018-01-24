//继承自Sprite精灵类
class TimePanel extends egret.Sprite{
    constructor(){
        super();
        this.draw();
        this.createTimer();
    }
    //时间显示文本
    private txt:egret.TextField;
    //创建文本
    private draw(){
        this.txt = new egret.TextField();
        this.txt.width = egret.MainContext.instance.stage.stageWidth;
        this.txt.y = 200;
        this.txt.textColor = 0xff0000;
        this.txt.textAlign = egret.HorizontalAlign.CENTER;
        this.txt.text = "20'00''";
        this.addChild(this.txt);
    }
    //存放计时器
    private _timer:egret.Timer;
    //计时（循环）的次数
    private _num:number = 20;
    //创建计时器
    private createTimer(){
        this._timer = new egret.Timer(1000, this._num);
        //监听一个TIMER时间，没帧执行
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        //监听计时结束
        this._timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerCom, this);
    }
    //计时时间
    private _timers = 20;
    private onTimer(){
        this._timers -= 1;
        this.txt.text = this._timers + "'00''"
    }
    private onTimerCom(){
        this.txt.text = "00'00''";
        this.dispatchEventWith('gameOver');
    }
    //重置计时器和时间
    public start(){
        this.txt.text = "20'00''";
        this._timers = 20;
        this._timer.reset();
        this._timer.start();
    }
    //停止计时器
    public stop(){
        this._timer.stop();
    }
}