
// 引入封装好的request函数代码
import { request } from "../../request/request.js";

Page({
  data: {
    swiperList: [],
    // 分类导航的数组
    navCateList: [],
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

    request({ url: 'https://apis.zbztb.cn/api/public/v1/home/swiperdata' })
      .then((result => {
        this.setData({
          swiperList: result.data.message,
        })
      }))

  },
  getNavCateList() {

    request({ url: 'https://api.zbztb.cn/api/public/v1/home/catitems' })
      .then((result => {
        this.setData({
          navCateList: result.data.message
        })
      }))

  },
  // 获取楼层数据
  getFloorList() {

    request({ url: 'https://api.zbztb.cn/api/public/v1/home/floordata' })
    .then((result => {
      this.setData({
        floorList: result.data.message
      })
    }))

  }
})