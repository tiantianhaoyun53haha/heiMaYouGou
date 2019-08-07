
import { request } from "../../request/request.js";
// 支持async的导入
import regeneratorRuntime from '../../lib/runtime/runtime';
import {getStorageCart,setStorageCart } from '../../utils/storage.js'

// pages/goods_detail/index.js
Page({
  data: {

    // 存储后台传递回来的参数
    goodsInfo:{},
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
      
      
  }







})

  