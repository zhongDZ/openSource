var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RectType = (function () {
    function RectType() {
    }
    //外部可以访问的静态变量
    RectType.CLICKABLE = 'clickable';
    RectType.NONCLICKABLE = 'nonclickable';
    return RectType;
}());
__reflect(RectType.prototype, "RectType");
