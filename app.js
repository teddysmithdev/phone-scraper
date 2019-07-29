const express = require('express');
const cheerio = require('cheerio');
const request = require('request');
const app = express();

const regex = /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?/img;
const options = {
  url: 'https://www.google.com/search?q=teddy+smith+910',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'
  }
};

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// this url will return the data our page needs
app.get('/results', function(req, res) {

  // we're using the request library to get the HTML of the page.
  request(options, function (err, response, body) {

    if (err) {
      console.error(err);
      res.status(500);
      res.end('server error');
      return;
    }


    let $ = cheerio.load(body);
    var descriptionGrab = $('.st').text().match(regex)
    var itemList = [];
    for (i = 0; i < descriptionGrab.length; i++) {
      descriptionGrab[i] += itemList
    }

    res.json(descriptionGrab);
  });

});

// listen for requests :)
const listener = app.listen(3000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
