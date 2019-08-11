// pages/order/index.js
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
    // 获取tabs数组
    let { tabs } = this.data;
    // 循环修改tabs数组
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({ tabs });
},


})