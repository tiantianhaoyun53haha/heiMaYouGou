// pages/user/index.js
// 页面被打开的时候，判断缓存中有没有用户数据
// 1.没有信息就跳转到login登录页面去获取用户信息
// 信息获取回来存入到缓存中
// 再跳转回来
import {getStorageUserInfo} from "../../utils/storage.js"

Page({
data:{
  userinfo:{},

},
onShow(){
  // 获取缓存中的用户信息
  const userinfo=getStorageUserInfo();
  if(!userinfo){
    // 没有用户信息
    // 跳转到登录页面
    wx.navigateTo({
      url: '/pages/login/index',
    });
    // 跳转之后，就返回
      return;
  };
  // 2.给data赋值
  const collect=wx.getStorageSync("collect")||[];

  this.setData({
    userinfo,
    
  })
    






}


})