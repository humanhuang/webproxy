var fs = require('fs'),
    http = require('http'),
    Ws = require('ws'),
    express = require('express'),
    path = require('path');

var log = require('./lib/log');


var   staticPort = 9001,
    websocketPort = 9002;


var staticServer;
var wsServer;

function start(staticPort, websocketPort) {
    startStaticServer(staticPort);
    startWebsocketServer(websocketPort);
    return wsServer;
}
function startStaticServer(port) {
    port = port || staticPort;

    var app = express();
    staticServer = http.Server(app);
    staticServer.listen(port);

    app.use('/static', express.static(__dirname + '/web'));

    log.info('web ui', "is running at 127.0.0.1:" + staticPort);

}

function startWebsocketServer(port) {
    port = port || websocketPort;

    wsServer = new Ws.Server({ port: port });

    wsServer.send = wsServer.broadcast = function(data) {
        for(var i in this.clients){
            this.clients[i].send(data);
        }
    }

    wsServer.on("connection",function(ws){
        //incoming
        ws.on('message', function(message) {
            wsServer.broadcast(JSON.stringify(message));
        });

    });

    log.info('Websocket', "is running at 127.0.0.1:" + websocketPort);
}
exports.start = start;
