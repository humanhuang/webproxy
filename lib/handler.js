var g = require('../conf/g.js'),
      util = require('./util.js');

exports.processRequest = function (requestParams, record, rule) {

      record.push('beforeRequest', util.clone(requestParams));
      record.push('timing', {
            'beforeRequestTime': +new Date()
      });


      requestParams = rule.request(requestParams);
      //requestParams.info && timeMsgLog.push('Request Rule', requestParams.info);


      record.push('processRequest', util.clone(requestParams));
      record.push('timing', {
            'processRequestTime': +new Date()
      });


      return requestParams;
}

exports.processResponse = function (requestParams, statusCode, responseHeaders, responseBuffer, record, rule) {

      record.push('beforeResponse', util.clone(responseHeaders));
      record.push('timing', {
            'beforeResponseTime': +new Date()
      });

      var responseParams = {
            statusCode: statusCode,
            headers: responseHeaders,
            responseBuffer: responseBuffer
      };


      responseParams = rule.response(requestParams, responseParams);
      //responseParams.info && timeMsgLog.push('Response Rule', responseParams.info);


      record.push('processResponse', util.clone(responseHeaders));
      record.push('processResponse', {
            statusCode: statusCode
      });
      record.push('timing', {
            'processResponseTime': +new Date()
      });

      return responseParams;
}
