let board;

// a variable to store the bodyPose model
let bodyPose;

// We create a waraible to store the webcam data
let video;

//A variable to store the detected poses
let poses = [];

let rgb;

async function setup() {
    createCanvas(700, 500);
    board = createBoard();
    createConnectButton(board);

    rgb = new five.Led.RGB([6, 5, 3]);  // [red, green, blue] pins

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
   if(poses.length > 2){

    let pn0 = poses[0].nose.y;   // nose coordinates

    let pn1 = poses[1].nose.y;   // nose coordinates

    let pn2 = poses[2].nose.y;   // nose coordinates


    let r = map(pn0, 0, 500, 255, 0);
    let g = map(pn1, 0, 500, 255, 0);
    let b = map(pn2, 0, 500, 255, 0);

    rgb.color([r,g,b]);

 }


}
    