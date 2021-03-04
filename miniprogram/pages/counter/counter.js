Page({
  data: {
    num: "", //前台页面显示的输入数字或者结果
    op: "" //前台页面显示的操作符
  },
  result: null, //装载计算结果
  isClear: true, //是否需要清理前面的数字，true是要清理

  numBtn: function(e) {
    var num = e.target.dataset.val; //获取你输入的数字
    if (this.isClear || this.data.num == "0") //如果需要清理前面的数字，那么前面的数字就不需要保存
    {
      this.isClear = false; //将清理标志设置为false，以便连续输入数字
      this.setData({
        num: num
      });
    } else {
      this.setData({
        num: this.data.num + num //不清理前面的内容，将输入的内容追加到最后面,这是字符串的连接操作，因为两边都是字符串类型
      });
    }

  },

  opBtn: function(e) {
    var op = this.data.op; //获取上一次的操作符
    var num = Number(this.data.num); //获取操作数
    this.setData({
      op: e.target.dataset.val
    });
    if (this.isClear) //当你连续点击操作符的时候，操作无效
    {
      return;
    }
    this.isClear = true; //设置清理内容标志
    if (this.result == null) //讲第一次运算设置为当前的操作数
    {
      this.result = num;
      return;
    }
    //运算符的运算
    if (op == "+") {
      // this.result = cals.add(this.result, num);
      this.result = this.result + num; //数字加，因为num是数字类型
    } else if (op == "-") {
      // this.result = cals.sub(this.result, num);
      this.result = this.result - num;
    } else if (op == "*") {
      // this.result = cals.mul(this.result, num);
      this.result = this.result * num;
    } else if (op == "/") {
      // this.result = cals.div(this.result, num);
      this.result = this.result / num;
    } else if (op == "%") {
      this.result = this.result % num;
    }
    this.setData({
      num: this.result
    });

  },

  doBtn: function(e) {
    if (this.isClear) //如果直接点击小数点，则显示"0."
    {
      this.setData({
        num: "0."
      });
      this.isClear = false;
      return;
    }
    if (this.data.num.indexOf(".") >= 0) //查询前面输入的数字中，是否存在小数点
    {
      return; //如果存在小数点，当前输入无效
    }
    this.setData({
      num: this.data.num + "."
    });
  },
  delBtn: function(e) {
    var num = this.data.num.substr(0, this.data.num.length - 1);
    this.setData({
      num: num == "" ? "0" : num
    });
  },
  resetBtn: function(e) {
    this.result = null;
    this.isClear = true;
    this.setData({
      num: '0',
      op: ''
    });
  }
})