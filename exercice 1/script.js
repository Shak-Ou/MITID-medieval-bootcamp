let board;

let led;    //digital representation of the led

let bodyPose; 

let video; 

let poses = [];


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


    let rw = poses[0].right_wrist;   // left shoulder
    let lw = poses[0].left_wrist;  // right shoulder

    let distance = parseInt(dist(rw.x, rw.y, lw.x, lw.y));  // compute distance

    text(distance, 10, 10);     // debug distance

    let bri = map(distance, 150, 230, 0, 255);    // Two First numbers = range brackets, two last = the brightness

    led.brightness(bri);

    }

}

// function is trigeered when mouse is clicked/pressed
// function mousePressed() {
   // led.t