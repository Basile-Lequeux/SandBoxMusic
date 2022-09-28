let isPlaying = false;


function clickButtonPlay() {
    const buttonPlay = document.getElementById("button_play");
    if (buttonPlay.textContent === "PLAY") {
        buttonPlay.textContent = "STOP";
        isPlaying = true;
        start(true)
        return
    }
    if (buttonPlay.textContent === "STOP") {
        buttonPlay.textContent = "PLAY";
        isPlaying = false;
        stop()
    }
}

let intervalId = null;
let counter = 0;

const start = (firstTime = false) => {
    clearInterval(intervalId)
    if (isPlaying){
        if (firstTime){
            playMusic()
        }
        const bpm = document.getElementById("bpm").value;
        const delay = 60000 / bpm;
       intervalId = setInterval(playMusic, delay);
    }

}

const stop = () => {
    clearInterval(intervalId)
    for (let i = 1; i < 5; i++) {
        colorize(i, false)
    }
    counter = 0;
}

function playMusic() {
    if (counter === 4) {
        colorize(4, false)
        counter = 0;
    }
    counter++;
    console.log(counter)
    colorize(counter, true)
    if (counter > 1) {
        colorize(counter - 1, false)
    }
}


const colorize = (i, color) => {
    const actualGrid = document.getElementById("grid" + i)
    if (!color) {
        actualGrid.className = "grid-item";
    } else {
        playNote(293.7, 'triangle')
        actualGrid.className = "cursor_on"
    }
}

const context = new AudioContext();
var o = null;
var g = null;

function playNote(frequency, type) {
    o = context.createOscillator();
    g = context.createGain();
    o.type = type;
    o.connect(g);
    o.frequency.value = frequency;
    g.connect(context.destination);
    o.start(0);
    g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 1);
}