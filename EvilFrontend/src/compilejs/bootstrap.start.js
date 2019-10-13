function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
    //add click listener to start game
    var start_game = document.querySelector("#start-game");
    start_game.addEventListener("click", function () {
        //create bootstrap
        var bootstrap = new Bootstrap();
        //start game
        bootstrap.start();
    });
})();

/**
 * this class for bootstrap instance to start a full screen game
 * @since 2019.10.5
 * @author yuwei
 */

var Bootstrap =
/**
 * constructor function
 */
function Bootstrap() {
    _classCallCheck(this, Bootstrap);

    /**
     * start game logic
     */
    this.start = function () {
        //create audio management
        var audioManager = new AudioManager();
        audioManager.loadOpeningMusic();
        //launch full screen
        var screenTool = new ScreenTool();
        screenTool.launchFullscreen();
        //listen screen
        screenTool.listenFullScreen(function () {
            audioManager.continueBackgroundMusic();
        }, function () {
            audioManager.parseBackgroundMusic();
        });
        //logo frame start
        var logoFrame = new LogoFrame();
        logoFrame.render();
        //the logo page will show 5 seconds
        setTimeout(function () {
            var loadingFrame = new LoadingFrame();
            loadingFrame.render();
        }, 5000);
    };
};

/**
 * screen tool class
 */


var ScreenTool = function ScreenTool() {
    var _this = this;

    _classCallCheck(this, ScreenTool);

    //full screen current State
    this.currentState = false;

    /**
     * start fullscreen.
     */
    this.launchFullscreen = function () {

        var element = document.documentElement;
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    };

    /**
     * exit fullscreen.
     */
    this.exitFullscreen = function () {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            _this.currentState = false;
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
            _this.currentState = false;
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
            _this.currentState = false;
        }
    };
    /**
     * listen screen state
     */
    this.listenFullScreen = function (launchListener, exitListener) {
        //info
        var alertInfo = "游戏需要在全屏模式下进行，检测到你退出全屏模式，是否返回全屏继续游戏？";
        //full screen change function
        var fullscreenChangeListener = function fullscreenChangeListener() {
            //change state
            _this.currentState = !_this.currentState;
            //if exit fullscreen
            if (!_this.currentState) {
                //appear alert
                var alertFrame = new AlertFrame(alertInfo);
                alertFrame.render();
                //add click listener
                alertFrame.addContinueListener(function () {
                    alertFrame.remove();
                    _this.launchFullscreen();
                });
                //do exit function
                if (exitListener !== undefined) {
                    exitListener();
                }
            }
            //do launch fullscreen function
            else {
                    if (launchListener !== undefined) {
                        launchListener();
                    }
                }
        };
        //normal browser
        document.addEventListener("fullscreenchange", fullscreenChangeListener, false);
        //webkit core browser
        document.addEventListener("webkitfullscreenchange", fullscreenChangeListener, false);
        //browser blur event, this is more for mobile browser to click home button
        window.addEventListener("focus", exitListener, false);
        //no focus event, when blur, the full screen will exit, only back to full screen, the launch listener will be invoked
    };
};

/**
 * The Logo Page is in a class.
 * The first page contains logo.
 * @since 2019.10.6
 * @author yuwei
 */


var LogoFrame =

/**
 * constructor, two elements are necessary, html template and the parent node to render.
 */
function LogoFrame() {
    var _this2 = this;

    _classCallCheck(this, LogoFrame);

    //page  html
    this.html = React.createElement(
        "div",
        { id: "logo-page" },
        React.createElement("div", { id: "main-logo" }),
        React.createElement(
            "div",
            { id: "sub-logo-container" },
            React.createElement("div", { id: "js-logo" }),
            React.createElement("div", { id: "opengl-logo" }),
            React.createElement("div", { id: "blender-logo" }),
            React.createElement("div", { id: "react-logo" })
        )
    );

    //parent node
    this.rootElement = document.querySelector("#background");

    //render the html
    this.render = function () {
        ReactDOM.render(_this2.html, _this2.rootElement);
    };
};

/**
 * loading frame
 * The second page contains for loading resource.
 */


var LoadingFrame = function LoadingFrame() {
    var _this3 = this;

    _classCallCheck(this, LoadingFrame);

    this.html = React.createElement(
        "div",
        { id: "loading-page" },
        React.createElement("div", { id: "loading-display-container" }),
        React.createElement(
            "div",
            { id: "loading-progress-container" },
            React.createElement(
                "div",
                { id: "loading-txt" },
                "\u6B63\u5728\u52A0\u8F7D\u8D44\u6E90..."
            )
        )
    );

    this.render = function () {
        ReactDOM.render(_this3.html, document.querySelector("#background"));
    };
};