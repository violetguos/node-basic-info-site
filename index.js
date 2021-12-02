const http = require('http');
const fs = require("fs");
const path = require("path");

const mimeLookup = {
  '.js': 'application/javascript',
  '.html': 'text/html'
};

const server = http.createServer((req, res) => {
  if(req.method == 'GET'){

    let fileurl;
    let filepath;
    if(req.url == '/'){
      fileurl = 'index.html';
      filepath = path.resolve('./' + fileurl);
    }
    else{
      fileurl = req.url + '.html';
      filepath = path.resolve('.' + fileurl);
    } 
    console.log(fileurl, filepath);


    let fileExt = path.extname(filepath);
    let mimeType = mimeLookup[fileExt];

    if(!mimeType) {
      filepath = './404.html'
    }

    fs.exists(filepath, (exists) => {
      if(!exists){
        filepath = './404.html'
      }

      res.writeHead(200, {'Content-Type': mimeType});
      fs.createReadStream(filepath).pipe(res);

    });

  }
}).listen(8080);
console.log("Server running at port 8080");