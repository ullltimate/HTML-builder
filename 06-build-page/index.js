const fs = require('fs');
const path = require('path');
fs.mkdir(path.resolve('06-build-page', 'project-dist'),{ recursive: true }, err => {
   if(err) throw err;
});
let writeStreamHtml = fs.createWriteStream(path.resolve('06-build-page', 'project-dist', 'index.html'));
let writeStreamCss = fs.createWriteStream(path.resolve('06-build-page', 'project-dist', 'style.css'));
let readStreemTemplate = fs.createReadStream(path.resolve('06-build-page', 'template.html'));
readStreemTemplate.pipe(writeStreamHtml);
fs.readdir(path.resolve('06-build-page', 'styles'), (err, files) => {
    if(err) throw err;
    for (var i=0; i<files.length; i++){
        let pathFile = path.resolve('06-build-page', 'styles', files[i]);
        if(path.extname(pathFile) === '.css'){
            let readableStreem = fs.createReadStream(path.resolve('06-build-page', 'styles', files[i]), 'utf-8');
            readableStreem.pipe(writeStreamCss);
        }
    }
});
fs.readdir(path.resolve('06-build-page', 'components'), (err, files) => {
    if(err) throw err;
    fs.readFile(path.resolve('06-build-page', 'project-dist', 'index.html'), 'utf-8', (err, data) => {
        if(err) throw err;
        for (var i=0; i<files.length; i++){
            let pathFile = path.resolve('06-build-page', 'components', files[i]);
            let nameFile = path.basename(pathFile, path.extname(pathFile));
            let templateTag = '{{'+nameFile+'}}';
            fs.readFile(pathFile, 'utf-8', (err, dataCompFiles) => {
                if(err) throw err;
                data = data.replace(templateTag, dataCompFiles);
                fs.writeFile(path.resolve('06-build-page', 'project-dist', 'index.html'), data, (err) => {
                    if(err) throw err;
                });
            })
        }
    })
});

fs.mkdir(path.resolve('06-build-page', 'project-dist', 'assets'),{ recursive: true }, err => {
    if(err) throw err;
});
fs.readdir(path.resolve('06-build-page', 'assets'), (err, files) =>{
    if(err) throw err;

    for(var i=0; i<files.length; i++){
        
        let pathDir = path.resolve('06-build-page', 'assets', files[i]);
        
        fs.mkdir(path.resolve('06-build-page', 'project-dist', 'assets', files[i]), { recursive: true }, err => {
            if(err) throw err;
         });
         let pathDirProj = path.resolve('06-build-page', 'project-dist', 'assets', files[i]);
        
         fs.stat(path.resolve('06-build-page', 'assets', files[i]), (err, stats) => {
            if (err) {
            console.error(err)
            return
            }
            if(stats.isDirectory() === true){
                fs.readdir(pathDir, (err, filesAssets) => {
                    if(err) throw err;
                    
                    for (var j=0; j<filesAssets.length; j++){
                       
                        let pathCopyFileFrom = pathDir+'/'+filesAssets[j];
                       
                        let pathCopyFileIn = pathDirProj+'/'+filesAssets[j];
                        
                        fs.copyFile(pathCopyFileFrom, pathCopyFileIn ,err => {
                            if(err) throw err;
                         })
                    }
                });
            }
        })
    }
})

