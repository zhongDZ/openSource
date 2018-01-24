class Data{
    //小方块的宽
    private static _rectWidth:number = 0;
    //获取小方块的宽度
    public static getRectWidth():number{
        if(Data._rectWidth == 0){
            //小方块的宽度等于舞台的宽度/4
            Data._rectWidth = egret.MainContext.instance.stage.stageWidth/4;    
        }
        return Data._rectWidth;
    }
    //分数
    public static score:number = 0;
    //行数
    public static _rectRow:number = 0;
    //获取行数
    public static getRectRow():number{
        if(Data._rectRow == 0){
            //每屏的行数等于舞台的高度/小方块的宽度 +1是为了不出现断层
            Data._rectRow = Math.ceil(egret.MainContext.instance.stage.stageHeight/Data.getRectWidth()) + 1;
        }
        return Data._rectRow;
    }
    //获取舞台的的高度
    public static getStageHeight():number{
        return egret.MainContext.instance.stage.stageHeight;
    }
}