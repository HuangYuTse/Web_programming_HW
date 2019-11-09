const multiparty = require('multiparty');
const http = require('http');
const fs   = require('fs');
const util = require('util'); // only used for display file info in util.inspect()
const path = require("path") // 找到目前檔案位置
var pathnow = path.join(__dirname, 'test');// 資料夾test內存放
console.log(pathnow);
http.createServer(function(req, res) {
  if (req.url === '/upload' && req.method === 'POST') {
    // parse a file upload
    var form = new multiparty.Form({uploadDir: pathnow});//指定檔案位置
    var fields = [], files = [];
    var count = 0;
    form.on('error', function(err) {
        console.log('Error parsing form: ' + err.stack);
        res.writeHead(200, {'content-type':'text/plain'});
        res.end('error:\n\n'+util.inspect(err));
    })
    .on('part', function(part) {
    // *Must* act on the part by reading it
    // If you want to ignore it, just call "part.resume()"
        if (!part.filename) { // filename is not defined when this is a field and not a file
          console.log('Field named ' + part.name);
          part.resume();
        }
        if (part.filename) { // filename is defined when this is a file
          count++;
          console.log('File named ' + part.filename); // part.name is the name of field
          part.resume();
        }
        part.on('error', function(err) {
          // what to do when upload error
        });
    })
    .on('field', function(field, value){
        console.log(field, value);
        fields.push([field, value]);
    })
    .on('file', (name, file) => {
        console.log(file);
        fields.push([name, file]);//處理檔案
    })
    .on('close', function() {
        console.log('Upload completed!');
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: files}));
      });
    form.parse(req);

    return;
  }
  // show a file upload form
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    'User Name: <input type="text" name="username"><br />'+
    'Some Number: <input type="number" name="somenumber"><br />'+
    'Image File: <input type="file" name="photo" multiple="multiple"><br />'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
}).listen(8080);