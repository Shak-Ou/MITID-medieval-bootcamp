let board;

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

    video = createCapture(VIDEO);       // we open the webcam
    video.size(700, 500);
    video.hide();

    bodyPose = await ml5.bodyPose();
    // start the detection
    bodyPose.detectStart(video, function(results){
        poses = results;
    })

    noFill();
    strokeWeight(3);
    stroke("#00FF00");
}

function draw() {
    image(video, 0, 0);

    // make sure at least one person is detected
    if(poses.length > 0){
        // left eye position
        let le = poses[0].left_eye;
        let re = poses[0].right_eye;
        let rea = poses[0].right_ear;
        let lea = poses[0].left_ear;

        let d = 60;
        
        circle(le.x, le.y, d);
        circle(re.x, re.y, d);
        line(le.x - d/2, le.y, re.x +  d/2, re.y);
        line(le.x + d/2, le.y, lea.x, lea.y - 20);
        line(re.x - d/2, re.y, rea.x, rea.y - 20);






    }

    

}