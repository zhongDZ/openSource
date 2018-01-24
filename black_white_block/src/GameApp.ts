class GameMain extends egret.DisplayObjectContainer{
    public constructor(){
        super();

        // var rect = new Rect();
        // this.addChild(rect);
        // rect.type = RectType.NONCLICKABLE;
        // rect.onRectClick();

        // var group:GroupRect = new GroupRect();
        // this.addChild(group);
        // group.createBlackRect();
        // group.addEventListener('gameOver', this.gameOver, this);
        // group.addEventListener('clickRight', this.clickRight, this);

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }
    public addToStage(){
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        var game = new Game(this);
    }
    // public gameOver(){
    //     console.log('gameOver')
    // }
    // public clickRight(){
    //     console.log('clickRight')
    // }
}