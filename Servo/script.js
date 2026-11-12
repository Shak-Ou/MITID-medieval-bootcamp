let board;

let pot;
let servo;

function setup() {
    createCanvas(700, 500);
    board = createBoard();
    createConnectButton(board);

    // we create a sensor and set the output range we expect
    pot = new five.Sensor({
                            pin:"A0",
                            scale: [0, 100]
    });

    servo =new five.Servo(3);

    pot.on("change", function(latestValue){
        // I want to move the servo
        servo.to(latestValue);

    });

}

function draw() {
    background(200);



}
