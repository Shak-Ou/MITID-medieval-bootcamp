let board;

// a variable to store the bodyPose model
let bodyPose;

// We create a waraible to store the webcam data
let video;

//A variable to store the detected poses
let poses = []

async function setup() {
    createCanvas(700, 500);
    board = createBoard();
    createConnectButton(board);

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

    //get eyes position of the first person detected 
    console.log(poses[0].left_eye);

    //we store the nose position
    let n = poses[0].left_eye;
    stroke("#000000");
    circle(n.x, n.y, 60);


    console.log(poses[0].right_eye);

    let re = poses[0].right_eye; 
    stroke("#000000");
    circle(re.x, re.y, 60);

    console.log(poses[0].right_ear);

    let rd = poses[0].right_ear; 
    fill("#000000");

    line(re.x, re.y, rd.x, rd.y);
    

    console.log(poses[0].left_ear);

    let rf = poses[0].left_ear; 
    fill("#000000");
    line(n.x, n.y, rf.x, rf.y);

    //we store the nose position

    //get nose position of the first person detected 
    // console.log(poses[0]);

    //we store the nose position
    // let n= poses[0].nose;
    // fill("#FF0000");
    // circle(n.x, n.y, 30);

 }

}
    