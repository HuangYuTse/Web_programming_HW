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

var download = function(url, dest, callback){
    request.get(url)
    .on('error', function(err) { console.log(err) } )
    .pipe(fs.createWriteStream(dest))
    .on('close', callback);
};
urlList.forEach( function(str) {
    var s_arr =  str.match(/[\d-]+$/);
    var filename = './Data01/' + s_arr[0] + '.html';
    console.log('Downloading  ' + filename);
    download(str, filename, function(){console.log('Finished Downloading ' + filename)});
});

