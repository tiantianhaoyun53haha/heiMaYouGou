// pages/order/index.js

import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from "../../request/request.js";
import { getStorageToken } from "../../utils/storage.js";



Page({
  data: {
    tabs: [
      { id: 0, title: "全部", isActive: true },
      { id: 1, title: "待付款", isActive: false },
      { id: 2, title: "待发货", isActive: false },
      { id: 3, title: "退款/退货", isActive: false }
    ],
    orderList: []
  },

  handleItemChange(e) {
    // 获取传递过来的索引
    const { index } = e.detail;
    // console.log(this)
    // 获取tabs数组
    let { tabs } = this.data;
    // 循环修改tabs数组
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({ tabs });
  },

  // 根据索引去修改标题
  changeTitleByIndex(index) {
    // 获取tabs数组
    let { tabs } = this.data;
    // 循环修改tabs数组
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({ tabs });
  },






  onLoad(options) {
    // this.type = options.type;
    // console.log(this.type)
    // 1.在小程序中，存在页面栈（数组）的概念，最多只能存在10个页面
    /*    2.越晚打开，索引越大
      3.可以获取到页面数组
      4.就可以拿到最晚的打开的页面==当前页面
      5当获取到页面对象，有一个属性options
    */
    // 判断有没有token
    console.log(this)
    const token = getStorageToken();
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return;
    }
    // 获取页面栈数组
    let pageList = getCurrentPages();
    // 获取当前的页面对象
    let currentPage = pageList[pageList.length - 1];
    // 获取传递过来的type属性
    const { type } = currentPage.options;
    // console.log(type)
    // 获取订单数组
    this.getOrderList(type);
    // 根据不同的type来显示不同的激活标题
    // 定义要激活标题的索引
    let index = type - 1;
    this.changeTitleByIndex(index);
  },
  // 获取订单标题
  async getOrderList(type) {
    let header = {
      Authorization: getStorageToken()
    }
    let { orders } = await request({
       url: "/my/orders/all", 
       data: { type }, 
       header: header });
      // console.log(orders)
    // 修改时间格式
    orders.forEach(v => {
      v.create_time_cn = (new Date(v.create_time * 1000)).toLocaleString();

    })
    // console.log(orders);
    this.setData({
      orderList: orders
    })



  }











})