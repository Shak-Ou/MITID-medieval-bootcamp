let board;
let led;

function setup() {
    createCanvas(700, 500);
    board = createBoard();
    createConnectButton(board);
    
    led = new five.Led(2);         
}

function draw() {
    background(200);

    if(mouseY > height/2){
        led.on();
    }else{
        led.off();
    }
}