let board;

let bodyPose;
let video;
let poses = [];

let zone = {
    x: 400,
    y: 300,
    size: 20
};

let feedback = document.querySelector("#feedback");

async function setup() {
    createCanvas(700, 500);
    board = createBoard();
    createConnectButton(board);

    video = createCapture(VIDEO);
    video.size(700, 500);
    video.hide();

    bodyPose = await ml5.bodyPose();
    bodyPose.detectStart(video, function(results){
        poses = results;
    })
    
}

function draw() {
    // background(200);
    image(video, 0,0);
    fill("#FF0000");
    if(poses.length > 0){

        console.log(poses)
        //poses[0].nose.x;

        let bodyPart = poses[0].right_wrist;

        fill("#0000FF");
        circle(bodyPart.x, bodyPart.y, 10);

        line(bodyPart.x, bodyPart.y, zone.x, zone.y);
        
        let distance = dist(bodyPart.x, bodyPart.y, zone.x, zone.y);
        
        let collision = distance < zone.size;        

        if(collision){
            fill("#00FF00");
        }else{
            fill("#FF0000");
        }

        // line
        circle(zone.x, zone.y, zone.size);

        feedback.innerHTML = `nose on X: ${parseInt(bodyPart.x)} </br> 
                              nose on Y: ${parseInt(bodyPart.y)} </br>
                              target on X: ${zone.x} </br>
                              target on Y: ${zone.y} </br>
                              distance: ${100} </br>
                              collisionY: ${100} </br>
                              is there a collision? ${collision}`

    }
    
}