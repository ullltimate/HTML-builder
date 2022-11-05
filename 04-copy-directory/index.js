const fs = require('fs');
const path = require('path');
fs.mkdir(path.resolve('04-copy-directory', 'files-copy'),{ recursive: true }, err => {
   if(err) throw err;
});
fs.readdir(path.resolve('04-copy-directory', 'files'), (err, files) => {
    if(err) throw err;
    for (var i=0; i<files.length; i++){
        fs.copyFile(path.resolve('04-copy-directory', 'files', files[i]), path.resolve('04-copy-directory', 'files-copy', files[i]), err => {
            if(err) throw err;
         });
    }
    fs.readdir(path.resolve('04-copy-directory', 'files-copy'), (err, filesCopy) => {
        if(err) throw err;
        for (var j=0; j<filesCopy.length; j++){
            if (files.includes(filesCopy[j]) === false){
                fs.unlink(path.resolve('04-copy-directory', 'files-copy', filesCopy[j]), err => {
                    if(err) throw err;
                 });
            }
        }
    })
    console.log('Файлы успешно скопированы в новую папку');
});

