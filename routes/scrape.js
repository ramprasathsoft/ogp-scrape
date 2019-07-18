var express = require('express');
var router = express.Router();
var nodeCache = require("node-cache");
var crypto = require('crypto');

var myCache = new nodeCache();
var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
var key = 'ogp_pass_key';

var ogs = require('open-graph-scraper');

function cacheHelper(req, res, next) {
    var params = req.body;
    if (params.NEED_CACHE == 'Y') {
        var key = encString(JSON.stringify(params));
        myCache.get(key, function (error, value) {
            if (!error) {
                if (!value) {
                    next();
                } else {
                    console.log("send from cache");
                    res.send(value);
                }
            } else {
                console.log(error); //cache error
                next();
            }
        });
    } else {
        next();
    }
}

function encString(str) {
    var cipher = crypto.createCipher(algorithm, key);
    var encrypted = cipher.update(str, 'utf8', 'hex') + cipher.final('hex');
    return encrypted;
}

router.post('/scrape', cacheHelper, function (req, res) {
    try {
        var params = req.body;
        var options = { 'url': params.URL };
        ogs(options, function (error, results, response) {
            if (error) {
                console.log('error:', error); // This is returns true or false. True if there was a error. The error it self is inside the results object.
                res.send(error);
            } else {
                console.log("send from api");
                sendResponse(res, params, results);
            }
        });
    } catch (error) {
        res.send(error);
    }
});

function sendResponse(res, params, data) {
    if (params.NEED_CACHE == 'Y') {
        var key = encString(JSON.stringify(params));
        myCache.set(key, data, function (error, success) {
            if (success) {
                console.log('cache set done');
            } else {
                console.log(error); //cache error
            }
            res.send(data);
        });
    } else {
        res.send(data);
    }
}

module.exports = router;