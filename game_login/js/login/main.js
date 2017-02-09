var isMobile;

window.onload = function() {
    cc.game.onStart = function() {
        if(!cc.sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
            document.body.removeChild(document.getElementById("cocosLoading"));

        // Pass true to enable retina display, disabled by default to improve performance
        cc.view.enableRetina(false);
        // Adjust viewport meta
        cc.view.adjustViewPort(true);
        // Setup the resolution policy and design resolution size
        isMobile = cc.sys.capabilities.hasOwnProperty('touches');
        if (isMobile) {
            document.body.classList.add('mobile');
        }
        var resFactor = isMobile ? 50 : 80;
        cc.view.setDesignResolutionSize(resFactor*16, resFactor*9, cc.ResolutionPolicy.SHOW_ALL);
        // The game will be resized when browser size change
        cc.view.resizeWithBrowserSize(true);
        //load resources
        cc.LoaderScene.preload(g_resources, function() {
            cc.director.runScene(new MenuScene());
        }, this);
    };
    cc.game.run();
};
