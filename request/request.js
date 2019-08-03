export const request = (params) => {
// 公共的接口前缀
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
        });
    })
}