import {playNote} from "./music.js";

let isPlaying = false;
let intervalId = null;
let counter = 0;

const trackArray = [false, false, false, false]

document.getElementById("button_play").onclick = () => clickButtonPlay();
document.getElementById("grid0").onclick = () => setTrack(0);
document.getElementById("grid1").onclick = () => setTrack(1);
document.getElementById("grid2").onclick = () => setTrack(2);
document.getElementById("grid3").onclick = () => setTrack(3);
document.getElementById("bpm").onchange = () => start();


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

const start = () => {
    clearInterval(intervalId)
    if (isPlaying) {
        const bpm = document.getElementById("bpm").value;
        const delay = 60000 / bpm;
        intervalId = setInterval(playMusic, delay);
    }

}

const stop = () => {
    clearInterval(intervalId)
    for (let i = 0; i < 4; i++) {
        colorize(i, false)
    }
    counter = 0;
}

function playMusic() {
    if (counter > 3) {
        colorize(3, false)
        counter = 0;
    }

    colorize(counter, true)
    if (counter > 0) {
        colorize(counter - 1, false)
    }
    counter++;
}


const colorize = (i, color) => {
    const actualGrid = document.getElementById("grid" + i)
    if (!color) {
        actualGrid.className = "grid-item";
    } else {
        if (trackArray[i]){
            playNote(293.7, 'triangle')
        }
        actualGrid.className = "cursor_on"
    }
}


const setTrack = (i) => {
    const actualGrid = document.getElementById("grid" + i)
    actualGrid.textContent = trackArray[i] ? "" : "♩";

    trackArray[i] = !trackArray[i];
}
