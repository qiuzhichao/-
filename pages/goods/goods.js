// pages/goods/goods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsData:{},
    id:'',
    param:'',
    load:true,
    imageList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //loading
    wx.showLoading({
      title:'玩命加载中~'
    })
    var that=this;
    var id=options.id
    that.setData({
      id:id.split(",")[0].split('[')[1],
      param:id.split(",")[1].split(']')[0]
    })
    wx.request({
      url:'https://51yuexue.com/index/goods/detail?param='+that.data.id+'&num_iid='+that.data.param,
      success:res=>{
        console.log(res)
        that.setData({
          goodsData:res.data.data
        })
        //隐藏loading
        wx.hideLoading();
      }
    })
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
    var that=this;
    if(this.data.load){
      wx.showLoading({
        title:"玩命加载中~"
      })
      setTimeout(function(){
        wx.hideLoading();
        that.setData({
          load:false
        })
        wx.showToast({
          title:'没有更多数据了~',
          icon:'clear',
          duration:2000
        })
      },2000)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})