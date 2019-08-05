// import { request } from "../../request/request.js"
import { request } from "../../request/request.js";
Page({


    data: {
        tabs: [
            { id: 0, title: "综合", isActive: true },
            { id: 1, title: "销量", isActive: false },
            { id: 2, title: "价格", isActive: false }
        ],
        goodsList: [],
    },
    // 获取商品列表准备的参数
    QueryParams: {
        // 搜索的关键字 
        query: "",
        // 分类id
        cid: "",
        // 页码
        pagenum: 1,
        // 页容量
        pagesize: 10
    },
    // 定义页面总页数
    TotalPages:1,
    onLoad(options) {
  
        this.QueryParams.cid = options.cid;
        this.getGoodList();
        // console.log(123)
    },
 
    // 获取商品列表数据
    getGoodList() {
        request({ url: "/goods/search", data: this.QueryParams })
            .then(result => {
                // console.log(result)
                // 对页面总页数进行赋值
                this.TotalPages=Math.ceil(result.total/this.QueryParams.pagesize)
                this.setData({
                    goodsList: result.goods,
                })
                // 关闭下拉刷新的效果
                wx.stopPullDownRefresh();
                  
            })
            // console.log(this.data.goodsList)
    },
    handleItemChange(e) {
        // 获取传递过来的索引
        const { index } = e.detail;
        // 获取tabs数组
        let { tabs } = this.data;
        // 循环修改tabs数组
        tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
        this.setData({ tabs });
    },
    // 下滑触底事件
    onReachBottom(){
        // 判断是否有下一页数据
        if(this.QueryParams.pagenum>=this.TotalPages){
            // console.log("没有下一页数据了")
            wx.showToast({
                title: '没有下一页数据了',
                icon: 'none',    
            });
              
        }else{
            // 获取下一页数据
            // 准备发起后台请求的参数
            this.QueryParams.pagenum++;
            this.getGoodList()
        }
    },
    // 下拉刷新事件
    onPullDownRefresh(){
        // 重置页面数为1
        this.QueryParams.pagenum=1;
        // 重置页面的渲染数组为【】
        this.setData({
            goodsList:[],
        });
        // 发起后台数据请求
        this.getGoodList();

    }
    
        
        
    

})