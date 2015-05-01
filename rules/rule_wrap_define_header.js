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
    res.headers.proxy = 'wrap define header by webproxy';

    if (/javascript/.test(res.headers['content-type'])) {
        res.responseBuffer = ';define(function(require, exports, module){' + res.responseBuffer + '});';
    }

    return res;
};
