define('common/config/errorcode', function(require, exports, module) {


    var errorMsg = {
        '-1': '服务器开小差了',
        '-2': '个人信息不完整哦',
        '-3': '参数错误',
        '-10': '服务器发生未知错误，赶快告诉薯队长吧',
        '-100': '登录态过期了，请重新登录吧',
        '-101': '未登录哦，请先登录吧',
        '-102': '您的账号处于禁言状态，请联系小红书微信号',
        '-200': '笔记发布重复了',
        '-201': '重复举报了',
        '-202': '重复购买贴纸',
        '-9000': '查找不到卖家',
        '-9001': 'email已经被注册过了',
        '-9002': '错误的登录密码',
        '-9003': '操作人不是订单所有者',
        '-9004': '非法的订单状态',
        '-9005': '错误的订单修改状态',
        '-9007': '操作人不是商品的所有者',
        '-9008': '商品不存在',
        '-9009': '该商品已被删除，无法操作',
        '-9010': '该商品已下架，无法操作',
        '-9011': '该Facebook已经被绑定过',
        '-9012': '该微博已经被绑定过',
        '-9013': '该微信已经被绑定过',
        '-9014': '该订单已经被支付过',
        '-9015': '订单已过期',
        '-9016': '购物车中的卖家不是同一个',
        '-9017': '商品不在购物车中',
        '-9018': '购物车为空',
        '-9019': '抢购已失效',
        '-9020': '小分队已失效或已经组满',
        '-9021': '已购买过此抢购，每人限购一件',
        '-9022': '已购买过此促销，每人限购一件',
        '-9023': '该商品已售完，下次赶早哦亲',
        '-9024': '收货人信息格式错误',
        '-9028': '此抢购暂不支持此支付方式'
    }

    module.exports = errorMsg;
});