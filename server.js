// server.js
// where your node app starts

// init project
const express = require('express');
const moment=require("moment");
const app = express();

const port =process.env.PORT||8080

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/",  (req, res)=> {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", (req, res)=> {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp",(req,res)=>{
  res.json({unix:new Date().getTime(),utc:new Date().toUTCString()})
})

app.get("/api/timestamp/:date",(req,res)=>{
  const {date}=req.params
  const isDateValid = moment(new Date(date)).isValid()
  const isUnixDateValid=moment(new Date(parseInt(date))).isValid()

  if(isDateValid||isUnixDateValid){
    if(date.length > 12){
      res.json({unix: Math.round(new Date(parseInt(date)).getTime()),utc:new Date(parseInt(date)).toUTCString()})
    }else{
      res.json({unix: Math.round(new Date(date).getTime()),utc: new Date(date). toUTCString()})
    }
  }else{
    res.json({error:"Invalid Date"})  
  }

})

// listen for requests :)
app.listen(port, ()=>console.log('Your app is listening on port ' + port));
