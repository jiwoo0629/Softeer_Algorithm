const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = [];
let board = [];

function getPrice(a, b, c) {
    let price = 9;
    for(var i=1; i<=3; i++){
        let sum = Math.abs(a-i) + Math.abs(b-i) + Math.abs(c-i);
        price = (price <= sum) ? price : sum;
    }
    return price;
}

rl.on('line', (line) => {
    input.push(line.split(' ').map(e => Number(e)));

    if(input.length == 3)
        rl.close();
})

rl.on('close', () => {
    for(var i=0; i<3; i++) {
        let arr = [];
        for(var j=0; j<3; j++)
            arr.push(input[i][j]);
        board.push(arr);
    }
    let answer = 9;
    for(var i=0; i<3; i++) {
        let price1 = getPrice(board[i][0], board[i][1], board[i][2]);
        answer = (answer <= price1) ? answer : price1;
        let price2 = getPrice(board[0][i], board[1][i], board[2][i]);
        answer = (answer <= price2) ? answer : price2;
    }
    console.log(answer);
    
    process.exit();
});