object = [];
video = "";
Status = "";

function preload() {
    video = createVideo('video.mp4');
    video.hide();
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw() {
   image(video, 0, 0, 480, 380) ;
       if(Status != "")
       {
           objectDetector.detect(video, gotResult);
           for (i = 0; i < object.length; i++) {
               document.getElementById("Status").innerHTML = "Status : objects Detected";
               document.getElementById("number_of_objects").innerHTML = "number of objects detected are : "+ object.length;

               fill("#FF0000");
               percent = floor(object[i].confidence * 100);
               text(object[i].label + " " + percent + "%", object[i].x, object[i].y);
               noFill();
               stroke("#FF0000");
               rect(object[i].x, object[i].y, object[i].width, object[i].height);

           }
       }
}

function gotResult (error, results){
    if (error) {
        console.log(error);
    }
    console.log(results)
    object = results;
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("Status").innerHTML = " Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded!");
    Status = true;
    video.loop();
    video.speed(1);
    video.volume(1);
}