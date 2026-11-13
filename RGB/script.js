let board;

let rgb;    //digital representation of the led

let bodyPose; 

let video; 

let poses = [];

let previous = {
    x: 0,
    y: 0
}; // stocker l'ancienne position

let laLedEstRouge = false;

function randomize(){
    setTimeout (function(){

        console.log("coucou")

        if(random(3) > 1){
            rgb.color("#FF0000");
            laLedEstRouge = true;
            console.log("rouge")
        }
        else{
            rgb.color("#00FF00");
            laLedEstRouge = false
            console.log("vert")
        }
                
        randomize();
    }, random(1000, 3000))
}

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

    randomize();

}

function draw() {
    image(video, 0, 0);

    text(laLedEstRouge, 20, 20);
    
    // make sure at least one person is detected 
    if(poses.length > 0){
        let rs = poses[0].right_shoulder;   // left shoulder
        if(previous.x != 0 && previous.y != 0) { // skip first detection
            let distance = parseInt(dist(rs.x, rs.y, previous.x, previous.y));  // compute distance
            text(distance, 10, 10);     // debug distance
            if(distance > 50 && laLedEstRouge === true ){
                fill(255, 0, 0, 100);
                noStroke();
                rect(0, 0, width, height);
                //noLoop();
            }
        }

        previous.x = rs.x;
        previous.y = rs.y;
    }
}

function mousePressed() {
    rgb.color([random(255), random(255), random(255)]);
}