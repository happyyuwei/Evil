class AudioManager {
    constructor() {
        //some definition
        this.OPENING = "opening";

        //the map to save all the audio resources before begin the game
        this.audioMap = new Map();

        //current background music name
        this.currentBackgroundMusic = undefined;

        /**
         * this is for loading opening music only
         */
        this.loadOpeningMusic = (then) => {
            let openingAudio = new Audio();
            openingAudio.src = "drawable/music/opening.mp3";
            //when loaded, then start play
            openingAudio.onloadedmetadata = () => {
                //start playing music
                openingAudio.play();
                //loop play
                openingAudio.loop = true;
                //set opening music as current music, the setting will be done after opening
                this.setBackgroundMusic(this.OPENING);
                //save in map
                this.audioMap.set(this.OPENING, openingAudio);
                //then
                then();
            }
        };
        /**
         *
         * @param musicName
         */
        this.setBackgroundMusic = (musicName) => {
            this.currentBackgroundMusic = musicName;
        };
        /**
         *
         */
        this.parseBackgroundMusic = () => {
            //pause
            if (this.currentBackgroundMusic !== undefined) {
                this.audioMap.get(this.currentBackgroundMusic).pause();
            }
        };
        /**
         *
         */
        this.continueBackgroundMusic = () => {
            //continue
            if (this.currentBackgroundMusic !== undefined) {
                this.audioMap.get(this.currentBackgroundMusic).play();
            }
        }
    }
}