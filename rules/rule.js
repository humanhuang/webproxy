exports.request = function (req) {
      //req.hostname
      //req.path
      //req.method
      //req.headers

      req.headers.proxy = '***webproxy*** 注入新字段';

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

      res.headers.proxy = '***hacked by *** webproxy';

      if (/javascript/.test(res.headers['content-type'])) {
            //res.responseBuffer = ';define(function(require, exports, module){' + res.responseBuffer + '});';
            res.responseBuffer = '/* webproxy change content start*/\n' + res.responseBuffer + '\n/* webproxy change content end*/';
      }

      return res;
};
