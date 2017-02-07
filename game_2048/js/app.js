/*==================================config===================================*/
var size = {
    width : 640,
    height : 1136
}
/*==================================config===================================*/
var gameLayer = cc.Layer.extend({
    name : 'gameLayer',
    firstX:null,
    firstY:null,
    cardArr:null,
    score:0,
    scoreLabel:null,
    gameOverLayer:null,
    gameWinLayer:null,
    ctor : function(){
        this._super();

        this.init();

        this.ignoreAnchorPointForPosition(false);

        this.initContent();

        this.loadListener();
    },
    init : function(){
        var gameBg  = new cc.Sprite(res.loadingpage);
        gameBg.x = size.width/2;
        gameBg.y = size.height/2;
        this.addChild(gameBg,0);
    },
    initContent : function(){
        var lazyLayer = this.lazyLayer = new cc.LayerColor(cc.color(180, 170, 160, 255), 560, 560);
        lazyLayer.ignoreAnchorPointForPosition(false);
        lazyLayer.x = size.width/2;
        lazyLayer.y = size.height/2;
        this.addChild(lazyLayer);

        // 显示分数
        var label = new cc.LabelTTF("Score : ", "Arial", 32);
        label.fillStyle = cc.color.RED;
        label.setAnchorPoint(0,0);
        label.x = 100;
        label.y = size.height - 100;
        this.addChild(label, 10);
        this.scoreLabel = new cc.LabelTTF("0", "Arial", 32);
        this.scoreLabel.setAnchorPoint(0,0);
        this.scoreLabel.x = 100 + 120;
        this.scoreLabel.y = size.height - 100;
        this.addChild(this.scoreLabel, 10);

        // 创建卡片数组
        this.cardArr = new Array(4);
        for(var i=0; i<4; i++)
        {
            this.cardArr[i] = new Array(4);
        }

        var _size = cc.director.getWinSize();
        // 初始化卡片数组
        this.createCards(_size);

        // 随机生成两个数字
        this.autoCreateCardNumber();
        this.autoCreateCardNumber();
    },
    createCards:function(size){//创建卡片
        var unitSize = (size.height/2 - 80)/4;
        var unitSizeY = unitSize - 30;
        for(var i=0; i<4; i++){
            for(var j=0; j<4; j++){
                var card = CardSprite.createCardSprite(0, unitSize, unitSize, unitSize*i + 80, unitSize*j + 330);
                this.cardArr[i][j] = card;
                this.addChild(card);
            }
        }
    },
    autoCreateCardNumber:function(){//生成随机的卡片，数字2/4
        while(1){
            var i = Math.floor(Math.random()*4);  // generate a number between 0 and 3
            var j = Math.floor(Math.random()*4);

            if (this.cardArr[i][j].getNumber() == 0){
                this.cardArr[i][j].setNumber(Math.floor(Math.random()*10) < 1 ? 4 : 2);
                break;
            }

            if (!this.shouldCreateCardNumber()){
                break;
            }
        }
    },
    loadListener : function(){
        var listener = cc.EventListener.create({
            event           : cc.EventListener.TOUCH_ONE_BY_ONE,
            target          : this,
            swallowTouches  : true,
            onTouchBegan    : this.onTouchBegan,
            onTouchMoved    : this.onTouchMoved,
            onTouchEnded    : this.onTouchEnded
        });
        cc.eventManager.addListener(listener, this);
    },
    onTouchBegan: function (touch, event) {
        var self = this.target;
        var touchPoint = touch.getLocation();
        self.firstX = touchPoint.x;
        self.firstY = touchPoint.y;
        var locationInNode = self.convertToNodeSpace(touchPoint);
        var size = self.getContentSize();
        var rect = cc.rect(0, 0, size.width, size.height);
        if (!cc.rectContainsPoint(rect, locationInNode)) {
            return false;
        }
        // 触摸处理
        // self.onTouchDispose();
        return true;

    },
    onTouchMoved : function (touch, event) {
        var self = this.target;
        var pos = touch.getLocation();
    },
    onTouchEnded : function (touch, event) {
        var self = this.target;
        var touchPoint = touch.getLocation();
        var offsetX = self.firstX - touchPoint.x;
        var offsetY = self.firstY - touchPoint.y;
        self.onTouchDispose(offsetX, offsetY);
        // console.log(Math.ceil(self.x), Math.ceil(self.y));
    },
    onTouchDispose : function(offsetX, offsetY){
        if(Math.abs(offsetX) > Math.abs(offsetY)){
            if(offsetX > 5){
                this.doLeft();
                this.doCheckGameOver();
                this.setScore(this.score);
            }else if(offsetX < -5){
                this.doRight();
                this.doCheckGameOver();
                this.setScore(this.score);
            }
        }else{
            if(offsetY > 5){
                this.doDown();
                this.doCheckGameOver();
                this.setScore(this.score);
            }else if(offsetY < -5){
                this.doUp();
                this.doCheckGameOver();
                this.setScore(this.score);
            }
        }
    },
    // 向上
    doUp:function(){
        var isdo = false;
        for (var x=0; x<4; ++x){
            for (var y=3; y>=0; --y){
                for (var y1=y-1; y1>=0; --y1){
                    if (this.cardArr[x][y1].getNumber() > 0){
                        if (this.cardArr[x][y].getNumber() <= 0){
                            this.cardArr[x][y].setNumber(this.cardArr[x][y1].getNumber());
                            this.cardArr[x][y1].setNumber(0);
                            ++y;
                            isdo = true;
                        }else if(this.cardArr[x][y].getNumber() == this.cardArr[x][y1].getNumber()){
                            this.cardArr[x][y].setNumber(this.cardArr[x][y].getNumber()*2);
                            this.cardArr[x][y1].setNumber(0);
                            this.score += this.cardArr[x][y].getNumber();  //增加分数
                            isdo = true;
                        }
                        break;
                    }
                }
            }
        }
        return isdo;
    },
    // 向下
    doDown:function(){
        var isdo = false;
        for (var x=0; x<4; ++x){
            for (var y=0; y<4; ++y){
                for (var y1=y+1; y1<4; ++y1){
                    if (this.cardArr[x][y1].getNumber() > 0){
                        if (this.cardArr[x][y].getNumber() <= 0){
                            this.cardArr[x][y].setNumber(this.cardArr[x][y1].getNumber());
                            this.cardArr[x][y1].setNumber(0);
                            --y;
                            isdo = true;
                        }else if(this.cardArr[x][y].getNumber() == this.cardArr[x][y1].getNumber()){
                            this.cardArr[x][y].setNumber(this.cardArr[x][y].getNumber()*2);
                            this.cardArr[x][y1].setNumber(0);
                            this.score += this.cardArr[x][y].getNumber();  //增加分数
                            isdo = true;
                        }
                        break;
                    }
                }
            }
        }
        return isdo;
    },
    // 向左
    doLeft:function(){
        var isdo = false;
        for (var y=0; y<4; ++y){
            for(var x=0; x<4; ++x){
                for(var x1=x+1; x1<4; ++x1){
                    if(this.cardArr[x1][y].getNumber() > 0){
                        if(this.cardArr[x][y].getNumber() <= 0){
                            this.cardArr[x][y].setNumber(this.cardArr[x1][y].getNumber());
                            this.cardArr[x1][y].setNumber(0);
                            --x;
                            isdo = true;
                        }else if(this.cardArr[x][y].getNumber() == this.cardArr[x1][y].getNumber()){
                            this.cardArr[x][y].setNumber(this.cardArr[x][y].getNumber()*2);
                            this.cardArr[x1][y].setNumber(0);
                            this.score += this.cardArr[x][y].getNumber();  //增加分数
                            isdo = true;
                        }
                        break;
                    }
                }
            }
        }
        return isdo;
    },
    // 向右
    doRight:function(){
        var isdo = false;
        for (var y = 0; y < 4; ++y){
            for (var x = 3; x >= 0; --x){
                for (var x1 = x - 1; x1 >= 0; --x1){
                    if (this.cardArr[x1][y].getNumber() > 0){
                        if (this.cardArr[x][y].getNumber() <= 0){
                            this.cardArr[x][y].setNumber(this.cardArr[x1][y].getNumber());
                            this.cardArr[x1][y].setNumber(0);
                            ++x;
                            isdo = true;
                        }else if(this.cardArr[x][y].getNumber() == this.cardArr[x1][y].getNumber()){
                            this.cardArr[x][y].setNumber(this.cardArr[x][y].getNumber()*2);
                            this.cardArr[x1][y].setNumber(0);
                            this.score += this.cardArr[x][y].getNumber();  //增加分数
                            isdo = true;
                        }
                        break;
                    }
                }
            }
        }
        return isdo;
    },
    shouldCreateCardNumber:function(){// 判断是否需要自动生成新的卡片
        var should = false;
        for(var i=0; i<4; ++i){
            for(var j=0; j<4; ++j){
                if (this.cardArr[i][j].getNumber() == 0){
                    should = true;
                    break;
                }
            }
        }
        return should;
    },
    // 判断游戏是否结束*******************************
    doCheckGameOver:function(){
        var size = cc.director.getWinSize();

        var isGameOver = true;
        for(var y=0; y<4; ++y){
            for(var x=0; x<4; ++x){
                if(this.cardArr[x][y].getNumber() == 0 ||
                    (x>0&&(this.cardArr[x][y].getNumber() == this.cardArr[x-1][y].getNumber())) ||
                    (x<3&&(this.cardArr[x][y].getNumber() == this.cardArr[x+1][y].getNumber())) ||
                    (y>0&&(this.cardArr[x][y].getNumber() == this.cardArr[x][y-1].getNumber())) ||
                    (y<3&&(this.cardArr[x][y].getNumber() == this.cardArr[x][y+1].getNumber())))
                {
                    isGameOver = false;
                }
            }
        }

        if(isGameOver){//游戏结束
            this.gameOverLayer = new cc.LayerColor(new cc.color(0,0,0,100), null, null);
            var labelGameOver = new cc.LabelTTF("Game Over!!!", "Arial", 60);
            labelGameOver.setPosition(size.width/2, size.height/2);
            this.gameOverLayer.addChild(labelGameOver);
            this.getParent().addChild(this.gameOverLayer, 1);

            this.scheduleOnce(this.removeGameOverLayer, 2);
        }else{
            if (this.shouldCreateCardNumber()){
                this.autoCreateCardNumber();
            }
        }

        if(this.isWin()){// if win
            this.gameWinLayer = new cc.LayerColor(new cc.color(0,0,0,100), null, null);
            var labelGameWin = new cc.LabelTTF("You Win!!!", "Arial", 60);
            labelGameWin.setPosition(size.width/2, size.height/2 + 30);
            var text = new cc.LabelTTF("Your Score : ", "Arial", 30);
            text.setPosition(size.width/2 - 50, size.height/2 - 30);
            var labelScore = new cc.LabelTTF(this.score, "Arial", 30);
            labelScore.setPosition(size.width/2 + 75, size.height/2 - 30);
            this.gameWinLayer.addChild(labelGameWin);
            this.gameWinLayer.addChild(text);
            this.gameWinLayer.addChild(labelScore);
            this.getParent().addChild(this.gameWinLayer, 1);

            this.scheduleOnce(this.removeGameWinLayer, 4);
        }
    },
    // 判断是否胜利
    isWin:function(){
        var Win = false;
        for (var i=0; i<4; ++i){
            for(var j=0; j<4; ++j){
                if (this.cardArr[i][j].getNumber() == 2048){
                    Win = true;
                    break;
                }
            }
        }
        return Win;
    },
    // 更新分数
    setScore:function(s){
        this.scoreLabel.setString(s);
    },
    // 移除GameOverLayer
    removeGameOverLayer:function(dt){
        this.gameOverLayer.removeFromParent();
        cc.director.replaceScene(cc.TransitionFade.create(1, new HelloWorldScene()));
    },
    // 移除GameWinLayer
    removeGameWinLayer:function(dt){
        this.gameWinLayer.removeFromParent();
        cc.director.replaceScene(cc.TransitionFade.create(1, new HelloWorldScene()));
    }
});
var gameScene = cc.Scene.extend({
    ctor:function(){
        this._super();

        var layer = new gameLayer();
        this.addChild(layer);
        layer.x = size.width/2;
        layer.y = size.height/2;
    }
});


/*==================================================*/
var CardSprite = cc.Layer.extend({
    number:0,
    labelCardNumber:null,
    cardColorBG:null,
    ctor:function(){
        this._super();
    },
    initCard:function(num, width, height, positionX, positionY){
        this.number = num;

        this.cardColorBG = new cc.LayerColor(new cc.color(200, 190, 180, 255), width-15, height-15);
        this.cardColorBG.setPosition(positionX, positionY);

        if(this.number > 0){
            this.labelCardNumber = new cc.LabelTTF(this.number,"Arial", 60);
            this.labelCardNumber.setPosition(this.cardColorBG.getContentSize().width/2, this.cardColorBG.getContentSize().height/2);
            this.labelCardNumber.setTag(8);
            this.cardColorBG.addChild(this.labelCardNumber);
        }else{
            this.labelCardNumber = new cc.LabelTTF(" ","Arial", 60);
            this.labelCardNumber.setPosition(this.cardColorBG.getContentSize().width/2, this.cardColorBG.getContentSize().height/2);
            this.labelCardNumber.setTag(8);
            this.cardColorBG.addChild(this.labelCardNumber);
        }
        this.addChild(this.cardColorBG);
    },
    getNumber:function(){
        return this.number;
    },
    setNumber:function(num){
        this.number = num;
        if(this.number > 0){
            this.labelCardNumber.setString(this.number);
        }else{
            this.labelCardNumber.setString("");
        }
        // 设置数字大小
        if(num >= 0){
            this.labelCardNumber.setFontSize(60);
        }
        if(num >= 16){
            this.labelCardNumber.setFontSize(55);
        }
        if(num >= 128){
            this.labelCardNumber.setFontSize(40);
        }
        if(num >= 1024){
            this.labelCardNumber.setFontSize(30)
        }
        //判断数字的大小来调整颜色
        if(this.number == 0){
            this.cardColorBG.setColor(new cc.color(200,190,180));
        }
        if (this.number == 2) {
            this.cardColorBG.setColor(new cc.color(240,230,220));
        }
        if (this.number == 4) {
            this.cardColorBG.setColor(new cc.color(240,220,200));
        }
        if (this.number == 8) {
            this.cardColorBG.setColor(new cc.color(240,180,120));
        }
        if (this.number == 16) {
            this.cardColorBG.setColor(new cc.color(240,140,90));
        }
        if (this.number == 32) {
            this.cardColorBG.setColor(new cc.color(240,120,90));
        }
        if (this.number == 64) {
            this.cardColorBG.setColor(new cc.color(240,90,60));
        }
        if (this.number == 128) {
            this.cardColorBG.setColor(new cc.color(240,90,60));
        }
        if (this.number == 256) {
            this.cardColorBG.setColor(new cc.color(240,200,70));
        }
        if (this.number == 512) {
            this.cardColorBG.setColor(new cc.color(240,200,70));
        }
        if (this.number == 1024) {
            this.cardColorBG.setColor(new cc.color(0,130,0));
        }
        if (this.number == 2048) {
            this.cardColorBG.setColor(new cc.color(0,130,0));
        }
    }
});

// 静态函数
CardSprite.createCardSprite = function(num, width, height, positionX, positionY)
{
    var card = new CardSprite();
    if(card){
        card.initCard(num, width, height, positionX, positionY);
        return card;
    }
    return null;
}