function play() {
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
        colorize(counter -1, false)
    }
}



const colorize = (i, color) => {
    const actualGrid = document.getElementById("grid" + i)
    if (!color){
        actualGrid.className = "grid-item";
    }
    else {
        actualGrid.className = "cursor_on"
    }
}