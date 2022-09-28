const context = new AudioContext();
let oscillator = null;
let gain = null;

function playNote(frequency, type) {
    oscillator = context.createOscillator();
    gain = context.createGain();
    oscillator.type = type;
    oscillator.connect(gain);
    oscillator.frequency.value = frequency;
    gain.connect(context.destination);
    oscillator.start(0);
    gain.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 1);
}



export {playNote}