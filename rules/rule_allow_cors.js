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

    //delete res.headers["Access-Control-Allow-Credentials"];
    //delete res.headers["Access-Control-Allow-Origin"];
    //delete res.headers["Access-Control-Allow-Methods"];
    //delete res.headers["Access-Control-Allow-Headers"];

    //res.headers["access-control-allow-credentials"] = "true";
    res.headers["access-control-allow-origin"]      = "*";
    //res.headers["access-control-allow-methods"]     = "GET,POST,OPTIONS,HEAD,PUT,DELETE,TRACE,CONNECT";

    return res;
};
