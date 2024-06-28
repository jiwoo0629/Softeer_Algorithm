const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = [];
let n, k;

rl.on('line', (line) => {
    input.push(line.split(' ').map(e => parseInt(e)));
    n = input[0][0]; k = input[0][1];
    if(input.length === n + 1)
        rl.close();
})
rl.on('close', () => {
    let arr = [];
    for(var i=1; i<=n; i++) 
        arr.push({"no": input[i][0], "gold": input[i][1], "silver": input[i][2], "bronze": input[i][3]});
    arr.sort((a, b) => {
        if(a.gold == b.gold) {
            if(a.silver == b.silver) return b.bronze - a.bronze;
            return b.silver - a.silver;
        }
        return b.gold - a.gold;
    })
    
    arr[0].rank = 1;
    let rank = 1;
    for(var i=1; i<arr.length; i++) {
        rank++;
        let past = arr[i-1], cur = arr[i];
        if(past.gold == cur.gold && past.silver == cur.silver && past.bronze == cur.bronze)
            cur.rank = past.rank;
        else {
            cur.rank = rank;
        }
    };
    let answer = arr.find(a => a.no == k).rank;
    console.log(answer);

    process.exit();
})