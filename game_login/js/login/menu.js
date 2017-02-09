var BackgroundLayer = cc.LayerColor.extend({
    ctor: function(aColor) {
        this._super();

        this.setColor(aColor);

        var size = cc.winSize;

        var background_menu_mine = new cc.Sprite(images.background_menu_mine);
        background_menu_mine.setAnchorPoint(cc.p(0.5, 0.5));
        background_menu_mine.setPosition(cc.p(size.width/2, size.height/2));
        this.addChild(background_menu_mine, 0);

        if (isMobile) {
            background_menu_mine.setScale(5/8);
        }
        var infinite_rotate = new cc.RepeatForever(cc.RotateBy.create(60, 360));
        background_menu_mine.runAction(infinite_rotate);

        helper.addUITextToLayer(this, 'Game Title',        size.height*0.25, size.height*0.8);

        helper.addUITextToLayer(this, '2016 © login', size.height*0.03, size.height*0.02);

        helper.setSoundsStateAndAddButtonsToLayer(this);

        return true;
    }
});

var LoginLayer = cc.Layer.extend({
    _login: '',
    _password: '',
    _errorUIText: null,

    SHOW_HIDE_ACTION: new cc.Sequence(new cc.FadeIn(1), new cc.FadeOut(1)),

    ctor: function() {
        this._super();

        cc.audioEngine.stopAllEffects();
        cc.audioEngine.stopMusic();

        var size = cc.winSize;

        var loginLayerEditBoxDelegate = new cc.EditBoxDelegate();
        loginLayerEditBoxDelegate.editBoxTextChanged = function() {
            this._login = loginEditBox.string;
            this._password = passwordEditBox.string;
            if (this._login && this._password) {
                if (!enterButton.enabled) {
                    enterButton.setEnabled(true);
                }
            } else {
                if (enterButton.enabled) {
                    enterButton.setEnabled(false);
                }
            }
        }.bind(this);
        loginLayerEditBoxDelegate.editBoxReturn = function() {
            if (this._login && this._password) {
                this._doLogin();
            }
        }.bind(this);

        helper.addUITextToLayer(this, '账号:',  size.height*0.06, size.height*0.65);

        var loginEditBox = helper.addEditBoxFixedToLayer(this, size.width*0.3, cc.p(size.width*0.5, size.height*0.57), loginLayerEditBoxDelegate);
        loginEditBox.placeHolder = '';

        helper.addUITextToLayer(this, '密码:', size.height*0.06, size.height*0.45);

        var passwordEditBox = helper.addEditBoxFixedToLayer(this, size.width*0.3, cc.p(size.width*0.5, size.height*0.37), loginLayerEditBoxDelegate);
        passwordEditBox.placeHolder = '';
        passwordEditBox.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
        

        var enterButton = helper.addButton({
            layer: this,
            string: '登录',
            y: size.height*0.25,
            preferredSize: cc.size(size.width*0.3, size.height*0.13),
            disabled: true,
            callback: this._doLogin.bind(this)
        });

        this._errorUIText = helper.addUITextToLayer(this, '',  size.height*0.06, size.height*0.1);
        this._errorUIText.setColor(cc.color(225, 0, 0));
        this._errorUIText.setOpacity(0);

        // cc.audioEngine.playEffect(sounds.login_page);

        if (!cc.audioEngine.isMusicPlaying()) {
            cc.audioEngine.playMusic(musics.menu, true);
        }

        return true;
    },

    _doLogin: function() {
        var responseRaw = server.processAction({
            action: 'login',
            login: this._login,
            password: this._password
        });
        var response = JSON.parse(responseRaw);
        if (response.status === 'error') {
            this._showError(response.error);
        } else if (response.status === 'OK') {
            for (var key in response.player) {
                sessionStorage[key] = response.player[key];
            }
            //TODO 跳转进入菜单页。
            // this.parent.addChild(new MenuLayer());
            // this.removeFromParent();
            alert("TODO")
        }
    },

    _showError: function(aErrorText) {
        this._errorUIText.string = aErrorText;
        this._errorUIText.stopAllActions();
        this._errorUIText.runAction(this.SHOW_HIDE_ACTION);
    }
});

var MenuScene = cc.Scene.extend({
    onEnter: function() {
        this._super();

        var layer, isLoggedIn = sessionStorage.login && sessionStorage.password;

        layer = new BackgroundLayer(cc.color(32, 32, 32));
        helper.AddTryCatchersToAllMethodsOf(layer);
        this.addChild(layer);

        // layer = !isLoggedIn ? new LoginLayer() : new MenuLayer();
        layer = !isLoggedIn ? new LoginLayer() : new LoginLayer();
        helper.AddTryCatchersToAllMethodsOf(layer);
        this.addChild(layer);
    }
});
