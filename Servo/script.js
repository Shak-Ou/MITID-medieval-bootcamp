let board;

let pot;
let servo;

function setup() {
    createCanvas(700, 500);
    board = createBoard();
    createConnectButton(board);

    // we create a sensor a