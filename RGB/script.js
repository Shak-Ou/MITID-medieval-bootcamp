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