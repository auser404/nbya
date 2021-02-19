//index.js
//获取应用实例
const app = getApp()
var interval;
var varName;
var ctx = wx.createCanvasContext('canvasArcCir');
//倒计时60秒
function countDown(that,count) {
  if (count == 0) {
  that.setData({
   timeCountDownTop: '学习结束',
   counting:false,
   hidebtn:false
  })
  return;
  }
  that.setData({
  counting:true,
  timeCountDownTop:'还剩'+ count + '秒',
  })
  setTimeout(function(){
  count--;
  countDown(that, count);
  }, 1000);
 }
Page({
  data: {
    time:5,
    ifHide:false, //是否隐藏用户信息
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hidebtn:false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  hideUser:function(){
    this.setData({
      ifHide:!this.data.ifHide
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      ifHide:false
    })
  },
  upInfo: function () {
    wx.navigateTo({
      url: '/pages/notify/notify',
    })
  },
  // 画圆
  drawCircle: function () {
    clearInterval(varName);
    function drawArc(s, e) {
      ctx.setFillStyle('white');
      ctx.clearRect(0, 0, 200, 200);
      ctx.draw();
      var x = 100, y = 100, radius = 96;
      ctx.setLineWidth(5);
      ctx.setStrokeStyle('#1E90FF');
      ctx.setLineCap('round');
      ctx.beginPath();
      ctx.arc(x, y, radius, s, e, false);
      ctx.stroke()
      ctx.draw()
    }
    var step = 1, startAngle = 1.5 * Math.PI, endAngle = 0;
    var animation_interval = 1000, n = this.data.time;
    var animation = function () {
      if (step <= n) {
        endAngle = step * 2 * Math.PI / n + 1.5 * Math.PI;
        drawArc(startAngle, endAngle);
        step++;
      } else {
        clearInterval(varName);
      }
    };
    varName = setInterval(animation, animation_interval);
  },
  onReady: function () {
    //创建并返回绘图上下文context对象。
    var cxt_arc = wx.createCanvasContext('canvasCircle');
    cxt_arc.setLineWidth(6);
    cxt_arc.setStrokeStyle('#eaeaea');
    cxt_arc.setLineCap('round');
    cxt_arc.beginPath();
    cxt_arc.arc(100, 100, 96, 0, 2 * Math.PI, false);
    cxt_arc.stroke();
    cxt_arc.draw();
  },
  // 画原结束
  //倒计时
  aaa:function() {
    var that = this;
    if (!that.data.counting) {
     //开始倒计时60秒
     countDown(that, this.data.time);
    } 
   },
   both:function(){
    this.setData({
      hidebtn:true
    })
    this.aaa()
    this.drawCircle(
    )
  },
  changeSlider(e) {
    this.setData({ time: e.detail.value })
  },
  onDrag(event) {
    this.setData({
      currentValue: event.detail.value,
    });
  },
})
