var http = require('http'),
    https = require('https'),
    exec = require('child_process').exec,
    Url = require('url'),
    color = require('colorful'),
    fs = require('fs'),
    date = require('date-utils');

var log = require('./log.js'),
    handler = require('./handler'),
    g = require('./../conf/g'),
    util = require('./util.js'),
    web = require('./web.js');



var defaultPort = 9000,
    staticPort = 9001,
    websocketPort = 9002;

exports.start = start;
function start(port, ruleModule) {
      port = port || defaultPort;

      log.info('proxy', "is running at 127.0.0.1:" + port);

      //websocket UIweb
      var ws = web.start(staticPort, websocketPort);

      //auto open web broswer
      exec('open http://127.0.0.1:' + staticPort + '/static', function (error, stdout, stderr) {
            if (error !== null) {
                  console.log('exec error: ' + error);
            }
      });

      //var options = {
      //      key: fs.readFileSync('cakey.pem'),
      //      cert: fs.readFileSync('cacert.pem')
      //};

      //https.createServer(options, function (requestClient, responseClient) {

      http.createServer(function (requestClient, responseClient) {

            delete requestClient.headers['accept-encoding'];
            delete requestClient.headers['if-modified-since'];
            delete requestClient.headers['cache-control'];
            delete requestClient.headers['if-none-match'];

            //日志
            var timeMsgLog = log.getTimeMsgLog();

            //var record = log.getGlobalRecord();
            var record = log.getRecord();


            var fileSuffix = color.yellow('[' + util.getFileSuffix(requestClient.url) + '] ');
            //Location日志
            timeMsgLog.push('Location', fileSuffix + requestClient.url);

            var urlObj = Url.parse(requestClient.url, true);

            var requestParams = {
                  location: requestClient.url,
                  host: urlObj.hostname,
                  path: urlObj.path,
                  method: requestClient.method,
                  headers: requestClient.headers
            };

            //处理请求头
            requestParams = handler.processRequest(requestParams, record, ruleModule);

            timeMsgLog.push('Request Header', JSON.stringify(requestParams.headers, null, '\t'));

            sendRequest({
                  hostname: requestParams.host,
                  path: requestParams.path,
                  method: requestParams.method || 'GET',
                  headers: requestParams.headers
            });


            function sendRequest(options) {
                  var resData = [];

                  var req = http.request(options, responseCallback);

                  //var req = https.request(options, responseCallback);

                  req.on("error", function (e) {
                        log.error('problem with request: \n' + JSON.stringify(e, null, '\t'));
                  });

                  req.end();

                  function responseCallback(response) {

                        //response.setEncoding('utf8');

                        //delete response['content-encoding'];
                        //delete response['content-length'];

                        response.on('data', function (chunk) {

                              //var str = iconv.decode(chunk, 'GBK');

                              resData.push(chunk);
                        });

                        response.on('end', function () {

                              var statusCode = this.statusCode,
                                  headers = this.headers;

                              var responseBuffer = Buffer.concat(resData);

                              //if(/html|text|javascript|json/.test(headers['content-type'])) {
                              //
                              //      responseBuffer = responseBuffer.toString().replace(/'/g, '\'').replace(/"/g, '\"');
                              //
                              //      record.push('responseBody', responseBuffer);
                              //
                              //}
                              //else if(false) {
                              //      // image
                              //}


                              var responseProcessed = handler.processResponse(requestParams, statusCode, headers, responseBuffer, record, ruleModule);

                              //responseProcessed.headers['content-length'] = responseProcessed.responseBuffer.length;

                              delete responseProcessed.headers['content-length'];

                              responseClient.writeHead(responseProcessed.statusCode, responseProcessed.headers);
                              responseClient.end(responseProcessed.responseBuffer);



                              timeMsgLog.push('Response Header', JSON.stringify(responseProcessed.headers, null, '\t'));

                              //"text/html; charset=utf-8"
                              //"image/png"
                              //"application/x-javascript"
                              //"application/json; charset=utf-8"
                              //"image/gif"
                              //"text/css; charset=utf-8"


                              //console.log(responseProcessed.responseBuffer.toString());

                              ws.send(record.toString());


                              timeMsgLog.print();
                        });
                        response.on('error', function (e) {
                              log.error('problem with response: \n' + JSON.stringify(e, null, '\t'));
                        });

                  };

            }


      }).listen(port);

}
//npm version patch