const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = [];
let n, m, v; 
let map = new Map([]); //각 노드에서 갈 수 있는 위치 저장
let vis = []; //방문 여부 확인
let answer = []; //정답 출력용

function dfs(cur) {
    vis[cur] = true;
    answer.push(cur);
    let arr = map.get(cur);
    for(var i=0; i<arr.length; i++) {
        let nxt = arr[i];
        if(vis[nxt]) continue;
        dfs(nxt);
    }
}

function bfs(num) {
    let queue = [];
    queue.push(num);
    vis[num] = true;
    while(queue.length > 0) {
        let cur = queue.shift();
        answer.push(cur);
        let arr = map.get(cur);
        for(var i=0; i<arr.length; i++) {
            let nxt = arr[i];
            if(vis[nxt]) continue;
            queue.push(nxt);
            vis[nxt] = true;
        }
    }
}

rl.on('line', (line) => {
    input.push(line.split(' ').map(e => parseInt(e)));
    n = input[0][0];
    m = input[0][1];
    v = input[0][2];
    if(input.length === m+1)
        rl.close();
})
rl.on('close', () => {
    for(var i=1; i<=n; i++)
        map.set(i, []);
    for(var i=1; i<input.length; i++) {
        let a = input[i][0], b = input[i][1];
        map.get(a).push(b);
        map.get(b).push(a);
    }
    for(var i=1; i<=n; i++) {
        map.get(i).sort((a, b) => a - b);
    }

    for(var i=0; i<=n; i++)
        vis.push(false);
    dfs(v);
    console.log(answer.join(" "));
    
    answer = [];
    for(var i=0; i<=n; i++)
        vis[i] = false;
    bfs(v);
    console.log(answer.join(" "));

    process.exit();
})