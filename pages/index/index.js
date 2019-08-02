


Page({
  data:{
    swiperList: [],
  },
  // 页面开始加载的时候触发
  onLoad(){
    this.getSwiperList();
 
  },
  // 获取轮播图数据
  getSwiperList(){
   wx.request({
      url: 'https://apis.zbztb.cn/api/public/v1/home/swiperdata',
      success: (result)=>{
    //  console.log(result.data)
    // console.log(result.data.message)
    this.setData({
      swiperList:result.data.message,
    })
    console.log(this.data.swiperList)
      },
    });
  }
})