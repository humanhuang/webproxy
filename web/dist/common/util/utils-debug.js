/*
2015-02-01 11:02:48
Author:humanhuang
Email:halfthink@163.com 
*/
define('common/util/template', function(){

    var cache = {};
    var tmpl = function(str, data){


        var fn = !/\W/.test(str) ?
            cache[str] = cache[str] ||
            tmpl(document.getElementById(str).innerHTML) :


            new Function("obj",
                "var p=[],print=function(){p.push.apply(p,arguments);};" +

                "with(obj){p.push('" +

                str
                    .replace(/[\r\t\n]/g, " ")
                    .split("<%").join("\t")
                    .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                    .replace(/\t=(.*?)%>/g, "',$1,'")
                    .split("\t").join("');")
                    .split("%>").join("p.push('")
                    .split("\r").join("\\'")
                + "');}return p.join('');");

        return data ? fn( data ) : fn;
    };

    return {
        parse: tmpl
    }
});
define('common/util/utilA', function() {


    return  {
        name:'utilA'
    }
});
define('common/util/utilB',['common/util/utilA'], function(UtilA) {


   return  {
        name:'utilB',
        dep:UtilA
    }
});