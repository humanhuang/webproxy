/*
2015-02-01 11:02:48
Author:humanhuang
Email:halfthink@163.com 
*/
define("common/util/template",function(){var n={},t=function(e,p){var r=/\W/.test(e)?new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+e.replace(/[\r\t\n]/g," ").split("<%").join("	").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("	").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');"):n[e]=n[e]||t(document.getElementById(e).innerHTML);return p?r(p):r};return{parse:t}});
define("common/util/utilA",function(){return{name:"utilA"}});
define("common/util/utilB",["common/util/utilA"],function(i){return{name:"utilB",dep:i}});