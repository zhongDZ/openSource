var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Data = (function () {
    function Data() {
    }
    //获取小方块的宽度
    Data.getRectWidth = function () {
        if (Data._rectWidth == 0) {
            //小方块的宽度等于舞台的宽度/4
            Data._rectWidth = egret.MainContext.instance.stage.stageWidth / 4;
        }
        return Data._rectWidth;
    };
    //获取行数
    Data.getRectRow = function () {
        if (Data._rectRow == 0) {
            //每屏的行数等于舞台的高度/小方块的宽度 +1是为了不出现断层
            Data._rectRow = Math.ceil(egret.MainContext.instance.stage.stageHeight / Data.getRectWidth()) + 1;
        }
        return Data._rectRow;
    };
    //获取舞台的的高度
    Data.getStageHeight = function () {
        return egret.MainContext.instance.stage.stageHeight;
    };
    //小方块的宽
    Data._rectWidth = 0;
    //分数
    Data.score = 0;
    //行数
    Data._rectRow = 0;
    return Data;
}());
__reflect(Data.prototype, "Data");
