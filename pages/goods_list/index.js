import { request } from "../../request/request"

Page({


  data:{
    goodsList:[],
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
onload(options){
  this.QueryParams.cid=options.cid;
  this.getGoodList();
},
// 获取商品列表数据
getGoodList(){
  requst({url: "/goods/search" ,data:this.QueryParams})
  .then(result=>{
    this.setData({
      goodsList:result.goods,
    })
  })
}

})