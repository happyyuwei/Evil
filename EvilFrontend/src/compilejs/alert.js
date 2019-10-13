function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AlertFrame =

/**
 *
 * @param alertInfo
 */
function AlertFrame(alertInfo) {
    var _this = this;

    _classCallCheck(this, AlertFrame);

    //html frame
    this.html = React.createElement(
        "div",
        { id: "alert-frame" },
        React.createElement("div", { id: "alert-background" }),
        React.createElement(
            "div",
            { id: "alert-front" },
            React.createElement(
                "div",
                { id: "alert-info" },
                alertInfo
            ),
            React.createElement(
                "div",
                { id: "alert-button-container" },
                React.createElement(
                    "button",
                    { className: "alert-button", id: "continue-button" },
                    "\u7EE7\u7EED"
                )
            )
        )
    );

    /**
     * render the page
     */
    this.render = function () {
        ReactDOM.render(_this.html, document.querySelector("#foreground"));
    };
    this.remove = function () {
        ReactDOM.render(React.createElement("div", null), document.querySelector("#foreground"));
    };
    /**
     *
     * @param continueFunction
     */
    this.addContinueListener = function (continueFunction) {
        document.querySelector("#continue-button").addEventListener("click", continueFunction, false);
    };
};