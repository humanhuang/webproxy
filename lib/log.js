var color = require('colorful'),
      date = require('date-utils');

var util = require('./util.js'),
      g = require('../conf/g.js');

function log(title, content, titleColor, contentColor, noPreTag) {

      content = content || '';
      titleColor = titleColor || 'cyan';
      contentColor = contentColor || 'green';
      var prefix = color.magenta_bg('  ');
      if (noPreTag == true) {
            prefix = '  ';
      }

      var date = '[' + ( new Date()).toFormat("HH:MI:SS") + ']';
      var combo = prefix + color.grey(date) + color[titleColor](' [' + title + ']') + ' ' + color[contentColor](content);
      console.log(combo);
}

function info(title, content, noPreTag) {
      log(title, content, null, null, noPreTag);
}
function error(errmsg, noPreTag) {
      log('Error', errmsg, 'red', null, noPreTag);
}
function red(title, content, noPreTag) {
      log(title, content, 'red', null, noPreTag);
}


function getTimeMsgLog() {

      var TimeMsgLog = function () {
            this.list = [];
      };

      TimeMsgLog.prototype = {
            push: function (name, content) {
                  this.list.push({
                        name: name,
                        content: content
                  });
            },

            print: function () {
                  var list = this.list;
                  for (var i in list) {
                        if (i == 0) {
                              info(list[i].name, list[i].content);
                        }
                        else {
                              info(list[i].name, list[i].content, true);
                        }

                  }
                  return;
            },
            writeLog: function () {
                  var ret = [];
                  for (var i in this.list) {
                        ret.push(this.list[i].name + '\n' + this.list[i].content);
                  }
                  //[33m
                  //[0m
                  ret = ret.join('\n').replace(/\[33m|\[0m/ig, '');
                  var name = String((new Date()).toFormat("YYYY_MM_DD__HH_MI_SS___")) + g.getLogIndex();

                  util.writeRequestLog(name + '.txt', ret, function (err) {
                        if (err) throw err;
                  });
            }
      }
      return new TimeMsgLog();
}

function getRecord() {

      var Record = function () {
            this.map = {};
      };

      Record.prototype = {
            push: function (field, obj) {
                  if (this.map[field]) {

                        if (Object.prototype.toString.call(obj) == "[object Object]") {
                              for (var i in obj) {
                                    this.map[field][i] = obj[i];
                              }
                        }

                  }
                  else {
                        this.map[field] = util.clone(obj);
                  }
            },

            print: function (filterArray) {

                  if (filterArray != undefined) {
                        var filterStr = filterArray.join(' ');
                  }

                  for (var i in this.map) {
                        if (!filterArray || (filterStr && filterStr.indexOf(i) != -1)) {
                              info(i, JSON.stringify(this.map[i], null, '\t'));
                        }
                  }
            },
            toString: function (isFormat) {
                  var ret;
                  if(isFormat) {
                        ret = JSON.stringify(this.map, null, '\t');
                  }
                  else{
                        ret = JSON.stringify(this.map);
                  }
                  return ret;
            },
            clear: function() {
                  for(var i in this.map){
                        delete this.map[i];
                  }
            }
      }
      return new Record();
}

function getGlobalRecord() {
      return globalRecord;
};

var globalRecord = getRecord();

exports.info = info;
exports.error = error;
exports.red = red;
exports.getTimeMsgLog = getTimeMsgLog;
exports.getRecord = getRecord;
exports.getGlobalRecord = getGlobalRecord;