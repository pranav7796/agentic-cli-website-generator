const fs = require('fs');
const s = fs.readFileSync('index.js','utf8');
let backticks=0; for (let i=0;i<s.length;i++) if (s[i]==='`') backticks++;
let open=0, close=0; for (let i=0;i<s.length;i++){ if (s[i]==='{') open++; if (s[i]==='}') close++; }
console.log('backticks',backticks,'{',open,'}',close);
// find last 300 chars
console.log('---TAIL---');
console.log(s.slice(-400));
// print positions of unclosed backtick: indexes of backticks
let idxs=[]; for (let i=0;i<s.length;i++) if (s[i]==='`') idxs.push(i);
console.log('backtick indexes count', idxs.length, idxs.slice(-10));
