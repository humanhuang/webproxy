var baseUrl = 'http://localhost:9001/static/src/';

if (window.isDist) {
      baseUrl = 'http://localhost:9001/static/dist/';
}

if (location.href.indexOf('debug=1') != -1) {
      var baseUrlParam = location.search.match(/baseUrl=(.*)/);
      if (baseUrlParam != null) {
            baseUrl = baseUrlParam[1];
      }
      else {
            throw new Error('Please add baseUrl Param to URL Location!');
      }
}

require.config({
      baseUrl: baseUrl
      //paths: {
      //      'compute': 'compute/main'
      //}
      //urlArgs: "r=" +  (new Date()).getTime()23
});