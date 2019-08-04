// 引入请求的函数
import { request } from "../../request/request"

Page({
  // 存储数据的data
  data: {
    leftMenuList: [
      {
        cat_id: '',
        cat_name: '',
      }
    ],
    rightMenuList: [],
    // 设置当前点击的索引
    currenIndex: 0,
    // 定义右侧滚动到顶部的变量
    scrollTop: 0,

  },
  // 准备一个全局变量，用来设置右侧遍历显示的数据源
  Cates: [],
  // 页面一启动，调用的函数
  onLoad() {
    // 获取本地存储的数据，用来判断有没有缓存数据
    // console.log(123)
    const cates = wx.getStorageSync("cates");
    // 判断有没有缓存数据
    if (!cates) {
      // 发起后台数据请求
      this.getCategoryList()
    }
    else {
      // 有缓存数据
      // 判断数据是否过期，如果过期了，就再次发起后台数据请求
      if (Date.now() - cates.time >1000 * 10) {
        this.getCategoryList();
      } else {
        // 需要把缓存的数据设置到data里面
        // 获取缓存数据里面的具体数据
        const catesData = cates.data;
        // 对全局的变量进行赋值，因为我们设置点击左边显示右边效果的时候，对左边显示的数据进行重新赋值了的，
        // 因为这个数据也是从后台的数据重新解构出来的，我们相当于把原来所有从后台数据得到的值重新赋值，改变数据的来源，从后台变成本地存储
        // 看自己请求后台数据的代码就知道自己给哪些数据进行赋值了
        this.Cates = catesData;
        // 赋值粘贴请求数据里面的代码
        const leftMenuList = result.map(v => ({
          cat_id: v.cat_id,
          cat_name: v.cat_name
        }))
        // 准备右边列表需要的数据
        const rightMenuList = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightMenuList
        })
      }
    }



  },
  // 发起分类商品数据请求的函数
  getCategoryList() {
    request({ url: "/categories" })
      .then((result => {
        // 准备右边页面显示的数组数据
        // 先把后台返回的数据存储起来
        this.Cates = result;
        // 存储数据到本地
        wx.setStorageSync("cates", {time:Date.now(),data:this.Cates });
        // 左侧菜单栏需要的数据
        // console.log(result)
        // 准备左边列表遍历的数据
        // 这里用了map的高级用法，map(v=>({})),加括号的函数体返回对象字面表达式
        const leftMenuList = result.map(v => ({

          // console.log(v.cat_id)
          cat_id: v.cat_id,
          cat_name: v.cat_name

        }))
        // const leftMenuList=result.map(v=>{
        //   let cat_id=v.cat_id;
        //   let cat_name=v.cat_name;
        //   return  {cat_id,cat_name}
        // })
        // 准备右边列表需要的数据
        const rightMenuList = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightMenuList
        })
        // console.log(this.data.leftMenuList)
        // console.log(this.data.rightMenuList)
      }))
  },
  // 左侧点击事件
  handleMenuChange(e) {
    // 获取模板里面传递过来的索引
    const { index } = e.currentTarget.dataset;
    // 根据索引过去右侧需要渲染的数据
    const rightMenuList = this.Cates[index].children;
    // 把索引的数据设置给data里面的当前点击元素currentindex
    // 注意这里scrollTop设置的格式，因为函数里面没有给scrolltop赋值，所以需要是键值对的方式
    this.setData({
      currenIndex: index,
      rightMenuList,
      scrollTop: 0,
    })
  }
})