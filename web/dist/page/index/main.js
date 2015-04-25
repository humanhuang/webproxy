/*
2015-02-01 11:02:48
Author:humanhuang
Email:halfthink@163.com 
*/
define("page/index/main",["common/lib/jquery"],function(n){var o=new WebSocket("ws://localhost:9002");o.on=o.addEventListener,o.on("open",function(){}),o.on("message",function(n){console.log(JSON.parse(n.data))}),o.on("close",function(){}),o.on("error",function(){}),n("#outgoingChatMessage").keyup(function(e){if(13==e.keyCode){var i=n(this).val();o.send(i),n(this).val("")}});var e=function(){console.log("init")};return{init:e}});