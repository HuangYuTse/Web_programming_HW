const request = require('request');
var data;
var markers = [];
function getmarker(ip) {
    request('https://api.ipgeolocation.io/ipgeo?apiKey=a50deca0c9984e419251c16576b67b7e&ip=163.13.129.174', function (error, response, body) {
    console.log(body); // Print the HTML for the Google homepage. markers.push(JSON.stringify(body));
    console.log(typeof body);
    console.log(typeof JSON.parse(body));
    console.log('--------------------------');
    data = {
        "country": JSON.parse(body)["country"],
        "city": JSON.parse(body)["city"],
        "ip": JSON.parse(body)["ip"],
        "isp": JSON.parse(body)["isp"],
        "lat": JSON.parse(body)["latitude"],
        "lng": JSON.parse(body)["longitude"]
      };
      console.log('data:',data);
});
}
getmarker(900);

console.log('--------------------------');
console.log('markers',markers);