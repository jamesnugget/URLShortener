require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
var bodyparser = require("body-parser");

var links = {};//A database is post to be used here but...

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(bodyparser.urlencoded({extended: false}));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post("/api/shorturl", function(req, res){
  currkey = Object.keys(links).length;
  dictlink = req.body.url;
  if(dictlink.includes("http")){
    retjsn = {"original_url": dictlink, "short_url": currkey};
    res.json(retjsn);
  }else{
    res.json({"error": "invalid url"});
  }
  links[currkey]= req.body.url;
  
});

app.get("/api/shorturl/:shorturl", (req, res)=> {
  urlkey = req.params.shorturl;
  dictlink = links[urlkey];
  res.redirect(links[urlkey]);
  
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
