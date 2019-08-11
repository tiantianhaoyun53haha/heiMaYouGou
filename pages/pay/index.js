// pages/cart/index.js
// 解决async报错的问题
import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from "../../request/request.js";
import { requestPayment, showToast } from "../../utils/asyncWx";
import {   getSetting, openSetting, chooseAddress,showModal } from "../../utils/asyncWx"
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
  async handleOrderPay(){

    try {
          // 获取本地存储的token值
    // const token=getStorageToken();
    const token = wx.getStorageSync("token");
    const cart=this.data.cart;
  // 判断有没有值
  if(!token){
    // 跳转到授权页面
    wx.navigateTo({
     url:"/pages/auth/index"
    });
      
  }else{
    // console.log("正常往下执行");
    // 准备订单数据 用来获取订单编号
    // 请求头
    let header={ Authorization: token };
    // 获取订单编号要的请求头参数
    // 订单总价格
    let order_price=this.data.totalPrice;
    // 订单的地址
    let consignee_addr=this.data.address.all;
    // 订单的商品
    let goods=[];
    for(const key in cart){
      if(cart.hasOwnProperty(key) ){
        if(cart[key].checked){
          goods.push({
            goods_id: cart[key].goods_id,
            goods_number: cart[key].num,
            goods_price: cart[key].goods_price
          })
        }
      }
    };
    // 把订单要的参数封装成有个对象
    let orderParams= { order_price, consignee_addr, goods };
    // 发送post请求来获取订单数据
    const {order_number}=await request({
       url: "/my/orders/create", 
       data: orderParams,
        method: "post", 
        header: header
       });
      //  console.log(order_number)
      // 获取支付参数
      const {pay}=await request({
         url: "/my/orders/req_unifiedorder", 
         data: { order_number }, 
         method: "post", 
         header: header
         });
        //  调起微信支付
        const res=await requestPayment(pay);
        // 查询一下我们第三方的服务里面订单状态 也会成功
        const res2=await request({ 
          url: "/my/orders/chkOrder", 
          data: { order_number }, 
          method: "post", 
          header: header
         });
         await showToast({title:"支付成功"})
  }
    } catch (error) {
      console.log("error");
      // 发送异步请求 把error 发送到我们的服务器来分析统计错误
      await showToast({ title: "支付失败！" })
    }

  }

})