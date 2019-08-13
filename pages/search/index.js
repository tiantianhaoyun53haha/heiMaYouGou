// pages/search/index.js
import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from "../../request/request.js";



Page({


  data: {
    inputValue: "",


  },
  // 定时器id





  // input输入框的触发事件
  handeSearchInput(e) {
    // 输入框的值
    TimeId: -1;
    const { value } = e.detail;
    // 简单的做一些验证
    if (!value.trim()) {
      this.setData({
        goods: [],
        inputValue: ""

      })
      return;
    };

    // 正常，防抖技术
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.getQSearch(value);

    }, 1000);

  },


  async getQSearch(query){
    const goods=await request({ url: "/goods/qsearch", data: { query } })
    this.setData({goods});
  }


})