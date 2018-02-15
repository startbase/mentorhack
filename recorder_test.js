"use strict";

const fs = require('fs');
const AudioRecorder = require('node-audiorecorder');

let audioRecorder = new AudioRecorder(null, console);
let file = fs.createWriteStream('./recording.wav', {encoding: 'binary'});

audioRecorder.start().stream().pipe(file);

setTimeout(() => {
    audioRecorder.stop();
}, 10000);
