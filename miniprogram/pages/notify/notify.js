// pages/notify/notify.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTab: ["动漫", "游戏"],
    currentNavtab: "0",
    caton:[
      {
        "id":"ct1",
        "title":"动漫第一期",
        "writer":"牛逼鸭",
        "pic":"http://www.dmoe.cc/random.php",
        "web":"https://mp.weixin.qq.com/s/4-T2ur-ijhWa7G9yjBxYVQ"
      },
      {
        "id":"ct2",
        "title":"动漫第二期",
        "writer":"牛逼鸭",
        "pic":"http://www.dmoe.cc/random.php",
        "web":"https://mp.weixin.qq.com/s/u_5ESAy9ISILgg5eciWDwA"
      },
      {
        "id":"ct3",
        "title":"动漫第三期",
        "writer":"牛逼鸭",
        "pic":"http://www.dmoe.cc/random.php",
        "web":"https://mp.weixin.qq.com/s/6H9zUWaSPxfhtJWYOXwoOQ"
      },
    ],
    game:[
      {
        "id":"gm1",
        "title":"游戏第一期",
        "writer":"牛逼鸭",
        "pic":"http://www.dmoe.cc/random.php",
        "web":"https://mp.weixin.qq.com/s/4-T2ur-ijhWa7G9yjBxYVQ"
      },
      {
        "id":"gm2",
        "title":"游戏第二期",
        "writer":"牛逼鸭",
        "pic":"http://www.dmoe.cc/random.php",
        "web":"https://mp.weixin.qq.com/s/u_5ESAy9ISILgg5eciWDwA"
      },
      {
        "id":"gm3",
        "title":"游戏第三期",
        "writer":"牛逼鸭",
        "pic":"http://www.dmoe.cc/random.php",
        "web":"https://mp.weixin.qq.com/s/6H9zUWaSPxfhtJWYOXwoOQ"
      },
    ],
    mask:false
  },

  switchTab: function(e){
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
    console.log(e.currentTarget.dataset.idx)
    var color=''
    if (e.currentTarget.dataset.idx==0){
      color='#FF1493'
    }
    else{
      color='#298DE5'
    }
    wx.setNavigationBarColor({
      frontColor: '#ffffff', // 必写项
      backgroundColor: color, // 必写项
      animation: { // 可选项
          duration: 200,
          timingFunc: 'easeIn'
      }
  })
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
    if(!app.globalData.stop){
      this.setData({
        mask:true
      })
      wx.showToast({
        title: '请学完后再来',
        icon: 'error',
        duration: 2000
       })
      console.log("还在学习中...")
      setTimeout((function callback() {
        wx.switchTab({
          url: '../index/index',
        })
    }).bind(this), 2000);
    }
    else{
      this.setData({
        mask:false
      })
      console.log("歇着")
    }
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
  pageDetail: function (data) {
    var data = data.currentTarget.dataset
    console.log(data)
    wx.navigateTo({
      url: '../detail/detail?id=' + data.id+'&title='+data.title+'&writer='+data.writer+'&pic='+data.pic+'&web='+data.web,
    })
  },
})