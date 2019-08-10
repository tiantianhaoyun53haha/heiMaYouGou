

// 写的第一步
// wx.openSetting({
//     success: (result) => {

//     },
//     fail: () => {},
//     complete: () => {}
// });


// 写的第二步
// export const openSetting=()=>{
//     return new Promise((resolve,reject)=>{

//     })
// }

/**
 * promise形式的wx。openSetting打开授权页面
 */

export const openSetting = () => {
    return new Promise((resolve, reject) => {
        wx.openSetting({
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            }
        });

    })
}


/**
 * promise形式的wx。openSetting打开授权页面
 */

export const getSetting = () => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            }
        });

    })
}

/**
	 * promise 形式的wx.chooseAddress 获取收货地址
	 */
	export const chooseAddress = () => {
        return new Promise((resolve, reject) => {
          wx.chooseAddress({
            success: (result) => {
              resolve(result);
            },
            fail: (err) => {
              reject(err)
            }
          });
        })
      } 


  
/**
	 * promise 形式的wx.showModal对话框
     * 
	 */
	export const showModal = ({content}) => {
        return new Promise((resolve, reject) => {
          wx.showModal({
            title:'提示',
            content:content,

            success: (result) => {
              resolve(result);
            },
          
          });
        })
      } 
    