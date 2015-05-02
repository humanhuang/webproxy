var g = require('../conf/g.js'),
      util = require('./util.js');

exports.processRequest = function (requestParams, record, ruleModule) {

      record.push('beforeRequest', util.clone(requestParams));
      record.push('timing', {
            'beforeRequestTime': +new Date()
      });

      if( ruleModule ) {
            requestParams = ruleModule.request(requestParams);
      }
      //requestParams.info && timeMsgLog.push('Request Rule', requestParams.info);


      record.push('processRequest', util.clone(requestParams));
      record.push('timing', {
            'processRequestTime': +new Date()
      });


      return requestParams;
}

exports.processResponse = function (requestParams, statusCode, responseHeaders, responseBuffer, record, ruleModule) {

      record.push('beforeResponse', util.clone(responseHeaders));
      record.push('timing', {
            'beforeResponseTime': +new Date()
      });

      var responseParams = {
            statusCode: statusCode,
            headers: responseHeaders,
            responseBuffer: responseBuffer
      };

      if( ruleModule ) {
            responseParams = ruleModule.response(requestParams, responseParams);
      }
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
