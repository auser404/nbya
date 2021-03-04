const app = getApp()
Page({
  data: {
    index2:1,
    num:0,//随机地址的名字
    loadingHidden: true,
    show:false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData:['樱花API','Lucky小站','三秋API','汐岑API','呓喵酱API'],//下拉列表的数据
    APIweb:["http://www.dmoe.cc/random.php","https://www.rrll.cc/tuceng/ecy.php","https://api.ghser.com/random/api.php","https://acg.yanwz.cn/wallpaper/api.php","https://api.yimian.xyz/img"],
    index:0,//选择的下拉列表下标
   slider: [
    {picUrl: 'http://www.dmoe.cc/random.php'},
    {picUrl: 'https://www.rrll.cc/tuceng/ecy.php'},
    {picUrl: 'https://api.ghser.com/random/api.php'},
   ],
   swiperCurrent: 0,
   pic:"",
   mask:false
  },
  swiperChange: function(e){
   this.setData({
   swiperCurrent: e.detail.current
   })
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
          url: '../tools/tools',
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

  // 点击下拉显示框
  selectTap(){
    this.setData({
      show: !this.data.show
    });
    },
    // 点击下拉列表
    optionTap(e){
    let Index=e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index:Index,
      show:!this.data.show
    });
    },
    chaoshi:function(){
      wx.showToast({
        title: '接口超时2秒',
        icon: 'error',
        duration: 2000
       })
    },
// 获取图片
  getPic:function(){
    var that = this
    var num = this.data.num
    that.setData({
      pic : "",
      loadingHidden: false
    })
    wx.request({
              url: this.data.APIweb[this.data.index],//请求地址
              method: 'POST',//POST方式
              data: "",//附加参数
              responseType: 'arraybuffer',//响应方式
              header: {
                'content-type': 'application/x-www-form-urlencoded'//我们服务器都是form
              },
              success(res) {
                console.log(res.statusCode)
                console.log(res.data)
                let fileManager = wx.getFileSystemManager();//获取文件管理器
                let filePath = wx.env.USER_DATA_PATH + '/NBYA'+ num + '.jpg';//设置临时路径
                fileManager.writeFile({//获取到的数据写入临时路径
                  filePath: filePath,//临时路径
                  encoding: 'binary',//编码方式，二进制
                  data: res.data,//请求到的数据
                  success: function(res) {
                    console.log(res)
                    console.log(filePath)//打印路径
      //               wx.previewImage({//图片预览
      //                 urls: [filePath],
      //               })
                    that.setData({
                      pic : [filePath],
                      num : num+1
                    })
                  },
                  fail: function(res) {
                    console.log(res)
                  },
                  complete(res){
                    that.setData({
                      loadingHidden: true
                    })
                    console.log("完成",res)
                  }
                });
              },
              fail: function(res) {
                console.log(res)
                that.chaoshi()
              },
              complete(res){
                that.setData({
                  loadingHidden: true
                })
                console.log("完成",res)
              }
            })
  },
  getPic2:function(){
    var that = this
    var num = this.data.num
    var url = this.data.APIweb[this.data.index]
    console.log(encodeURI(url))
    that.setData({
      pic : "",
      loadingHidden: false
    })
          let fileManager = wx.getFileSystemManager();//获取文件管理器
          let filePath = wx.env.USER_DATA_PATH + '/NBYA'+ num + '.jpg';//设置临时路径
          fileManager.writeFile({//获取到的数据写入临时路径
            filePath: filePath,//临时路径
            encoding: 'binary',//编码方式，二进制
            data: encodeURI(url),//请求到的数据
            success: function(res) {
              console.log(res)
              console.log(filePath)//打印路径
              that.setData({
                pic : [filePath],
                num : num+1
              })
            }
          });
  },
  getPic3:function(){
    var index = this.data.index2
    if (index == 1){
      this.setData({
        index2:2
      })
    }
    else{
      this.setData({
        index2:1
      })
    }
  }
  })