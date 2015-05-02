Modify http request/response in javascript config file easily.

[![NPM version][npm-image]][npm-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/webproxy.svg?style=flat-square
[npm-url]: https://npmjs.org/package/webproxy
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/webproxy.svg?style=flat-square
[download-url]: https://npmjs.org/package/webproxy


![](https://i.alipayobjects.com/i/ecmng/png/201502/4LzAfblxIr.png)

### Web UI, Web Page Performance Analyze.

![](https://i.alipayobjects.com/i/ecmng/png/201503/4VlkyBwwqb.png)

### Console Info

![](https://i.alipayobjects.com/i/ecmng/png/201503/4Vlo4OV1oD.png)

Install
--------------

```
npm install -g webproxy
```


Quick Start
--------------

### 1、Normal start
```
$ webproxy start
```

### 2、Modify default LISTENING port
```
$ webproxy --port 9000 start
```

### 3、Use rule config file
```
$ webproxy start --rule rule.js
```

####  there are some sample rules at [./rules](http://git.oschina.net/human/webproxy/tree/master/rules)

### rule.js
use this rule.js to wrap define header in every javascript file.
```javascript
exports.request = function (req) {
      //req.hostname
      //req.path
      //req.method
      //req.headers

      req.headers.proxy = '*request inject new field by webproxy*';

      return req;
};

exports.response = function (req, res) {

      //req.location
      //req.hostname
      //req.path
      //req.method
      //req.headers

      //res.statusCode
      //res.headers
      //res.responseBuffer

      res.headers.proxy = '*wrap define header by webproxy*'

      if (/javascript/.test(res.headers['content-type'])) {
            res.responseBuffer = ';define(function(require, exports, module){' + res.responseBuffer + '});';
      }

      return res;
};
```


Use webproxy as a node module
--------------

var webproxy = require('webproxy')

webproxy.start({
            port: port,
            staticPort: 9001,
            websocketPort: 9002,
            useWebUI: true,
            useConsoleInfo: true,
            ruleModule: require("./path/ruleModule.js"),
      });


--------------

Author: human huang

QQ    : 316996367

Email : halfthink@163.com

交流Q群: 415719701
