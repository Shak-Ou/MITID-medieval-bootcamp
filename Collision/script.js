let board;

let led;

// a variable to store the bodyPose model
let bodyPose;

// We create a waraible to store the webcam data
let video;

//A variable to store the detected poses
let poses = [];

// Our target
let target = {
    x: 300, 
    y: 200,
    d: 50
}


target.x

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
    
    let distance = dist(rw.x, rw.y, target.x, target.y);

    let isColliding = distance < target.d;

    textSize(40);
    text(isColliding, 20, 60);

    if(isColliding){
        fill("#FF0000");
    }else{
        fill("#00FF00");
    }
    
    // display the target
    circle(target.x, target.y, target.d);



 }


}
    