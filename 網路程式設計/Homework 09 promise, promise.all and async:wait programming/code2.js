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

var promises = urlList.map(url => {
  return new Promise((resolve, reject) => {
    var r = request(url)
    .on('response', (resp) => {
      if (resp.statusCode === 200) {
        console.log('Started: ', url);
        var s_arr =  url.match(/[\d-]+$/);
        var filename = './Data02/' + s_arr[0] + '.html';
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
  });
});

Promise.all(promises).then(function(values){
    if (err) return console.error(err);
    console.log('Promise Finished: ', values);
});