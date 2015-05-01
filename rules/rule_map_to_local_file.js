exports.request = function (req) {
    //req.hostname
    //req.path
    //req.method
    //req.headers
    return req;
};


exports.response = function (req, res) {

    //req.location
    //req.hostname
    //req.path
    //req.method
    //req.headers

    //res.statusCode
    //res.headers
    //res.responseBuffer

    if( ~req.location.indexOf('aa.js')) {

        var fs = require('fs');
        console.log(process.cwd());
        console.log(__dirname);
        var mapedFile = fs.readFileSync(__dirname + '/content.js');
        res.responseBuffer = mapedFile;

        res.headers['content-type'] = 'application/x-javascript';
        res.headers['connection'] = 'keep-alive';
        res.statusCode = 200;

    }

    return res;
};