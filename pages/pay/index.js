// pages/cart/index.js
// 解决async报错的问题
import regeneratorRuntime from '../../lib/runtime/runtime';
import { showToast,  getSetting, openSetting, chooseAddress,showModal } from "../../utils/asyncWx"
Page({
  data: {
    address: {},
    cart:{},
   

    // 总价格
    totalPrice:0,
    // 总数量 勾选了的总数量
    totalNum:0,
 

  },


  onShow() {
    const address=wx.getStorageSync("address")||{};
    const cart=wx.getStorageSync("cart")||{};
    this.setData({
      address,
      cart,
    });
    this.setCart(cart);
  },



  // 得到底部的计算总价，计算总数量，全选的状态
  setCart(cart){
    // 1.先把cart对象转换为数组
    let cartArr=Object.values(cart);
    // 设置全选的初始值，在循环里面找到里面的特别值
    let isAllChecked=true;
    // 计算总的价格
    let totalPrice=0;
    // 计算要购买的商品的总数量
    let totalNum=0;
    // 对数组进行遍历
    cartArr.forEach(v=>{
      if(v.checked){
        // 选中了
        totalPrice +=v.num*v.goods_price;
        totalNum +=v.num;
      }else{
        isAllChecked=false;
      }
    })
    
    // 判断购物车内有没有商品
    const hasGoods=cartArr.length?true:false;
    // 把值重置回data里面，让值在页面上显示
    this.setData({hasGoods, cart,isAllChecked, totalPrice, totalNum })
    wx.setStorageSync('cart', cart);
  },


})