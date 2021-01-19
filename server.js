// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

const port = process.env.PORT || 8080

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", (req, res) => {
  res.json({ greeting: 'hello API' });
});

app.get("/api/timestamp", (req, res) => {
  res.json({ unix: new Date().valueOf(), utc: new Date().toUTCString() })
})

app.get("/api/timestamp/:date", (req, res) => {
  const { date } = req.params

  if (/\d{5,}/.test(date)) {
    const dateInt = parseInt(date)
    res.json({ unix: dateInt.valueOf(), utc: new Date(dateInt).toUTCString() })

  } else {
    const dateString = new Date(date)
    if (dateString.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" })
    }
    res.json({ unix: dateString.valueOf(), utc: dateString.toUTCString() })
  }

})

// listen for requests :)
app.listen(port, () => console.log('Your app is listening on port ' + port));
