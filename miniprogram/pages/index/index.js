//index.js
//获取应用实例
const app = getApp()
var interval;
var varName;
var ctx = wx.createCanvasContext('canvasArcCir');
//倒计时
function countDown(that,count) {
  if(app.globalData.stop){
    console.log("计时暂停")
    that.setData({
      count:count
    })
    return
  }
  if (count == 0) {
  that.setData({
  success:true,
   showModalStatus:true,
   timeCountDownTop: '学习结束',
   counting:false
  })
  app.globalData.stop = true
  return;
  }
  var temptime = that.prTime(count)
  var hasLearn = that.prTime(that.data.allcount+1)
  that.setData({
  counting:true,
  allcount:that.data.allcount+1,
  timeCountDownTop:'还剩'+temptime,
  hasLearn:hasLearn
  })
  setTimeout(function(){
  count--;
  countDown(that, count);
  }, 1000);
 }
Page({
  data: {
    success:false,
    showModalStatus:false,//展示弹窗
    stop:false,//停止计时
    count:0,//倒计
    step:0,//正记
    allcount:0,//累计
    time:600,
    Lastime:'',//记录时间
    ifHide:false, //是否隐藏用户信息
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
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
  drawCircle: function (step) {
    clearInterval(varName);
    function drawArc(s, e) {
      ctx.setFillStyle('black');
      ctx.clearRect(0, 0, 200, 200);
      ctx.draw();
      var x = 100, y = 100, radius = 96;
      ctx.setLineWidth(5);
      ctx.setStrokeStyle('#baddff');
      ctx.setLineCap('round');
      ctx.beginPath();
      ctx.arc(x, y, radius, s, e, false);
      ctx.stroke()
      ctx.draw()
    }
    var that = this;
    var startAngle = 1.5 * Math.PI, endAngle = 0;
    var animation_interval = 1000, n = this.data.time;
    var animation = function () {
      if(app.globalData.stop){
        that.setData({
          step:step
        })
        return//暂停
      }
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
  // 画圆结束
  //倒计时
  aaa:function() {
    var that = this;
    if (!this.data.counting) {
     //开始倒计时
     countDown(that, this.data.time);
    } 
   },
   bbb:function() {
    var that = this;
    if (!this.data.counting) {
     //开始倒计时
     countDown(that, this.data.count);
    } 
   },
   prTime:function(time){
    var shi = 0;
    var fen = 0;
    var miao = 0;
    var timeTXT = ""
    if(time<60){
      miao = time
    }
    else if(time<3600){
      miao = time%60
      fen = parseInt(time/60)
    }
    else{
      miao = time%60
      fen = parseInt(time/60)
      shi = parseInt(fen/60)
      fen = fen - shi*60
    }
    if(shi == 0){
      if(fen == 0){
        timeTXT=miao+"秒"
      }
      else{
        if(miao == 0){
          timeTXT=fen+"分"
        }
        else{
          timeTXT=fen+"分"+miao+"秒"
        }
      }
    }
    else{
      if(fen == 0){
        if(miao == 0){
          timeTXT=shi+"小时"
        }
        else{
          timeTXT=shi+"小时零"+miao+"秒"
        }
      }
      else{
        if(miao == 0){
          timeTXT=shi+"时"+fen+"分"
        }
        else{
          timeTXT=shi+"时"+fen+"分"+miao+"秒"
        }
      }
    }
    console.log(time)
    console.log(timeTXT)
    return timeTXT
   },
   both:function(){
    var that = this;
    var time = that.data.time;
    var timeTXT = this.prTime(time)
    app.globalData.stop = false
    this.setData({
      Lastime:timeTXT
    })
    this.aaa()
    this.drawCircle(1)
  },
  stop:function(){
    app.globalData.stop = true
    this.setData({
      counting:false,
      stop:true
    })
  },
  again:function(){
    app.globalData.stop = false
    this.bbb()
    this.drawCircle(this.data.step)
  },
  changeSlider(e) {
    this.setData({ time: e.detail.value })
  },
  onDrag(event) {
    this.setData({
      currentValue: event.detail.value,
    });
  },
  util: function(currentStatu){
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200,  //动画时长
      timingFunction: "linear", //线性
      delay: 0  //0则不延迟
    });
    
    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;
 
    // 第3步：执行第一组动画
    animation.opacity(0).rotateX(-100).step();
 
    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })
    
    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function () {
      // 执行第二组动画
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })
      
      //关闭
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)
  
    // 显示
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },
  powerDrawer :function(){
    this.setData({
      showModalStatus:false
    })
  }
})
