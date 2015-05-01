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


    res.headers.proxy = 'add comment by webproxy';

    if (/javascript/.test(res.headers['content-type'])) {
        res.responseBuffer = '/* webproxy change content start*/\n' + res.responseBuffer + '\n/* webproxy change content end*/';
    }

    return res;
};
