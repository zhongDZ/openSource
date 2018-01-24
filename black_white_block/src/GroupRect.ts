//继承自Sprite
class GroupRect extends egret.Sprite{
    public constructor(){
        super();
        this.createRects();
    }
    //Rect类型的数组
    private _rects:Array<Rect>;
    //当GroupRect被实例化的时候能够同时创建4个首尾相接的小方块，同时添加到显示列表
    private createRects(){
        //实例化数组
        this._rects = [];
        //创建小方块
        for(var i = 0;i < 4;i++){
            var rect:Rect = new Rect();
            this._rects.push(rect);
            //水平位置
            rect.x = rect.width*i;
            this.addChild(rect);
            //添加点解事件
            rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickRect, this);
        }
    }
    //当前的行数
    public _currentRow:number = 0;
    //点击事件逻辑处理
    private onClickRect(evt:egret.TouchEvent){
        //调用当前对象的点击事件
        evt.target.onRectClick();
        //当前总行数Data.getRectRow()
        //倒数第二行 this._currentRow != Data.getRectRow() - 2 这里-2要终点理解！！！
        if(evt.target.type == RectType.NONCLICKABLE || this._currentRow != Data.getRectRow() - 2){
            //抛出一个游戏结束的事件
            this.dispatchEventWith("gameOver");
        }else{
            //抛出一个点击正确的事件
            this.dispatchEventWith("clickRight");
        }
    }
    //定义一组当中，随机其中一个为可点击的
    private _currentBlcakRectIndex:number = 0;
    public createBlackRect(){
        this.init();
        var n:number = Math.random();
        if(n >= 0 && n < 0.25){
            this._currentBlcakRectIndex = 0;
        }else if(n >= 0.25 && n < 0.5){
            this._currentBlcakRectIndex = 1;
        }else if(n >= 0.5 && n < 0.75){
            this._currentBlcakRectIndex = 2;
        }else if(n >= 0.75 && n <= 1){
            this._currentBlcakRectIndex = 3;
        }
        this._rects[this._currentBlcakRectIndex].type = RectType.CLICKABLE;
    }

    //为了性能考虑，当某一行往下移动到屏幕外的时候，又回到顶部第一行，这时候需要把该组的类型重置为不可点击状态，并且一定要在每组当中定义随机一个可点击的方块的之前重置
    public init(){
        for(var i = 0;i < 4;i++){
            this._rects[i].type = RectType.NONCLICKABLE;
        }
    }
    //移动的动作
    public move(){
        //当前行数自增1
        this._currentRow += 1;
        if(this._currentRow == Data.getRectRow()){
            //重置当前行为顶部，既是第一行
            this._currentRow = 0;
            this.createBlackRect();
        }
        //将位置归回到顶部，这样就实现为循环的状态
        this.y = this._currentRow*Data.getRectWidth();
    }
}