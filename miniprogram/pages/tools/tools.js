// pages/tools/tools.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tools:[{
      name:"计算",
      pic:"../../images/icon/计算器.png",
      css:"box1",
      url:"../counter/counter"
    },
    {
      name:"日历",
      pic:"../../images/icon/日历.png",
      css:"box2",
      url:"../calendarV2/index"
    },
    {
      name:"素材",
      pic:"../../images/icon/账户.png",
      css:"box3",
      url:"../getpic/getpic"
    },
  ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  gotools:function(e){
    var url = e.currentTarget.dataset.url
    console.log("跳转对应工具")
    wx.navigateTo({
      url: url,
    })
  }
})