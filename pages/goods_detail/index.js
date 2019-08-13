
import { request } from "../../request/request.js";
// 支持async的导入
import regeneratorRuntime from '../../lib/runtime/runtime';
import {getStorageCart,setStorageCart } from '../../utils/storage.js'

// pages/goods_detail/index.js
Page({
  data: {

    // 存储后台传递回来的参数
    goodsInfo:{},
    isCollect:false
  },

// 定义全局的商品对象
GoodsObj:{},

  onLoad(options) {
    this.getGoodsDetail(options.goods_id);
    // console.log(options.goods_id)
  },
  // 方法后面也要有，
  async   getGoodsDetail(goods_id){

    const result = await request({ url: "/goods/detail", data: { goods_id } });
    // console.log(result)
    // 赋值给全局的商品对象
    this.GoodsObj=result;
    this.setData({
      goodsInfo: {
        goods_name: result.goods_name,
        goods_price: result.goods_price,
        pics: result.pics,
        goods_introduce: result.goods_introduce.replace(/\.webp/,'.jpg')
      }

    })

  },
  // 点击轮播图，放大预览
  handlePreviewImage(e){
    // 解构出当前的索引
    const {index}=e.currentTarget.dataset;
    // 构造自己需要的url数组
    const urls=this.data.goodsInfo.pics.map(v=>v.pics_big);
    // 得到当前的图片路径
    const current=urls[index];
    wx.previewImage({
      current,
      urls,
    });
      

  },
  // 加入购物车
  handleCartAdd(){
    // 计算函数被触发的次数
    // console.count("用户购买的次数");
    // 1.获取本地存储的购物车对象
    // let cart =wx.getStorageSync("cart")||{};
    let cart =getStorageCart() ||{};

    console.log(cart);
    // 2.判断当前商品是否已经购买
    if(cart[this.GoodsObj.goods_id]){
      // 2.1已经存在旧数据了
      cart[this.GoodsObj.goods_id].num++;
    }else{
      // 2.2 第一次添加,把商品信息添加到数组里面的方式
      cart[this.GoodsObj.goods_id]=this.GoodsObj;
      // console.log(this.GoodsObj)
      console.log( cart[this.GoodsObj.goods_id])

      cart[this.GoodsObj.goods_id].num=1;
      // 创建一个这个商品已经被选中的属性，后面的勾选框需要用到
      cart[this.GoodsObj.goods_id].checked=true;

    }
    // 3.把数据存储在本地存储里面
    // wx.setStorageSync("cart",cart);
    setStorageCart(cart);

    // 4.弹出成功的提示
    wx.showToast({
      title: '购买成功',
      icon: 'success',
    // 遮罩层 蒙版
    // mask：true但是用户点击按钮的时候没有反应，防止用户的疯狂点击
      mask: false,

    });
      
      
  },

  // 点击收藏按钮的图标
  handleGoodsCollect(){
    // console.log("hahah")
    // 1.获取缓存的地址
    let collect=wx.getStorageSync("collect")||[];
    // 2.判断按钮中是否有旧的数据
    // 不推荐some方法，因为这样在方法外面定义一个变量，把index变量存储起来
    // let isCollect=collect.some(
      // (v,i)=>v.goods_id===this.GoodsObj.goods_id);
      // 3.加入有数据，要删除数据，必须先找到这个元素在数组中的索引
      let index=collect.findIndex(v=>v.goods_id===this.GoodsObj.goods_id);
      // 加入有数据 要删除数组 必须找到这个元素在数组中的索引
      if(index===-1){
        // 没有  就执行添加
        // 给数组赋值  goodsObj就是这个商品的详细信息
        collect.push(this.GoodsObj)
        wx.showToast({
          title: '收藏成功',
          icon: 'success',
          mask: true
        });
          this.setData({
            isCollect:true
          })
      }else{
        // 已经存在了  就执行删除
        collect.splice(index,1)
        wx.showToast({
          title: '取消成功',
          icon: 'success',
          mask: true
        });
        this.setData({
          isCollect: false
        })
      }
      // 3.把数组重新放在缓存中
      wx.setStorageSync("collect", collect);
        
      
  }







})

  