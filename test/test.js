// Import the dependencies for testing
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');

// Configure chai
chai.use(chaiHttp);
chai.should();
describe("OpenGraphParams", () => {
    describe("POST /ogp/scrape", () => {
        // Test to get all OGP details
        it("should get all OGP details from api", (done) => {
            chai.request(app)
                .post('/ogp/scrape')
                .send({ "URL": "https://www.npmjs.com/package/node-cache", "NEED_CACHE": "N" })
                .expect(200)
                .expect('Content-Type', /json/)
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
        it("should get all OGP details from cache", (done) => {
            chai.request(app)
                .post('/ogp/scrape')
                .send({ "URL": "https://www.npmjs.com/package/node-cache", "NEED_CACHE": "Y" })
                .expect(200)
                .expect('Content-Type', /json/)
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