// pages/cart/index.js
// 解决async报错的问题
import regeneratorRuntime from '../../lib/runtime/runtime';
import { getSetting, openSetting, chooseAddress } from "../../utils/asyncWx"
Page({
  data: {
    address: {},
    cart:{},
  },


  onShow() {
    const address=wx.getStorageSync("address")||{};
    const cart=wx.getStorageSync("cart")||{};
      

    this.setData({
      address,
      cart,
        
    })
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
  

})