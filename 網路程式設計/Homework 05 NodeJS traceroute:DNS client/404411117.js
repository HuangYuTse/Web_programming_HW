const Traceroute = require('nodejs-traceroute');
const dns = require('dns');//查詢名稱用
var args = process.argv;
var myip = args[2];//取得cmd輸入值（這是對macbook的取法win不確定）
try {
    const tracer = new Traceroute();
    tracer
        .on('pid', (pid) => {
            console.log(`pid: ${pid}`);//取pid
        })
        .on('destination', (destination) => {
            console.log(`destination: ${destination}`);
        })
        .on('hop', (hop) => {//hop 訊息
            if (hop["hop"] == 31) {//hop 30個時強制結束
                console.log('追蹤完成。');
                process.exit();
              }
            console.log(`hop: ${JSON.stringify(hop)}`);
            if (hop["ip"] == "*") {
                console.log('追蹤完成。');//ip 沒有個時強制結束
                process.exit();
              }
            dns.lookupService(hop["ip"],80,(err,hostname,service)=>{
                if(err) console.log('ENOTFOUND');
                console.log('該IP對應的主機為：',hostname);
                });
        })
        .on('close', (code) => {
            console.log(`close: code ${code}`);
        });
    console.log('追蹤',myip,'路由');
    tracer.trace(myip);
} catch (ex) {
    console.log(ex);
}