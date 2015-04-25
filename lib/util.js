var fs = require('fs');
    conf = require('../conf/conf.js'),
    log = require('./log.js');


exports.merge = function(){
      var objs = Array.prototype.slice.call(arguments);
      var obj, retObj = {};
      for(var i = 0; i < objs.length; i++) {
            obj = objs[i];

            for(var name in obj) {
                  retObj[name] = obj[name];
            }

      }
      return retObj;
}

exports.clone = function (obj) {
      var o;
      if (typeof obj == "object") {
            if (obj === null) {
                  o = null;
            } else {
                  //array
                  if (obj instanceof Array) {
                        o = [];
                        for (var i = 0, len = obj.length; i < len; i++) {
                              o.push(arguments.callee(obj[i]));
                        }
                        //date
                  } else if (Object.prototype.toString.call(obj) == "[object Date]") {
                        return new Date(obj.toString());
                  } else {
                        //object
                        o = {};
                        for (var k in obj) {
                              if(obj.hasOwnProperty(k)){
                                    o[k] = arguments.callee(obj[k]);
                              }
                        }
                  }
            }
      } else {
            o = obj;
      }
      return o;
}

exports.lowerKeys = function(obj){
      for(var key in obj){
            var val = obj[key];
            delete obj[key];

            obj[key.toLowerCase()] = val;
      }
      return obj;
}

exports.getFileSuffix = function(location){
      var suffix;
      try {
            suffix = location.match(/\.([^.]+)$/)[1].split('?')[0];
      } catch (e) {
            suffix = 'unknow';
      }
      return suffix;
};

//domain/datetime_random/
exports.mkdirIfNotExist = function(pathString) {
      if(fs.existsSync(pathString)) {
            return;
      }
      var paths =pathString.split('/') ;
      paths.pop();

      var path, currentPath = '';
      for(var i in paths) {
            path = paths[i];

            if(i == 0){
                  currentPath = path;
            }
            else {
                  currentPath = currentPath + '/' + path;
            }

            if( !fs.existsSync(currentPath)) {
                  fs.mkdirSync(currentPath);
            }
      }
}

exports.write = function(path, content, callback) {
      exports.mkdirIfNotExist(path);
      fs.writeFile(path, content, callback);
}

exports.writeLog = function(path, content, callback) {
      exports.mkdirIfNotExist(conf.logPath);
      exports.write(conf.logPath + path, content, callback);
}


//path  = domain/datetime_random/
exports.writeRequestLog = function(name, content, callback) {
      exports.mkdirIfNotExist(conf.logPath + name);
      exports.write(conf.logPath + name, content, callback);
}

exports.getRandom = function(prefix, suffix) {
      prefix = prefix || '';
      suffix = suffix || '';
      return prefix + String(Math.random()).slice(2) + suffix;
}