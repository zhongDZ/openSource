//继承自Sprite类
class Rect extends egret.Sprite{
    public constructor(){
        super();
        //打开点击事件
        this.touchEnabled = true;
        this.draw();
    }
    //4种颜色<黑、白、红、蓝>，不同状态对应不同的颜色
    private _colors:Array<number> = [0x000000, 0xffffff, 0xff0000, 0x0000ff];
    //当前的颜色值下表
    private _currentColor:number = 1;
    //执行绘图
    private draw(){
        this.width = Data.getRectWidth();
        this.height = Data.getRectWidth();
        this.graphics.lineStyle(2, 0x000000);
        this.graphics.beginFill(this._colors[ this._currentColor ]);
        this.graphics.drawRect(0, 0, Data.getRectWidth(), Data.getRectWidth());
        this.graphics.endFill();
    }
    //默认不可点击
    private _type:string = RectType.NONCLICKABLE;
    //get属性
    public get type():string{
        return this._type;
    }
    //set属性
    public set type(val:string){
        // if(val != this._type){
            this._type = val;
            //根据类型不同改变颜色
            if(this._type == RectType.CLICKABLE){
                this._currentColor = 0;
            }else{
                this._currentColor = 1;
            }
            this.draw();
        // }
    }
    //处理点击业务逻辑
    public onRectClick(){
        //根据类型不同改变颜色
        if(this._type == RectType.CLICKABLE){
            this._currentColor = 3;
        }else{
            this._currentColor = 2;
        }
        this.draw();
    }
}