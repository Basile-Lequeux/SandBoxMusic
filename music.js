function clickButtonPlay() {
    const buttonPlay = document.getElementById("button_play");
    if (buttonPlay.textContent === "PLAY") {
        buttonPlay.textContent = "STOP";
        start()
        return
    }
    if (buttonPlay.textContent === "STOP") {
        buttonPlay.textContent = "PLAY";
        stop()
    }
}

let intervalId = null;
let counter = 0;

const start = () => {
    playMusic()
    intervalId = setInterval(playMusic, 1000)

}
const stop = () => {
    clearInterval(intervalId)
    const previousGrid = document.getElementById("grid" + counter)
    previousGrid.className = "grid-item"
    counter = 0;
}

function playMusic() {
    if (counter === 4) {
        colorize(4, false)
        counter = 0;
    }
    counter++;
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