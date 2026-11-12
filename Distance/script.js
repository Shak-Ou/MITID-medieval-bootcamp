let board;

// a variable to store the bodyPose model
let bodyPose;

// We create a waraible to store the webcam data
let video;

//A variable to store the detected poses
let poses = [];

let led;

async function setup() {
    createCanvas(700, 500);
    board = createBoard();
    createConnectButton(board);

    led = new five.Led(3);

    video = createCapture(VIDEO);     // We open the webcam
    video.size(700, 500);
    video.hide();

    // In order to be able to use the await function, you need to put "async (for asynchronus)" before function

    bodyPose = await ml5.bodyPose();
    bodyPose.detectStart(video, function(results){
        poses = results;
    
    })

}

function draw() {
   image(video, 0, 0);
    // make sure at least one person is detected 
   if(poses.length > 0){

    let rw = poses[0].right_wrist;   // wrists coordinates
    let lw = poses[0].left_wrist;  // wrists coordinates

    let distance = parseInt(dist(rw.x, rw.y, lw.x, lw.y));  // compute distance

    text(distance, 10, 10);     // debug distance

    let bri = map(distance, 30, 500, 0, 255);    // Two First numbers = range brackets, two last = the brightness

    led.brightness(bri);

 }


}
    