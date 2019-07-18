# OGP-SCRAPER

This module is for scraping details from given url. Here used one npm for achieve it details are following. In here i covered server cache and unit test also.

## Getting Started

Follow the following instruction for using this module.

### Prerequisites

For use this module you need to have nodejs in your machine and following npm are used.

```
express
body-parser
open-graph-scraper
node-cache
```

Following are optional

```
mocha
chai
chai-http
```

### Installing

After download you just use the following command to install them.

```
npm install
```

## Running the sample

At here i will give an sample request and response see following.

After download and install all dependencies start the service using following command
```
npm start
```
Now service is listning in port 1991

Use the following request url for scraping
```
http://localhost:1991/ogp/scrape
```

Sample Request
```
{
    "URL": "https://www.npmjs.com/package/node-cache",
    "NEED_CACHE": "Y"
}
```
explanation


Sample Response
```
{
    "data": {
        "ogDescription": "Simple and fast NodeJS internal caching. Node internal in memory cache like memcached.",
        "ogTitle": "node-cache",
        "ogUrl": "https://www.npmjs.com/package/node-cache",
        "ogSiteName": "npm",
        "twitterCard": "summary",
        "twitterTitle": "npm: node-cache",
        "twitterDescription": "Simple and fast NodeJS internal caching. Node internal in memory cache like memcached.",
        "ogImage": {
            "url": "https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png",
            "width": null,
            "height": null,
            "type": null
        }
    },
    "success": true,
    "requestUrl": "https://www.npmjs.com/package/node-cache"
}
```

### Running the test

After download you just use the following command for run unit test.

```
npm test
```

## Authors

* **Ramprasath S** - *Initial work* - [ogp-scrape](https://github.com/ramprasathsoft/ogp-scrape)