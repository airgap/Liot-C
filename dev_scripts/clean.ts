import * as fs from 'fs';

const files = fs.readdirSync('..').filter(n=>n.match(/\.js$/));
files.forEach(f => fs.unlinkSync('../'+f));
console.log('Done');