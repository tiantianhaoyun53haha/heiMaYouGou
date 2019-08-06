
import { request } from "../../request/request.js";
// 支持async的导入
import regeneratorRuntime from '../../lib/runtime/runtime';


// pages/goods_detail/index.js
Page({
  data: {

    // 存储后台传递回来的参数
    goodsInfo:{},
  },

  onLoad(options) {
    this.getGoodsDetail(options.goods_id);
    console.log(options.goods_id)
  },
  // 方法后面也要有，
  async   getGoodsDetail(goods_id){

    const result = await request({ url: "/goods/detail", data: { goods_id } });
    console.log(result)
    this.setData({
      goodsInfo: {
        goods_name: result.goods_name,
        goods_price: result.goods_price,
        pics: result.pics,
        goods_introduce: result.goods_introduce
      }

    })

  }








})

  