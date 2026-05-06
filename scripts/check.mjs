import fs from 'fs';
const s = fs.readFileSync('index.js','utf8');
let backticks=0; for (let i=0;i<s.length;i++) if (s[i]==='`') backticks++;
let open=0, close=0; for (let i=0;i<s.length;i++){ if (s[i]==='{') open++; if (s[i]==='}') close++; }
console.log('backticks',backticks,'{',open,'}',close);
console.log('---TAIL---');
console.log(s.slice(-400));
let idxs=[]; for (let i=0;i<s.length;i++) if (s[i]==='`') idxs.push(i);
console.log('backtick indexes count', idxs.length, idxs.slice(-10));
for (const pos of idxs.slice(-12)) {
	const start = Math.max(0, pos-400);
	const end = Math.min(s.length, pos+400);
	console.log('\n--- CONTEXT AROUND ' + pos + ' ---');
	console.log(s.slice(start,end));
}

// Print a diagnostic slice near the last reported truncated area
const probePos = idxs[idxs.length-1] || 0;
console.log('\n--- DIAGNOSTIC PROBE AROUND ' + probePos + ' ---');
console.log(s.slice(Math.max(0, probePos-600), Math.min(s.length, probePos+600)));

// Compute running brace balance and find first position where balance is maximal (i.e., leftover opens)
let balance = 0;
let maxBalance = -Infinity;
let maxPos = -1;
for (let i=0;i<s.length;i++){
	if (s[i]==='{') balance++;
	else if (s[i]==='}') balance--;
	if (balance>maxBalance){ maxBalance=balance; maxPos=i; }
}
console.log('\nBrace maxBalance', maxBalance, 'at pos', maxPos);
if (maxPos>0) console.log('Context at imbalance:', s.slice(Math.max(0,maxPos-120), Math.min(s.length, maxPos+120)));
