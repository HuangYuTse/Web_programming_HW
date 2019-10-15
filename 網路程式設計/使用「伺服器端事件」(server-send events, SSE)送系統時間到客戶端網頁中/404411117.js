var web = require('http');
var webs = require('https');
var fs = require('fs');
var url = require('url');
var data = fs.readFileSync('page01.html', 'utf8');
var data2 = fs.readFileSync('banner-page.html', 'utf8');
//var privateKey = fs.readFileSync('server.key');
//var certificate = fs.readFileSync('server.crt');
//var server_config = {
//    key: privateKey,
//    cert: certificate
//};
var sse_header = {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
};
var server = web.createServer(function rout(req, res) {
    if (req.url == '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
    } else if (req.url == '/student') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body>This is http</body></html>');
        res.end();
    } else if (req.url == '/sse') {
        res.writeHead(200,sse_header);
        res.write(`id: 1 \n`);
        res.write(`data: Test Message ${Date.now()}\n\n`);
        res.end();
    }else
        res.end('Invalid Request!');
});
/*var servers = webs.createServer(server_config, function rout(req, res) {
    if (req.url == '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
    } else if (req.url == '/student') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body>This is https</body></html>');
        res.end();
    } else if (req.url == '/kiwi.png') {
        res.write(img);
        res.end();
    } else
        res.end('Invalid Request!');
});
servers.listen(8000);*/
server.listen(5000);
