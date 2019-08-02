


Page({
  data: {
    swiperList: [],
    // 分类导航的数组
    navCateList:[],
    // 楼层数组
    floorList: []

  },
  // 页面开始加载的时候触发
  onLoad() {
    this.getSwiperList();
    this.getNavCateList();
    this.getFloorList();
  },
  // 获取轮播图数据
  getSwiperList() {
    wx.request({
      url: 'https://apis.zbztb.cn/api/public/v1/home/swiperdata',
      success: (result) => {
        //  console.log(result.data)
        // console.log(result.data.message)
        this.setData({
          swiperList: result.data.message,
        })
        // console.log(this.data.swiperList)
      },
    });
  },
  getNavCateList() {
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/catitems',
      success: (result) => {
        // console.log(result),
        this.setData({
          navCateList: result.data.message
        })
      },

    });
  },
  // 获取楼层数据
  getFloorList(){
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/floordata',
      success: (result) => {
        console.log(result),
        this.setData({
          floorList: result.data.message
        })
      },

    });
  }
})