#!/usr/bin/env node
var program = require('commander'),
      color = require('colorful'),
      fs = require('fs'),
      rule = require('./rules/rule.js'),
      package = require('./package.json'),
      proxy = require('./lib/proxy');

program
      .version(package.version)
      .option('-r, --rule [path]', 'path for rule file')
      .option('-p, --port [int]', 'use specify port')
      .parse(process.argv);


program.on('--help', function () {
      console.log('  Examples:');
      console.log('webproxy start');
      console.log('webproxy start --rule rule.js');
      console.log('webproxy start --port 9000');
});

var firstArgs = program.args[0];


var ruleFile = program.rule || null;
var port = program.port || 9000;

var absRulePath, ruleModule;
if (ruleFile) {

      switch (ruleFile[0]) {
            //   /rule.js
            case '/':
                  absRulePath = ruleFile;
                  break;
            //   ./rule.js
            case '.':
                  absRulePath = process.cwd() + '/' + ruleFile.slice(2);
                  break;
            //   rule.js
            default:
                  absRulePath = process.cwd() + '/' + ruleFile;
                  break;
      }
      if (fs.existsSync(ruleFile)) {
            ruleModule = require(absRulePath);
      }
}

if (!ruleModule) {
      ruleModule = {};
      ruleModule.request = function (req) {
            return req;
      };
      ruleModule.response = function (req, res) {
            return res;
      }
}

if (firstArgs == 'start') {
      proxy.start(port, ruleModule);
      return;
}
//magenta', 'cyan'
console.log('\nWelcome to use '+ color.magenta('Webproxy') + ' ' + package.version);
console.log(color.yellow('*You can modify your http request/response in javascript file easily') + '\n');

console.log('Usage:\n');
console.log('     -p, --port [int]    use specify port');
console.log('     -r, --rule [javascript file path]   path for rule file');

console.log('\nExamples:\n');
console.log('     webproxy start');
console.log('     webproxy start --rule rule.js');
console.log('     webproxy start --port 9000');

console.log('\n\n'+ color.yellow('Author:human huang <halfthink@163.com>'));
console.log(color.yellow('QQ交流群:415719701') +'\n');