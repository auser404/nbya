// pages/notify/notify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTab: ["动漫", "游戏"],
    currentNavtab: "0",
    caton:[
      {
        "title":"动漫第一期",
        "pic":"",
        "web":"https://mp.weixin.qq.com/s/4-T2ur-ijhWa7G9yjBxYVQ"
      },
      {
        "title":"动漫第二期",
        "pic":"",
        "web":"https://mp.weixin.qq.com/s/u_5ESAy9ISILgg5eciWDwA"
      },
      {
        "title":"动漫第三期",
        "pic":"",
        "web":"https://mp.weixin.qq.com/s/6H9zUWaSPxfhtJWYOXwoOQ"
      },
    ],
    game:[
      {
        "title":"游戏第一期",
        "pic":"",
        "web":"https://mp.weixin.qq.com/s/4-T2ur-ijhWa7G9yjBxYVQ"
      },
      {
        "title":"游戏第二期",
        "pic":"",
        "web":"https://mp.weixin.qq.com/s/u_5ESAy9ISILgg5eciWDwA"
      },
      {
        "title":"游戏第三期",
        "pic":"",
        "web":"https://mp.weixin.qq.com/s/6H9zUWaSPxfhtJWYOXwoOQ"
      },
    ],
    notifyList: [
      {
        "img": "../../images/icon1.jpeg",
        "name": "天才漫画家",
        "text": "你的方案我看了,有点意思,跟我学做菜吧",
        "time": "2020/10/16"
      },
      {
        "img": "../../images/icon1.jpeg",
        "name": "天才漫画家",
        "text": "你的方案我看了,有点意思,跟我学做菜吧",
        "time": "2020/10/16"
      },
      {
        "img": "../../images/icon1.jpeg",
        "name": "天才漫画家",
        "text": "你的方案我看了,有点意思,跟我学做菜吧",
        "time": "2020/10/16"
      }
    ]
  },

  switchTab: function(e){
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
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

  }
})