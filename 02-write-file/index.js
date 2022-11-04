const fs = require("fs");
const path = require('path');
const { stdin, stdout } = process;

let writeableStream = fs.createWriteStream(path.resolve('02-write-file', 'text.txt'));


stdout.write('Введите свой текст:\n');

stdin.on('data', data => {
    writeableStream.write(data); 
    if (data.toString().trim() == 'exit'){
        process.exit();
    }
    process.on('SIGINT', () => process.exit());
});

process.on('exit', () => stdout.write('Спасибо за текст, удачи!\n'));
