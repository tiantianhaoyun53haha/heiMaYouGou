// pages/auth/index.js
import { request } from "../../request/request.js";
	import regeneratorRuntime from '../../lib/runtime/runtime';
  import { login } from "../../utils/asyncWx";
  // import { setStorageToken } from "../../utils/storage.js";


Page({
 data:{},
 
 
 async  handleGetUserInfo(e){
  // 获取参数
  // console.log(e)
  const { encryptedData, rawData, iv, signature } = e.detail;
  // 获取登录后的code属性
  const {code}=await login();
  // 把要提交的参数封装成一个对象
  const postParams={ encryptedData, rawData, iv, signature, code }
  // 发送请求获取data值
  
  const { token } = await request({ url: "/users/wxlogin", method: "post", data: postParams });
// 把token值存在缓存中
wx.setStorageSync( "token",token);
// console.log(123)
// 从哪里来，跳回哪里去
wx.navigateBack({
  // 返回上一个页面
  delta: 1
});



 }
})