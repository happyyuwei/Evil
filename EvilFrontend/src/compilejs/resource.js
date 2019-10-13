function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AudioManager = function AudioManager() {
    var _this = this;

    _classCallCheck(this, AudioManager);

    //some definition
    this.OPENING = "opening";

    //the map to save all the audio resources before begin the game
    this.audioMap = new Map();

    //current background music name
    this.currentBackgroundMusic = undefined;

    /**
     * this is for loading opening music only
     */
    this.loadOpeningMusic = function () {
        var openingAudio = new Audio();
        openingAudio.src = "drawable/music/opening.mp3";
        //when loaded, then start play
        openingAudio.onloadedmetadata = function () {
            //start playing music
            openingAudio.play();
            //loop play
            openingAudio.loop = true;
            //set opening music as current music
            _this.setBackgroundMusic(_this.OPENING);
            //save in map
            _this.audioMap.set(_this.OPENING, openingAudio);
        };
    };
    /**
     *
     * @param musicName
     */
    this.setBackgroundMusic = function (musicName) {
        _this.currentBackgroundMusic = musicName;
    };
    /**
     *
     */
    this.parseBackgroundMusic = function () {
        //pause
        _this.audioMap.get(_this.currentBackgroundMusic).pause();
    };
    /**
     *
     */
    this.continueBackgroundMusic = function () {
        //continue
        _this.audioMap.get(_this.currentBackgroundMusic).play();
    };
};