// Import the dependencies for testing
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');

// Configure chai
chai.use(chaiHttp);
chai.should();
describe("OpenGraphParams", () => {
    describe("POST /ogp/scrape", function () {
        this.timeout(150000); //total test timeout 2.5 min
        // Test to get all OGP details
        it("should get all OGP details from api without cache", (done) => {
            chai.request(app)
                .post('/ogp/scrape')
                .timeout(60000) //timeout for this call 1min
                .send({ "URL": "https://www.npmjs.com/package/node-cache", "NEED_CACHE": "N" })
                .end(function (err, res) {
                    if (err) done(err);
                    res.body.should.have.property('success', true);
                    res.body.should.have.property('requestUrl', "https://www.npmjs.com/package/node-cache");
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('ogTitle', 'node-cache');
                    done();
                });
        });

        // Test to get all OGP details
        it("should get all OGP details and set to cache", (done) => {
            chai.request(app)
                .post('/ogp/scrape')
                .timeout(60000) //timeout for this call 1min
                .send({ "URL": "https://www.npmjs.com/package/node-cache", "NEED_CACHE": "Y" })
                .end(function (err, res) {
                    if (err) done(err);
                    res.body.should.have.property('success', true);
                    res.body.should.have.property('requestUrl', "https://www.npmjs.com/package/node-cache");
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('ogTitle', 'node-cache');
                    done();
                });
        });

        // Test to get all OGP details
        it("should get all OGP details get from cache", (done) => {
            chai.request(app)
                .post('/ogp/scrape')
                .timeout(10000) //get response from cache max time 10sec
                .send({ "URL": "https://www.npmjs.com/package/node-cache", "NEED_CACHE": "Y" })
                .end(function (err, res) {
                    if (err) done(err);
                    res.body.should.have.property('success', true);
                    res.body.should.have.property('requestUrl', "https://www.npmjs.com/package/node-cache");
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('ogTitle', 'node-cache');
                    done();
                });
        });
    });
});
