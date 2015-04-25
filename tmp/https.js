var http = require('http'),
      https = require('https'),
      Url = require('url'),
      color = require('colorful'),
      fs = require('fs'),
      date = require('date-utils');

var log = require('./lib/log.js'),
      rule = require('./rule.js'),
      util = require('./lib/util.js');



function start() {
      log.info('Server', "Start!");

      var options = {
            key: fs.readFileSync('privatekey.pem'),
            cert: fs.readFileSync('certificate.pem')
      };

      https.createServer(options, function (requestClient, responseClient) {

            log.info('incoming');

            delete requestClient.headers['accept-encoding'];

            //日志
            var timeMsgLog = log.timeMsgLog();


            var fileSuffix = color.yellow('[' + util.getFileSuffix(requestClient.url) + '] ');
            //Location日志
            timeMsgLog.push('Location', fileSuffix + requestClient.url);

            var urlObj = Url.parse(requestClient.url, true);

            var requestParams = {
                  host: urlObj.hostname,
                  path: urlObj.path,
                  method: requestClient.method,
                  headers: requestClient.headers,
                  port:443,
                  _href: urlObj.href,
                  _pathName: urlObj.pathname,
                  _protocol: urlObj.protocol, //"http:"
                  _queryObj: urlObj.query
            };
            //
            ////处理请求头
            //requestParams = processRequest(requestParams);
            //
            ////请求头日志
            timeMsgLog.push('Request Header', JSON.stringify(requestParams, null, '\t'));
            //
            sendRequest({
                  hostname: requestParams.host,
                  port:443,
                  path: requestParams.path,
                  method: requestParams.method || 'GET',
                  _href: requestParams._href,
                  headers: requestParams.headers,
            });

            function processRequest(requestParams) {

                  requestParams = rule.request(requestParams);
                  requestParams.info && timeMsgLog.push('Request Rule', requestParams.info);
                  return requestParams;
            }

            function processResponse(statusCode, headers, responseBuffer) {

                  var responseParams = {
                        statusCode: statusCode,
                        headers: headers,
                        responseBuffer: responseBuffer
                  };

                  responseParams = rule.response(requestParams, responseParams);
                  responseParams.info && timeMsgLog.push('Response Rule', responseParams.info);

                  return responseParams;
            }


            function sendRequest(options) {
                  var resData = [];

                  var req = https.request(options, responseCallback);

                  req.on("error", function (e) {
                        log.error('problem with request: \n' + JSON.stringify(e, null, '\t'));
                  });

                  req.end();

                  function responseCallback(response) {

                        response.on('data', function (chunk) {
                              resData.push(chunk);
                        });

                        response.on('end', function () {

                              // this : response<IncomingMessage>

                              var statusCode = this.statusCode,
                                    headers = this.headers;

                              var responseBuffer = Buffer.concat(resData);

                              var responseProcessed = processResponse(statusCode, headers, responseBuffer);

                              responseClient.writeHead(responseProcessed.statusCode, responseProcessed.headers);
                              responseClient.end(responseProcessed.responseBuffer);

                              //响应头日志
                              timeMsgLog.push('Response Header', JSON.stringify(responseProcessed.headers, null, '\t'));

                              timeMsgLog.print();

                              timeMsgLog.writeLog();


                        });
                        response.on('error', function (e) {
                              log.error('problem with response: \n' + JSON.stringify(e, null, '\t'));
                        });

                  };

            }


      }).listen(8000);


}

start();
//test();
function test() {
}
//npm version patch