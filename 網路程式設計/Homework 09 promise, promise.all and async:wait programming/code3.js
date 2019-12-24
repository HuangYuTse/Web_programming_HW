const fs = require('fs');
const request = require('request');

const urlList = [ 
    "https://e-service.cwb.gov.tw/HistoryDataQuery/DayDataController.do?command=viewMain&station=466900&stname=%25E6%25B7%25A1%25E6%25B0%25B4&datepicker=2019-12-01",
  "https://e-service.cwb.gov.tw/HistoryDataQuery/DayDataController.do?command=viewMain&station=466900&stname=%25E6%25B7%25A1%25E6%25B0%25B4&datepicker=2019-12-02",
  "https://e-service.cwb.gov.tw/HistoryDataQuery/DayDataController.do?command=viewMain&station=466900&stname=%25E6%25B7%25A1%25E6%25B0%25B4&datepicker=2019-12-03",
  "https://e-service.cwb.gov.tw/HistoryDataQuery/DayDataController.do?command=viewMain&station=466900&stname=%25E6%25B7%25A1%25E6%25B0%25B4&datepicker=2019-12-04",
  "https://e-service.cwb.gov.tw/HistoryDataQuery/DayDataController.do?command=viewMain&station=466900&stname=%25E6%25B7%25A1%25E6%25B0%25B4&datepicker=2019-12-05",
  "https://e-service.cwb.gov.tw/HistoryDataQuery/DayDataController.do?command=viewMain&station=466900&stname=%25E6%25B7%25A1%25E6%25B0%25B4&datepicker=2019-12-06",
  "https://e-service.cwb.gov.tw/HistoryDataQuery/DayDataController.do?command=viewMain&station=466900&stname=%25E6%25B7%25A1%25E6%25B0%25B4&datepicker=2019-12-07" ]

function Fail(reason){this.reason=reason;};
const isFail = x=>(x&&x.constructor)===Fail;
const isNotFail = x=>!isFail(x);

var promises = urlList.map(url => {
  return new Promise((resolve, reject) => {
    var r = request.get(url)
    .on('response', (resp) => {
      if (resp.statusCode === 200) {
        console.log('Started: ', url);
        var s_arr =  url.match(/[\d-]+$/);
        var filename = './Data03/' + s_arr[0] + '.html';
        r.pipe(fs.createWriteStream(filename))
        .on('error', function(err) {
          console.log(err)
          reject(err)
        })
        .on('finish', function () {
          console.log('Downloaded: ', url);
          resolve(url);
        });
      } else {
          console.log(`${resp.statusCode} error for`, url);
          reject(`${resp.statusCode} error for ${url}`)
      }
    }).on('error', function(err) {
      console.log(err)
      reject(err)
    });
  })
  .catch(err=>new Fail([err,url]));
});

Promise.all(promises)
.then(
    results=>{
    const successes = results.filter(isNotFail);
    const failed = results.filter(isFail);
    if(failed.length!==0){
      console.log("Some url(s) failed:");
      console.log(failed.map(([err,url])=>url));
      console.log("Errors:");
      console.log(failed.map(([err,url])=>err));
    }
  });