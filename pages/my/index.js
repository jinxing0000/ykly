var https = require('../../common/js/https.js')
Page({
  data: {
     userData:{
         
     },
     showUserInfo:true
  },
  //监听页面加载
  onLoad: function (options) {
    console.log('页面加载时调用');
  },
  //监听页面初次渲染完成
  onReady: function () {
    console.log('页面初次渲染完成时调用');
  },
  //监听页面显示
  onShow: function () {
    console.log('页面显示时调用');
    var page=this;
    var userInfo = wx.getStorageSync('userInfo');
    var sessionId = wx.getStorageSync('sessionId');
    console.log(sessionId);
    if (sessionId== "") {
        this.login();
    }else{
      this.setData({
        "userData": userInfo,
        "showUserInfo": true
      });
    }
  },
  //监听页面隐藏
  onHide: function () {
    console.log('页面隐藏时调用');
  },
  //监听页面卸载
  onUnload: function () {
    console.log('页面卸载时调用');
  },
  //监听用户下拉动作
  onPullDownRefresh: function () {
    console.log('用户下拉时调用');
  },
  //页面上拉触底事件的处理函数
  onReachBottom: function () {
    console.log('页面上拉时调用');
  },
  //用户点击右上角转发
  onShareAppMessage: function () {
    console.log('用户点击右上角转发时调用');
  },
  //页面滚动触发事件的处理函数
  onPageScroll: function () {
    console.log('页面滚动调用');
  },
  //用户输入手机号
  phoneInput:function(e){
    this.setData({
      "userData.phone": e.detail.value
    })
  },
  //用户注册
  register:function(){
    var phone=this.data.userData.phone;
    if (typeof (phone) == "undefined") {
      wx.showModal({
        content: "手机号不能为空",
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
              
          }
        }
      });
        return ;
    } 
    console.log(phone);
    var page=this;
    //获取登录的code值
    wx.login({
      success: function (res) {
        var code = res.code;
        if (code) {
          wx.getUserInfo({
            success: function (res) {
              var userInfo = res.userInfo; //用户基本信息
              userInfo.code=code;
              userInfo.phone = page.data.userData.phone;
              https.request('/wechat/register', userInfo, "POST", function onSuccess(data) {
                  page.setData({
                    "userData": data.userInfo,
                    "showUserInfo": true
                  })
                  wx.setStorageSync('sessionId', data.sessionId);
                  wx.setStorageSync('userInfo', data.userInfo);
              }, onErrorBefore,'注册中', false, 2);
              var onErrorBefore = function onErrorBefore(data){
                  wx.showModal({
                    content: data.errorMessage,
                    showCancel: false,
                    success: function (res) {
                      if (res.confirm) {
                          
                      }
                    }
                  });
              }
            }
          })
        } else {
          console.log('获取用户登录态失败：' + res.errMsg);
        }
      }
    });
  },
  login:function(code){
      console.log('执行登陆');
      var page=this;
      wx.login({
        success: function (res) {
          var code = res.code;
          if (code) {
            var data={code:code};
            https.request('/wechat/login', data , "POST", function onSuccess(data) {
              page.setData({
                "userData": data.userInfo,
                "showUserInfo": true
              })
              wx.setStorageSync('sessionId', data.sessionId);
              wx.setStorageSync('userInfo', data.userInfo);
            }, onErrorBefore, '登陆中', false, 2);
            function onErrorBefore(data) {
              if (data.errorCode==25){
                page.setData({
                  "showUserInfo": false
                });
              }
              wx.showModal({
                content: data.errorMessage,
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {

                  }
                }
              });
            }
          } else {
            console.log('获取用户登录态失败：' + res.errMsg);
          }
        }
      });
  }
})