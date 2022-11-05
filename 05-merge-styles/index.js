const fs = require('fs');
const path = require('path');
let writeableStream = fs.createWriteStream(path.resolve('05-merge-styles', 'project-dist' ,'bundle.css'));
fs.readdir(path.resolve('05-merge-styles', 'styles'), (err, files) => {
    if(err) throw err;
    for (var i=0; i<files.length; i++){
        let pathFile = path.resolve('05-merge-styles', 'styles', files[i]);
        if(path.extname(pathFile) === '.css'){
            let readableStreem = fs.createReadStream(path.resolve('05-merge-styles', 'styles', files[i]), 'utf-8');
            readableStreem.pipe(writeableStream);
        }
    }
});
