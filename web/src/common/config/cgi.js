define('common/config/cgi', function(require, exports, module) {


    var CGI =
    {
        'getDiscoveryList': 'http://<%=domain%>/api/discovery/list2',//获取笔记列表
        'getDiscoveryTopics': 'http://<%=domain%>/api/discovery/topics',//获取笔记所有主题
        'follow': 'http://<%=domain%>/api/discovery/like',//关注
        'unfollow': 'http://<%=domain%>/api/discovery/dislike',//取消关注
        'uploadImage': 'http://<%=domain%>/api/upload_image',//上传图片
        'createDiscovery': 'http://<%=domain%>/api/discovery/create',//创建笔记
        'getDisCoveryDetail': 'http://<%=domain%>/api/discovery/item',//获取笔记详情
        'getComment': 'http://<%=domain%>/api/discovery/get_comment',//获取评论
        'saveComment': 'http://<%=domain%>/api/discovery/save_comment',//保存评论
        'deleteComment': 'http://<%=domain%>/api/discovery/delete_comment',//删除评论
        'reportToTeam': 'http://<%=domain%>/api/discovery/usr/report',//举报
        'resetPassword': 'http://<%=domain%>/api/s1/seller/reset_password',//重置密码
        'getAllRankData': 'http://<%=domain%>/api/topranking/data',//获取总榜排名数据
        'addCart' : 'http://<%=domain%>/api/shopping_cart/add',//添加购物车商品
        'getCart' : 'http://<%=domain%>/api/shopping_cart/get',//获取购物车商品信息
        'getTransPrice' : 'http://<%=domain%>/api/order/trans_price',//获取运费数量
        'removeCart' : 'http://<%=domain%>/api/shopping_cart/remove',//删除购物车商品
        'addCart' : 'http://<%=domain%>/api/shopping_cart/add',//添加购物车商品
        'editCart2' : 'http://<%=domain%>/api/shopping_cart/edit2',//编辑购物车商品
        'orderGet' : 'http://<%=domain%>/api/order/user_info/get',//获取用户订单的地址信息
        'orderSave' : 'http://<%=domain%>/api/order/user_info/save',//保存用户订单填的地址等信息
        'order' : 'http://<%=domain%>/api/order/create',//提交订单
        'getZoneData': 'http://<%=domain%>/api/zone'//获取省市区地址数据
    };

    var Domain = location.host;

    var uid = new Date().getTime();
    var CgiGet = {
        get : function(cgi, params, cache, domain)
        {
            var url = [CGI[cgi].replace('<%=domain%>', domain || Domain)];
            if(!url)
            {
                throw new Error('Cgi：' + cgi + ' 不存在');
                return;
            }
            if(cgi.indexOf('?') === -1)
            {
                url.push('?');
            }
            if( typeof params == 'string')
            {
                url.push(params);
            }
            else if( typeof params == 'object')
            {
                for(var key in params)
                {
                    url.push('&' + key + '=' + params[key]);
                }
            }
            if(!cache)
            {
                url.push('&_r=' + (++uid));
            }
            return url.join('');
        }
    };
    return CgiGet;

});