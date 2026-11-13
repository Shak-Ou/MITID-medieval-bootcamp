 let rgb;

function setup(){
    let board = createBoard();
    createConnectButton(board);
    rgb = new five.Led.RGB([6, 5, 3]);  // [red, green, blue] pins

    rgb.color("#0000ff");   // hexadecimal or [r, g, b]
    //rgb.intensity(50);      // 0 to 100 %
    //rgb.off();              // self explenatory
}