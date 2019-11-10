const request = require('request');
var data = 0;
var markers = [];
var delay = function(s){
    return new Promise(function(resolve,reject){
     setTimeout(resolve,s); 
    });
  };
async function main() {
    console.log('request start');
////////////////////////////////////////////////
    request('https://api.ipgeolocation.io/ipgeo?apiKey=a50deca0c9984e419251c16576b67b7e&ip=163.13.129.174', function (error, response, body) {
    //console.log(body); // Print the HTML for the Google homepage. markers.push(JSON.stringify(body));
    //console.log(typeof body);
    //console.log(typeof JSON.parse(body));
    //console.log('--------------------------1');
    data = {
        "country": JSON.parse(body)["country_name"],
        "city": JSON.parse(body)["city"],
        "ip": JSON.parse(body)["ip"],
        "isp": JSON.parse(body)["isp"],
        "lat": JSON.parse(body)["latitude"],
        "lng": JSON.parse(body)["longitude"]
      };
      markers.push(data);
    });
    //    console.log('data:',data);
       
////////////////////////////////////////////////////
request('https://api.ipgeolocation.io/ipgeo?apiKey=a50deca0c9984e419251c16576b67b7e&ip=169.1.102.4', function (error, response, body) {
    //console.log(body); // Print the HTML for the Google homepage. markers.push(JSON.stringify(body));
    //console.log(typeof body);
    //console.log(typeof JSON.parse(body));
    //console.log('--------------------------1');
    data = {
        "country": JSON.parse(body)["country_name"],
        "city": JSON.parse(body)["city"],
        "ip": JSON.parse(body)["ip"],
        "isp": JSON.parse(body)["isp"],
        "lat": JSON.parse(body)["latitude"],
        "lng": JSON.parse(body)["longitude"]
      };
      markers.push(data);
    });
    //    console.log('data:',data);
       
////////////////////////////////////////////////////
request('https://api.ipgeolocation.io/ipgeo?apiKey=a50deca0c9984e419251c16576b67b7e&ip=190.37.198.2', function (error, response, body) {
    //console.log(body); // Print the HTML for the Google homepage. markers.push(JSON.stringify(body));
    //console.log(typeof body);
    //console.log(typeof JSON.parse(body));
    //console.log('--------------------------1');
    data = {
        "country": JSON.parse(body)["country_name"],
        "city": JSON.parse(body)["city"],
        "ip": JSON.parse(body)["ip"],
        "isp": JSON.parse(body)["isp"],
        "lat": JSON.parse(body)["latitude"],
        "lng": JSON.parse(body)["longitude"]
      };
      markers.push(data);
    });
    //   console.log('data:',data);
////////////////////////////////////////////////////
request('https://api.ipgeolocation.io/ipgeo?apiKey=a50deca0c9984e419251c16576b67b7e&ip=72.27.189.3', function (error, response, body) {
    //console.log(body); // Print the HTML for the Google homepage. markers.push(JSON.stringify(body));
    //console.log(typeof body);
    //console.log(typeof JSON.parse(body));
    //console.log('--------------------------1');
    data = {
        "country": JSON.parse(body)["country_name"],
        "city": JSON.parse(body)["city"],
        "ip": JSON.parse(body)["ip"],
        "isp": JSON.parse(body)["isp"],
        "lat": JSON.parse(body)["latitude"],
        "lng": JSON.parse(body)["longitude"]
      };
      markers.push(data);
    });
    //    console.log('data:',data);
////////////////////////////////////////////////////
    request('https://api.ipgeolocation.io/ipgeo?apiKey=a50deca0c9984e419251c16576b67b7e&ip=72.27.189.3', function (error, response, body) {
    //console.log(body); // Print the HTML for the Google homepage. markers.push(JSON.stringify(body));
    //console.log(typeof body);
    //console.log(typeof JSON.parse(body));
    //console.log('--------------------------1');
    data = {
        "country": JSON.parse(body)["country_name"],
        "city": JSON.parse(body)["city"],
        "ip": JSON.parse(body)["ip"],
        "isp": JSON.parse(body)["isp"],
        "lat": JSON.parse(body)["latitude"],
        "lng": JSON.parse(body)["longitude"]
      };
    });
    //setTimeout(function() {markers.push(data);}, 3000);
    //console.log('data:',data);
///////////////////////////////////////////////////
    setTimeout(function() {
    //console.log('--------------------------2');
    console.log('markers',markers);}, 6000);
}
main();