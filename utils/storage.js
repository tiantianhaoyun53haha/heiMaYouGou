// 会封装本项目中用到了本地存储的代码
// 获取本地存储中的购物车数据

export const getStorageCart=()=>{
    return wx.getStorageSync("cart");
      
}
// 设置购物车数据到本地存储中
/**
 * @param {object} obj 要填充的数据
 */

 export const setStorageCart=(obj)=>{
     wx.setStorageSync("cart", obj);
       
 }



//把地址信息存入缓存中
/**
 * @param {object} address 要填充的数据
 */

 export const setStorageAddress=(address)=>{
     wx.setStorageSync("address", address);
       
 }
  // 获取本地存储中的地址

export const getStorageAddress=()=>{
    return wx.getStorageSync("address");
      
}


//把token存入缓存中
/**
 * @param {object} token 要填充的数据
 */

export const setStorageToken=(token)=>{
    wx.setStorageSync("token", token);
      
}
 // 获取缓存中的token

export const getStorageToken=()=>{
   return wx.getStorageSync("token");
     
}
/**
 * 把 用户信息 存入到缓存中
 * @param {object} userinfo 要存入的 用户信息
 */
export const setStorageUserInfo = (userinfo) => {
    wx.setStorageSync("userinfo", userinfo);
  }
  
  /**
   * 获取缓存中的userinfo
   */
  export const getStorageUserInfo = () => {
    return wx.getStorageSync("userinfo");
  }
  
  


 