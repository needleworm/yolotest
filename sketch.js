let yolo;
let video;
let detectedItems = [];

function setup() {
  createCanvas(400, 300);
  frameRate(20);
  video = createCapture(VIDEO);
  yolo = ml5.YOLO(video, modelLoaded);
  video.hide();
}

function draw() {
  image(video, 0, 0, width, height);
  for (let i = 0; i < detectedItems.length; i++) {
    noStroke();
    fill(255, 255, 0);
    textSize(20);
    text(detectedItems[i].label + " " + nfc(detectedItems[i].confidence * 100.0, 2) + "%", detectedItems[i].x * width, detectedItems[i].y * height - 5);
    noFill();
    strokeWeight(4);
    stroke(255, 255, 0);
    rect(detectedItems[i].x * width, detectedItems[i].y * height, detectedItems[i].w * width, detectedItems[i].h * height);
  }
}

function modelLoaded() {
  console.log("The Model Is Ready");
  yolo.detect(video, gotResult);
}

function gotResult(err, results){
  detectedItems = results;
  yolo.detect(video, gotResult);
}

