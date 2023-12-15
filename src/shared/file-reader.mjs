import fs from 'node:fs';


function readFile(path) {
  let content;
  
  try {
    content = fs.readFileSync(path, { encoding: 'utf8', flag: 'r' });
  } catch (e) {
    console.error('File read error:', e)
  }

  return content.toString().split(/\r?\n/);
}

export {
  readFile
}