(() => {
    //add click listener to start game
    let start_game = document.querySelector("#start-game");
    start_game.addEventListener("click", () => {
        //create bootstrap
        let bootstrap = new Bootstrap();
        //start game
        bootstrap.start();
    });
})();

/**
 * this class for bootstrap instance to start a full screen game
 * @since 2019.10.5
 * @author yuwei
 */
class Bootstrap {
    /**
     * constructor function
     */
    constructor() {
        /**
         * start game logic
         */
        this.start = () => {
            //create audio management
            let audioManager = new AudioManager();
            audioManager.loadOpeningMusic();
            //launch full screen
            let screenTool = new ScreenTool();
            screenTool.launchFullscreen();
            //listen screen
            screenTool.listenFullScreen(() => {
                //back to screen
                audioManager.continueBackgroundMusic();
            }, () => {
                //out of screen
                audioManager.parseBackgroundMusic();
            });
            //logo frame start
            let logoFrame = new LogoFrame();
            logoFrame.render();
            //the logo page will show 5 seconds
            setTimeout(()=>{
                let loadingFrame=new LoadingFrame();
                loadingFrame.render();
            },5000);
        }
    }
}

/**
 * screen tool class
 */
class ScreenTool {

    constructor() {

        //full screen current State
        this.currentState = false;

        /**
         * start fullscreen.
         */
        this.launchFullscreen = () => {

            let element = document.documentElement;
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
        this.exitFullscreen = () => {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                this.currentState = false;
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
                this.currentState = false;
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
                this.currentState = false;
            }
        };
        /**
         * listen screen state
         */
        this.listenFullScreen = (launchListener, exitListener) => {
            //info
            let alertInfo = "游戏需要在全屏模式下进行，检测到你退出全屏模式，是否返回全屏继续游戏？";
            //full screen change function
            let fullscreenChangeListener = () => {
                //change state
                this.currentState = !this.currentState;
                //if exit fullscreen
                if (!this.currentState) {
                    //appear alert
                    let alertFrame = new AlertFrame(alertInfo);
                    alertFrame.render();
                    //add click listener
                    alertFrame.addContinueListener(() => {
                        alertFrame.remove();
                        this.launchFullscreen();
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
    }
}

/**
 * The Logo Page is in a class.
 * The first page contains logo.
 * @since 2019.10.6
 * @author yuwei
 */
class LogoFrame {

    /**
     * constructor, two elements are necessary, html template and the parent node to render.
     */
    constructor() {

        //page  html
        this.html = <div id="logo-page">
            <div id="main-logo">
            </div>
            <div id={"sub-logo-container"}>
                <div id="js-logo">
                </div>
                <div id="opengl-logo">
                </div>
                <div id="blender-logo">
                </div>
                <div id="react-logo">
                </div>
            </div>
        </div>;

        //parent node
        this.rootElement = document.querySelector("#background");

        //render the html
        this.render = () => {
            ReactDOM.render(this.html, this.rootElement);
        }
    }
}

/**
 * loading frame
 * The second page contains for loading resource.
 */
class LoadingFrame{

    constructor(){

        this.html=<div id="loading-page">
            <div id="loading-display-container">
            </div>
            <div id="loading-progress-container">
                <div id="loading-txt">正在加载资源...</div>
            </div>
        </div>;

        this.render=()=>{
            ReactDOM.render(this.html,document.querySelector("#background"));
        }
    }
}