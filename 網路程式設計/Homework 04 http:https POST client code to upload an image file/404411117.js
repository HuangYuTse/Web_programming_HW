const request = require('request');
const fs   = require('fs');
var img = fs.createReadStream(__dirname +'/kiwi.png');//讀取檔案
console.log('img',img);
const options = {
    method: "POST",
    url: "http://localhost:8080/upload",
    headers: {
        "Content-Type": "multipart/form-data"
    },
    formData : {
        username:'admin',
        age:-2,
        photo:img
    }
};//request設定
console.log('options',options);
request(options, function (err, res, body) {
    if(err) console.log(err);
    console.log(body);
    console.log('posted!');
});//request 並顯示錯誤訊息

