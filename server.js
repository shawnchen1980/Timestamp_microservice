// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.
function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return monthNames[monthIndex] + ' ' + day + ','  + year;
}
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:xx", function (request, response) {
  var str=request.path.slice(1);
  var d=new Date(str.replace(/%20/g,' '));
  console.log(str);
  console.log(d);
  if(/^\d+$/.test(str)){
    d=new Date((+str)*1000);
    response.send({unix:str,natural:formatDate(d)});
    response.end();
  }
  else if(d.toString()!=="Invalid Date") {
    response.send({unix:d.getTime()/1000,natural:formatDate(d)});
    response.end();
  }
  else {
    response.send({unix:null,natural:null});
    response.end();
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
