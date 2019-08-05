// 同时发送的ajax的次数
let ajaxTimes = 0;

export const request = (params) => {
// 公共的接口前缀
ajaxTimes++;
// 显示真正等待图标
wx.showLoading({ title: "加载中" });
const baseURL="https://api.zbztb.cn/api/public/v1";

    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url:baseURL+params.url,
            success: (result) => {
                // 优化拿数据时候的取值
                resolve(result.data.message)
            },
            fail: (err) => {
                reject(err)
            },
            // 请求完成的函数
            complete:()=>{
                ajaxTimes--;
                if(ajaxTimes===0){
                    // 最后一个请求回来了
                    // 关闭正在等待的图标
                    wx.hideLoading();
                }
            }
        });
    })
}