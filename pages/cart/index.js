// pages/cart/index.js
// 解决async报错的问题
import regeneratorRuntime from '../../lib/runtime/runtime';
import { getSetting, openSetting, chooseAddress } from "../../utils/asyncWx"
Page({
  async handleChooseAddress() {



    try {
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      if (scopeAddress === true || scopeAddress === undefined) {
        // 1.1 直接调用获取用户的收货地址
        const res2 = await chooseAddress();
        console.log(res2);
      } else {
        // 2.1 先打开授权页面
        await openSetting();
        const res2 = await chooseAddress();
        console.log(res2);
      }
    } catch (error) {

    }
  }

})