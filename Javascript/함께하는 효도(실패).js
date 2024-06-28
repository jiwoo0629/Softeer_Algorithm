const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

let input = [];
let n, m, board, friends; // board : 격자 정보, friends : 친구들 위치 정보
let dx = [-1, 0, 1, 0], dy = [0, -1, 0, 1];
let answer = 0;
//모든 방향 경우의 수 구하기
function getPath(arr, num) {
    if(num == 0) return arr;
    if(arr.length == 0) {
        for(var i=0; i<4; i++) {
            arr.push([dx[i], dy[i]]);
        }
    } else {
        let num = arr.length;
        for(var i=0; i<num; i++) {
            let sarr = arr.shift();
            for(var j=0; j<4; j++) {
                let n_arr = sarr.map(e => e);
                n_arr.push(dx[j]);
                n_arr.push(dy[j]);
                arr.push(n_arr);
            }
        }
    }
    getPath(arr, num-1);
    return arr;
}

function bfs(path, friends) {
    let time = 0;
    let queue = [];
    queue.push(friends);
    while(time < 3) {
        let cur = queue.shift();
        if(!cur) break;
        for(var i=0; i<path.length; i++) {
            let possible = true;
            let q = [];
            for(let j=0; j<m; j++) {
                const x = cur[j].x, y = cur[j].y, sum = cur[j].sum, vis = cur[j].vis;
                let nx = parseInt(x + path[i][2*j]), ny = parseInt(y + path[i][2*j+1]), n_sum = sum, n_vis = vis.map(e => e);

                if(nx < 0 || nx >= n || ny < 0 || ny >= n) {
                    console.log(nx, ny);
                    possible = false;
                }
                else if(n_vis[nx][ny]) {
                    console.log(nx, ny, n_vis);
                    //possible = false;
                }
                else {
                    n_vis[nx][ny] = true;
                    n_sum = n_sum + board[nx][ny];
                }    
                q.push({'x': nx, 'y': ny, 'sum': n_sum, 'vis': n_vis});
            }
            if(!possible)
                continue;
            queue.push(q);
        }
        console.log(queue);
        time++;
    }
    for(var i=0; i<queue.length; i++) {
        answer = (queue[i].sum > answer) ? queue[i].sum : answer;
    }
}

rl.on('line', (line) => {
    input.push(line.split(' ').map(e => parseInt(e)));
    n = input[0][0]; m = input[0][1];
    
    if(input.length === n+m+1)
        rl.close();
})

rl.on('close', () => {
    let path = getPath([], m)
    board = [];
    for(var i=1; i<=n; i++) {
        let arr = [];
        for(var j=0; j<n; j++) {
            arr.push(input[i][j]);
        }
        board.push(arr);
    }
    friends = [];
    for(var i=n+1; i<=n+m; i++) {
        let vis = [];
        for(var j=0; j<n; j++) {
            vis.push(Array(n).fill(false));
        }
        vis[input[i][0]-1][input[i][1]-1] = true;
        friends.push({'x': input[i][0]-1, 'y': input[i][1]-1, 'sum': board[input[i][0]-1][input[i][1]-1], 'vis': vis});
    }
    bfs(path, friends);

    console.log(answer);
})