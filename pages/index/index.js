//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    indexData:[],
    listData:[],
    page:1,
    load:true,
    loading:false,
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
    };
    wx.request({
      url:"https://51yuexue.com/index/home/index",
      success:res => {
        var that=this;
        that.setData({
          indexData:res.data.data,
          listData:res.data.data.goods_list,
          page:res.data.data.next_page
        })
        console.log(res);
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 页面上拉加载
  onReachBottom:function(){
    var that=this;
    if(that.data.loading){
      wx.showToast({
        title:'没有更多数据了~',
        icon:'clear',
        duration:2000
      })
    }
    if(that.data.load){
      //显示加载图标
      wx.showLoading({
        title:'玩命加载中~'
      })
      wx.request({
        url:"http://51yuexue.com/index/home/getmore?page="+that.data.page,
        method:"get",
        success:res=>{
          console.log(res)
          that.data.listData=that.data.listData.concat(res.data.data.goods_list);
          
          if(res.data.data.goods_list.length<=0){
            wx.showToast({
              title:'没有更多数据了~',
              icon:'clear',
              duration:2000
            })
            that.setData({
              load:false,
              loading:true,
              page:res.data.data.next_page
            })
          }else{
            that.setData({
              listData:that.data.listData,
              load:true
            })
          }
          //隐藏loading
          wx.hideLoading();
        }
      })
    }
  },
  // 商品详情
  toGoods:function(event){
      var id=event.target.id;
      wx.navigateTo({url:'../goods/goods?id='+id})
  },
  // 搜索页
  toSearch:function(){
    wx.switchTab({
      url:'../search/search'
    })
  }
})
