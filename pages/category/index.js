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
    // 设置当前点击的索引
    currenIndex:0,
    // 定义右侧滚动到顶部的变量
    scrollTop:0,

  },
  // 准备一个全局变量，用来设置右侧遍历显示的数据源
  Cates:[],
  // 页面一启动，调用的函数
  onLoad(){
    this.getCategoryList()
  },
  // 发起分类商品数据请求的函数
  getCategoryList(){
    request({url: "/categories"})
    .then((result=>{
      // 准备右边页面显示的数组数据
      // 先把后台返回的数据存储起来
      this.Cates=result;
      // 左侧菜单栏需要的数据
      // console.log(result)
      // 准备左边列表遍历的数据
      // 这里用了map的高级用法，map(v=>({})),加括号的函数体返回对象字面表达式
      const leftMenuList=result.map(v=>({
      
          // console.log(v.cat_id)
          cat_id:v.cat_id,
          cat_name:v.cat_name
      
      }))
      // const leftMenuList=result.map(v=>{
      //   let cat_id=v.cat_id;
      //   let cat_name=v.cat_name;
      //   return  {cat_id,cat_name}
      // })
      // 准备右边列表需要的数据
      const rightMenuList= this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightMenuList
      })
      // console.log(this.data.leftMenuList)
      // console.log(this.data.rightMenuList)
    }))
  },
  // 左侧点击事件
  handleMenuChange(e){
    // 获取模板里面传递过来的索引
    const {index}=e.currentTarget.dataset;
    // 根据索引过去右侧需要渲染的数据
    const rightMenuList=this.Cates[index].children;
    // 把索引的数据设置给data里面的当前点击元素currentindex
    // 注意这里scrollTop设置的格式，因为函数里面没有给scrolltop赋值，所以需要是键值对的方式
    this.setData({
      currenIndex:index,
      rightMenuList,
      scrollTop:0,
    })
  }
})