const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = [];
let n, arr = [];

function gcd(a, b) {
    let c;
    while(b != 0) {
        c = a % b;
        a = b;
        b = c;
    }
    return a;
}

rl.on('line', (line) => {
    input.push(line.split(' ').map(e => Number(e)));
    n = input[0];

    if(input.length == 2)
        rl.close();
})

rl.on('close', () => {
    for(var i=0; i<n; i++)
        arr.push(input[1][i]);
    arr.sort((a, b) => a - b);
    let narr = Array(arr[arr.length-1]+1).fill(false);
    for(var i=0; i<arr.length; i++) {
        let num = arr[i];
        for(var j=2; j<=num; j++) {
            if(arr[i] % j == 0)
                narr[j] = true;
        }
    }
    let answer = 0;
    for(var i=2; i<=arr[arr.length-1]; i++) {
        if(!narr[i]) continue;
        let sum = 0;
        for(var j=0; j<arr.length; j++) {
            if(arr[j] < i) continue;
            if(gcd(arr[j], i) == i)
                sum++;
        }    
        answer = (answer >= sum) ? answer : sum; 
    }
    console.log(answer);
    
    process.exit();
})