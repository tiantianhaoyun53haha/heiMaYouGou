// pages/cart/index.js
Page({
  handleChooseAddress(){
    // 1.获取用户的授权信息
   wx.getSetting({
     success: (result1)=>{
      //  1.1 获取用户的授权状态
      const scopeAddress=result1.authSetting["scope.address"];
          // 1.2 判断用户的授权状态
          if(scopeAddress===true||scopeAddress===undefined){
            // 1.3 直接获取用户的收货信息
            wx.chooseAddress({
              success: (result2)=>{
                console.log(result2);
              },
             
            });
          }else{
            // 2.1 诱导用户打开授权页面
            wx.openSetting({
              success: (result3)=>{
                // 2.2 直接调用获取收货地址
                wx.chooseAddress({
                  success: (result4)=>{
                      console.log(result4)
                  },
            
                });
              },
             
            });
          }
     },
   
   });
  }

})