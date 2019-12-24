const QRCode = require('qrcode');
const fs = require('fs');
const GIFEncoder = require('gifencoder');
const encoder = new GIFEncoder(600,600);
var Canvas = require('canvas');
const date = require('date-and-time');


function makegif() {
    encoder.createReadStream().pipe(fs.createWriteStream('myanimated.gif'));
    encoder.start();
    encoder.setRepeat(0);   
    encoder.setDelay(1000);  
    encoder.setQuality(10); 

    var canvas = Canvas.createCanvas(600,600);
    var ctx = canvas.getContext('2d');


    // image frame
    var data = fs.readFileSync('1.png');
    var img = new Canvas.Image; 
    img.src = data;
    ctx.drawImage(img, 0, 0, 600, 600);
    encoder.addFrame(ctx);
    data = fs.readFileSync('2.png');
    img.src = data;
    ctx.drawImage(img, 0, 0, 600, 600);
    encoder.addFrame(ctx);
    data = fs.readFileSync('3.png');
    img.src = data;
    ctx.drawImage(img, 0, 0, 600, 600);
    encoder.addFrame(ctx);
    data = fs.readFileSync('4.png');
    img.src = data;
    ctx.drawImage(img, 0, 0, 600, 600);
    encoder.addFrame(ctx);
    encoder.finish();
}

QRCode.toFile('./1.png', date.format(new Date(), 'YYYY/MM/DD HH:mm:ss'), {
    color: {
      dark: '#00FFFF',  // Blue dots
      light: '#FFFFFF' // Transparent background
    }
  }, function (err) {
    QRCode.toFile('./2.png',date.format(new Date(1000), 'YYYY/MM/DD HH:mm:ss'), {
        color: {
          dark: '#FF00FF',  // Blue dots
          light: '#FFFFFF' // Transparent background
        }
      }, function (err) {
        QRCode.toFile('./3.png',date.format(new Date(2000), 'YYYY/MM/DD HH:mm:ss'), {
            color: {
              dark: '#00FF00',  // Blue dots
              light: '#FFFFFF' // Transparent background
            }
          }, function (err) {
            QRCode.toFile('./4.png',date.format(new Date(3000), 'YYYY/MM/DD HH:mm:ss'), {
                color: {
                  dark: '#FFFF00',  // Blue dots
                  light: '#FFFFFF' // Transparent background
                }
              }, function (err) {
                makegif();
                console.log('done');
              })
          })
      })
  })
