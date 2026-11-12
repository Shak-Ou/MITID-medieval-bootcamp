let board;
let led; 

// a variable to store the bodyPose model
let bodyPose; 
// we create a variable to store the webcam data
let video;
// a variable to store the detected poses
let poses = [];

async function setup() {
    createCanvas(700, 500);
    board = createBoard();
    createConnectButton(board);

    led = new five.Led(3);

    video = createCapture(VIDEO);       // we open the webcam
    video.size(700, 500);
    video.hide();

    bodyPose = await ml5.bodyPose();
    // start the detection
    bodyPose.detectStart(video, function(results){
        poses = results;
    })

}

function draw() {
    image(video, 0, 0);

    // make sure at least one person is detected
    if(poses.length > 0){
        let rw = poses[0].right_wrist;  // right wrist coordinates
        let lw = poses[0].left_wrist;   // same for left

        let distance = parseInt(dist(rw.x, rw.y, lw.x, lw.y));    // compute distance

        text(distance, 10, 10); // debug distance

        // translate distance into brightness
        let bri = map(distance, 30, 500, 0, 255);

        led.brightness(bri);    // apply the brightness to the led

    }

    

}