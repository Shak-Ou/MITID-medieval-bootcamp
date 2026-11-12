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

        // console.log(poses)
        //poses[0].nose.x;


        let collisionX = parseInt(abs(poses[0].nose.x - zone.x));
        let collisionY = parseInt(abs(poses[0].nose.y - zone.y));

        console.table(collisionX, collisionY)   

        let collision = collisionX + collisionY;

        if(collision < zone.size){
            fill("#00FF00");
        }else{
            fill("#FF0000");
        }

        circle(zone.x, zone.y, zone.size);

        feedback.innerHTML = `nose on X: ${parseInt(poses[0].nose.x)} </br> 
                              nose on Y: ${parseInt(poses[0].nose.y)} </br>
                              target on X: ${zone.x} </br>
                              target on Y: ${zone.y} </br>
                              collisionX: ${collisionX} </br>
                              collisionY: ${collisionY} </br>
                              is there a collision? ${collision < zone.size}`

    }
    
}