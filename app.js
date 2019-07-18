var express = require('express');
var scrape = require("./routes/scrape");
var bodyParser = require('body-parser'); //used for json request body content

var app = express();

app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: false
}));

app.use('/ogp', scrape); //added for routing

app.listen(1991, function () {
    console.log('app listening on port 1991');
});