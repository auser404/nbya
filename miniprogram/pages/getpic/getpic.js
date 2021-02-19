Page({
  data: {
    num:0,//随机地址的名字
    loadingHidden: true,
    show:false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData:['樱花API','Lucky小站','三秋API','汐岑API','呓喵酱API'],//下拉列表的数据
    APIweb:["http://www.dmoe.cc/random.php","https://www.rrll.cc/tuceng/ecy.php","https://api.ghser.com/random/api.php","https://acg.yanwz.cn/wallpaper/api.php","https://api.yimian.xyz/img"],
    index:0,//选择的下拉列表下标
   slider: [
  //  {picUrl: '/images/wallhaven-k7wor1.jpg'},
  //  {picUrl: '/images/wallhaven-v9gvz5.jpg'},
  //  {picUrl: '/images/wallhaven-o3xje5.jpg'},
   ],
   swiperCurrent: 0,
   pic:""
  },
  swiperChange: function(e){
   this.setData({
   swiperCurrent: e.detail.current
   })
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
                      loadingHidden: true,
                      num : num+1
                    })
                  },
                  fail: function(res) {
                    console.log(res)
                    that.setData({
                      loadingHidden: true
                    })
                  },
                });
              }
            })
  }
  })