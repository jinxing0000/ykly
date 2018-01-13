Page({
  data: {
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
  }
})