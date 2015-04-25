
//响应头日志
//timeMsgLog.push('Response Header', JSON.stringify(responseProcessed.headers, null, '\t'));

//timeMsgLog.print();

//timeMsgLog.writeLog();

//记录请求    --start
//var requestLog = util.merge(requestClient.headers, {
//      url: requestClient.url,
//      method: requestClient.method
//});
//
//var curDatetime = '' + (new Date()).toFormat("YYYY_MM_DD__HH_MI_SS");
//var hostName = urlObj.host.replace(/\./g, '_');
//util.writeRequestLog(hostName + '/' + curDatetime + '___' + util.getRandom(), JSON.stringify(requestLog, null, '\t'), function (err) {
//      if (err) throw err;
//});
//记录请求    --end