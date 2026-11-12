let board;

let microphone; 
let micValue = 0; // a global variable to store micro value

function setup() {
    createCanvas(700, 500);
    board = createBoard();
    createConnectButton(board);

    //We create the sensor object
    microphone = new five.Sensor("A0"); 
    
    // We listen to sensor values
    microphone.on ("change", function(latestValue){
        // on modification do stuff
        micValue = latestValue;
    });

}

function draw() {
    background(200);

    // a circle that will get bigger when we scream
    circle(width/2, height/2, micValue);
}