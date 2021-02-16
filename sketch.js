// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Real time Object Detection using YOLO
=== */

let yolo;
let status;
let objects = [];
let video;
let canvas, ctx;
const width = 600;
const height = 800;

function setup() {
  createCanvas(width, height);
  frameRate(20);
  video =  createCapture({
    audio: false,
    video: {
      facingMode: {
        exact: "environment"
      }
    }
  });
  yolo = ml5.YOLO(video, modelLoaded);
  video.hide();
}

function draw() {
  image(video, 0, 0, width, height);
  for (let i = 0; i < objects.length; i++) {
    noStroke();
    fill(255, 255, 0);
    textSize(20);
    text(objects[i].label + " " + nfc(objects[i].confidence * 100.0, 2) + "%", objects[i].x * width, objects[i].y * height - 5);
    noFill();
    strokeWeight(4);
    stroke(255, 255, 0);
    rect(objects[i].x * width, objects[i].y * height, objects[i].w * width, objects[i].h * height);
  }
}

function modelLoaded() {
  console.log("The Model Is Ready");
  yolo.detect(video, gotResult);
}

function gotResult(err, results){
  objects = results;
  yolo.detect(video, gotResult);
}

