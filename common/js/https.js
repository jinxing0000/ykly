const apiHost="http://127.0.0.1:8081/api";
var requestCount={};
var verifyCount={};
/**
   * 接口公共访问方法
   * @param {Object} urlPath 访问路径
   * @param {Object} params 访问参数（json格式）
   * @param {Object} requestType 请求类型（默认POST）
   * @param {Object} onSuccess 成功回调
   * @param {Object} onErrorBefore 失败回调
   * @param {Object} onComplete 请求完成（不管成功或失败）回调
   * @param {Object} isVerify 是否验证重复提交
   * @param {Object} retry 访问失败重新请求次数（默认1次）
   */
function request(urlPath, params, requestType, onSuccess,onErrorBefore,title,isVerify,retry){
   wx.showLoading({
     title: title+'...',
   })
   isVerify = isVerify ? isVerify : false;
   var that = this;
   //防止重复提交，相同请求间隔时间不能小于500毫秒
   var nowTime = new Date().getTime();
   if (requestCount[urlPath] !=null && (nowTime - requestCount[urlPath]) < 500) {
     return;
   }
   requestCount[urlPath] = nowTime;
   //验证是否重复提交
   if (isVerify) {
     verifyCount[urlPath] = true; //重复验证开关开启
   }
   console.log("发起网络请求, 路径:" + (apiHost + urlPath) + ", 参数:" + JSON.stringify(params));
   wx.request({
     url: apiHost + urlPath,
     data: params,
     method: requestType, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
     header: {
       'content-type':'application/json'
     }, // 设置请求的 header
     success: function (res) {
       console.log("返回结果：" + JSON.stringify(res.data));
       if (res.statusCode==200) {
         if (res.data.errorCode==0){
           onSuccess(res.data.resultData);
           wx.hideLoading();
         }else{
           onErrorBefore(res.data);
           wx.hideLoading();
         }
         
       } else {
         wx.hideLoading();
         wx.showModal({
           content: res.errMsg,
           showCancel: false,
           success: function (res) {
             if (res.confirm) {
                
             }
           }
        });
       }
     },
     //请求出错执行
     fail: function (res) {
       console.log("网络访问失败：" + JSON.stringify(res));
       wx.hideLoading();
       wx.showModal({
         content: '网络错误，请检查网络',
         showCancel: false,
         success: function (res) {
           if (res.confirm) {
             if (retry > 0) {
               console.log("retry", retry);
               retry = retry - 1;
               request(urlPath, params, requestType, isVerify, retry);
             } else {
               verifyCount[urlPath] = false;
             }
             
           }
         }
       });
     },
     complete: function (res) {
       //onComplete(requestCode);
       //请求完成后，2秒后重复验证的开关关闭
       if (isVerify) {
         setTimeout(function () {
           verifyCount[urlPath] = false;
         }, 2000);
       }
     }
   })
}
module.exports = {
  request: request
}