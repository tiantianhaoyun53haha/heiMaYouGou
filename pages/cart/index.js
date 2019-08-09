// pages/cart/index.js
// 解决async报错的问题
import regeneratorRuntime from '../../lib/runtime/runtime';
import { getSetting, openSetting, chooseAddress } from "../../utils/asyncWx"
Page({
  data: {
    address: {},
    cart:{},
    // 全选状态
    isAllChecked:false,
    // 总价格
    totalPrice:0,
    // 总数量 勾选了的总数量
    totalNum:0,
    // 购物车有没有商品
    hasGoods:false
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


// 添加购物车地址
  async handleChooseAddress() {



    try {
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      if (scopeAddress === true || scopeAddress === undefined) {
        // 1.1 直接调用获取用户的收货地址


      } else {
        // 2.1 先打开授权页面
        await openSetting();

      }
      // 调用后台的收货地址
      const res2 = await chooseAddress();
      res2.all=res2.provinceName+res2.cityName+res2.countyName+res2.detailInfo;
      wx.setStorageSync("address", res2);
    } catch (error) {

    }
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

    // 把值重置回data里面，让值在页面上显示
    this.setData({ isAllChecked, totalPrice, totalNum })
  }

})