class AlertFrame {

    /**
     *
     * @param alertInfo
     */
    constructor(alertInfo) {
        //html frame
        this.html = <div id="alert-frame">
            <div id="alert-background">
            </div>
            <div id="alert-front">
                <div id="alert-info">{alertInfo}</div>
                <div id="alert-button-container">
                    <button className="alert-button" id="continue-button">继续</button>
                </div>
            </div>
        </div>;

        /**
         * render the page
         */
        this.render = () => {
            ReactDOM.render(this.html, document.querySelector("#foreground"));
        };
        this.remove = () => {
            ReactDOM.render(<div></div>, document.querySelector("#foreground"));
        };
        /**
         *
         * @param continueFunction
         */
        this.addContinueListener = (continueFunction) => {
            document.querySelector("#continue-button").addEventListener("click", continueFunction, false);
        };
    }

}