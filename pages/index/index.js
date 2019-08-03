
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

    request({ url: '/home/swiperdata' })
      .then((result => {
        // console.log(result)
        this.setData({
          swiperList: result,
        })
      }))

  },
  getNavCateList() {

    request({ url: '/home/catitems' })
      .then((result => {
        this.setData({
          navCateList: result,
        })
      }))

  },
  // 获取楼层数据
  getFloorList() {

    request({ url: '/home/floordata' })
    .then((result => {
      this.setData({
        floorList: result,
      })
    }))

  }
})