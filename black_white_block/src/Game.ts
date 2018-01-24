//总控类，不继承任何类，为了可以获取最根层的显示列表，需要传入一个容器，这里就是egret.DisplayObjectContainer类型的容器
class Game{
    //根容器
    private _root : egret.DisplayObjectContainer;
    public constructor(root:egret.DisplayObjectContainer){
        this._root = root;
        this.createGroupsRect();
        this.createTimer();
        this.startGame();
    }
    //记录有多少行
    private _row:number;
    //所有的组的父级，为了当游戏变得复杂的时候，分成多个层级
    private _rectRoot:egret.Sprite;
    //存放所有GroupRect对象
    private _rectGroups:Array<GroupRect>;
    //创建组
    private createGroupsRect(){
        this._rectRoot = new egret.Sprite();
        this._root.addChild(this._rectRoot);
        this._rectGroups = [];
        this._row = Data.getRectRow();

        //创建组
        var groupRect:GroupRect;
        console.log(this._row)
        for(var i = 0;i < this._row;i++){
            groupRect = new GroupRect();
            //监听gameOver和clickRight
            groupRect.addEventListener("gameOver", this.gameOver, this);
            groupRect.addEventListener("clickRight", this.newRow, this);
            this._rectGroups.push(groupRect);
            groupRect.y = Data.getRectWidth()*i;
            this._rectRoot.addChild(groupRect);
        }
        this._rectRoot.y = Data.getStageHeight() - this._rectRoot.height;
    }
    private newRow(){
        for(var i =0;i < this._row;i++){
            //所有的组移动
            this._rectGroups[i].move();
        }
        //分数+1
        Data.score++;
    }
    //游戏结束面板
    private gameOverPanel:GameOverPanel;
    //创建游戏结束面板
    private gameOver(){
        //停止计时器
        this._timerPanel.stop();
        //弹出结束面板
        if(!this.gameOverPanel){
            this.gameOverPanel = new GameOverPanel();
            this.gameOverPanel.addEventListener('startGame', this.startGame, this);
        }
        this._root.addChild(this.gameOverPanel);
    }
    //计时器面板
    private  _timerPanel:TimePanel;
    //创建计时器面板
    private createTimer(){
        this._timerPanel = new TimePanel();
        this._timerPanel.addEventListener('gameOver', this.gameOver, this);
        this._root.addChild(this._timerPanel);
    }
    private startGame(){
        //初始化分数归0
        Data.score = 0;
        //遍历所有组（行）
        for(var i = 0;i < this._row;i++){
            //重置所有为不可点击
            this._rectGroups[i].init();
            //Y轴左边
            this._rectGroups[i].y = Data.getRectWidth()*i;
            //定义当前的行数！！！！！！！！
            this._rectGroups[i]._currentRow = i;
            //控制最低部一行，相当于是最后一行的时候，4个小方块为白色，不可点击状态
            if(i != (this._row - 1)){
                this._rectGroups[i].createBlackRect();
            }
        }
        //开始计时
        this._timerPanel.start();
    }
}