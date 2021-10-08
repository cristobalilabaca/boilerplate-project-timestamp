// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", function(req, res) {
  console.log("hi")
  now = new Date;
  res.json({utc: now, unix: Date.now()});
})

app.get("/api/:date", function(req, res) {
  try {
    let date;
    if (!isNaN(req.params.date)) {
      date = new Date(parseInt(req.params.date));
    } else {
      date = new Date(req.params.date);
    }
    if (date == "Invalid Date") {
      res.json({ error: "Invalid Date"});
    } else {
      res.json({utc: date.toUTCString(), unix: date.getTime()});
    };
  } catch {
    res.json({ error : "error" });
  };
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
