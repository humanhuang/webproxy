/*
2015-02-01 11:02:48
Author:humanhuang
Email:halfthink@163.com 
*/
define('page/index/main',
      ['common/lib/jquery'],
      function ($) {

            var ws = new WebSocket("ws://localhost:9002");
            ws.on = ws.addEventListener;
            ws.on('open', function () {
            });

            ws.on('message', function (event) {
                  console.log(JSON.parse(event.data));
                  //var recieve ='<li>' + JSON.stringify(event.data) + '</li>';
                  //$('#incomingChatMessages').append(recieve);
            });

            ws.on('close', function (event) {

            });

            ws.on('error', function (event) {

            });


            //    ws.send('something');


            $('#outgoingChatMessage').keyup(function(e){
                  if(e.keyCode == 13) {
                        var value = $(this).val();
                        ws.send(value);
                        $(this).val('');
                  }
            });


            var init = function () {
                  console.log('init');
            };

            return {
                  init: init
            }
      });