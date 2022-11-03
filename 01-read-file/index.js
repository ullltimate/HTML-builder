const fs = require('fs');
const path = require('path');
const eventName = "data";
let readStream = fs.createReadStream(path.resolve('01-read-file', 'text.txt'), "utf8");
readStream.on(eventName, function(data){ 
  console.log(data);
});