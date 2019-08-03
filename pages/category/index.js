// 引入请求的函数
import {request} from "../../request/request"

Page({
  // 存储数据的data
  data:{
    leftMenuList:[
      {
        cat_id:'',
        cat_name:'',
      }
    ],
    rightMenuList:[],

  },
  // 页面一启动，调用的函数
  onLoad(){
    this.getCategoryList()
  },
  // 发起分类商品数据请求的函数
  getCategoryList(){
    request({url: "/categories"})
    .then((result=>{
      // 左侧菜单栏需要的数据
      console.log(result)
      // 准备左边列表遍历的数据
      // 这里用了map的高级用法，map(v=>({})),加括号的函数体返回对象字面表达式
      const leftMenuList=result.map(v=>({
      
          // console.log(v.cat_id)
          cat_id:v.cat_id,
          cat_name:v.cat_name
      
      // }))
      // const leftMenuList=result.map(v=>{
      //   let cat_id=v.cat_id;
      //   let cat_name=v.cat_name;
      //   return  {cat_id,cat_name}
      // })
      // 准备右边列表需要的数据
      const rightMenuList=result[0].children;
      this.setData({
        leftMenuList,
        rightMenuList
      })
      console.log(this.data.leftMenuList)
      console.log(this.data.rightMenuList)
    }))
  }
})