const formidable = require('formidable');
const http = require('http');
const fs   = require('fs');
const util = require('util'); // only used for display file info in util.inspect()
const path = require("path") // 找到目前檔案位置
var pathnow = path.join(__dirname, 'test');// 資料夾test內存放
http.createServer(function(req, res) {
  if (req.url == '/upload' && req.method.toLowerCase() == 'post') { // parse a file upload
    var form = new formidable.IncomingForm();
    var fields = [], files = [];
    form.uploadDir = pathnow;// 指定檔案位置
    form
    .on('error', function(err){
        res.writeHead(200, {'content-type':'text/plain'});
        res.end('error:\n\n'+util.inspect(err));
    })
    .on('field', function(field, value){
        console.log(field, value);
        fields.push([field, value]);
    })
    .on('progress', function(bytesReceived, bytesExpected) {
        var percent_complete = (bytesReceived / bytesExpected) * 100;
        console.log(percent_complete.toFixed(2));
    })
    .on('file', function(field, file) {
        console.log(field, file);
        files.push([field, file]);
    })
    .on('end', function(){
      console.log('-> post done');
      res.writeHead('200', {'content-type':'text/plain'});
      res.end('received fields:\n\n'+util.inspect(fields) +'\n\n received files: ' + util.inspect(files));
    });
    console.log(req);
    form.parse(req);


    return;
  }
  // show a file upload form
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    'User Name: <input type="text" name="username"><br />'+
    'Some Number: <input type="number" name="age"><br />'+
    'Image File: <input type="file" name="photo" multiple="multiple"><br />'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
}).listen(8080);