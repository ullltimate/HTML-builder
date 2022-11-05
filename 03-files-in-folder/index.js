const fs = require('fs');
const path = require('path');
fs.readdir(path.resolve('03-files-in-folder', 'secret-folder'), (err, files) => {
    if(err) throw err; // не прочитать содержимое папки
    console.log(files);
    for (var i=0; i<files.length; i++){
        
        let pathFile = path.resolve('03-files-in-folder', 'secret-folder', files[i]);
        
        fs.stat(path.resolve('03-files-in-folder', 'secret-folder', files[i]), (err, stats) => {
            if (err) {
            console.error(err)
            return
            }
            if(stats.isFile() === true){
                let nameFile = path.basename(pathFile, path.extname(pathFile));
                let extFile = path.extname(pathFile).slice(1);
                let sizeFile = stats.size;
                console.log(nameFile + ' - ' + extFile + ' - ' + sizeFile);
            }
        })
    }
})
