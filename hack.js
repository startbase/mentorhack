const fs = require('fs');
const cv = require('opencv4nodejs');
const uuidv1 = require('uuid/v1');
const emo = require('./emo');

"use strict";

const drawRect = (image, rect, color, opts = { thickness: 2 }) =>
    image.drawRectangle(
        rect,
        color,
        opts.thickness,
        cv.LINE_8
    );
const drawBlueRect = (image, rect, opts = { thickness: 2 }) =>
    drawRect(image, rect, new cv.Vec(255, 0, 0), opts);

let save = true;
setInterval(() => save = true, 5000);


let number = 0;
let requests = [];
let runVideoFaceDetection = (src, detectFaces) => grabFrames(src, 1, (frame) => {
    console.time('detection time');
    const frameResized = frame.resizeToMax(800);

    // detect faces
    const faceRects = detectFaces(frameResized);
    if (faceRects.length) {
        faceRects.forEach(faceRect => {
            if(save) {
                filename = 'samples/' + uuidv1() + '.png';
                requests.push({file: filename, response: null});
                cv.imwrite('./' + filename, frameResized.getRegion(faceRect));
                save = false;
                emo.go(filename, number++, (num, object) => {
                    let res_items = [];
                    object.forEach(item => {
                        res_items.push(item.scores);
                    });
                    fs.writeFile('./emotions/' + res_i + '.json', JSON.stringify(res_items), (err, res) => {
                        console.log('ok');
                    });
                });
            }
        });
    }

    cv.imshow('face detection', frameResized);
    console.timeEnd('detection time');
});


let grabFrames = (videoFile, delay, onFrame) => {
    const cap = new cv.VideoCapture(videoFile);
    let done = false;
    const intvl = setInterval(() => {
        let frame = cap.read();
        if (frame.empty) {
            cap.reset();
            frame = cap.read();
        }
        onFrame(frame);

        const key = cv.waitKey(delay);
        done = key !== -1 && key !== 255;
        if (done) {
            clearInterval(intvl);
            console.log('Key pressed, exiting.');
        }
    }, 0);
};


const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);

const webcamPort = 0;

function detectFaces(img) {
    const options = {
        minSize: new cv.Size(100, 100),
        scaleFactor: 1.2,
        minNeighbors: 10
    };
    return classifier.detectMultiScale(img.bgrToGray(), options).objects;
}
runVideoFaceDetection(webcamPort, detectFaces);
