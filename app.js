App({
    //生命周期函数--监听小程序初始化(全局只触发一次)
    onLaunch: function () {
      console.log('小程序初始化,全局只触发一次');
    },
    //生命周期函数--监听小程序显示(小程序显示或者从后台切入)
    onShow: function () {
      console.log('小程序显示,小程序显示或者从后台切入');
    },
    //生命周期函数--监听小程序隐藏(小程序从前台进入后台)
    onHide: function () {
      console.log('小程序隐藏,小程序从前台进入后台');
    },
    //小程序发生错误
    onError: function (msg) {
      console.log(msg);
    }
});