// pages/cart/index.js
// 解决async报错的问题
import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from "../../request/request.js";
import { showToast,  getSetting, openSetting, chooseAddress,showModal } from "../../utils/asyncWx"
Page({
  data: {
    address: {},
    cart:{},
    // 全选状态
    isAllChecked:false,

    // 总价格
    totalPrice:0,
    // 总数量 勾选了的总数量
    totalNum:0,
    // 购物车有没有商品
    hasGoods:false

  },


  onShow() {
    const address=wx.getStorageSync("address")||{};
    const cart=wx.getStorageSync("cart")||{};
    this.setData({
      address,
      cart,
    });
    this.setCart(cart);
  },


// 添加购物车地址
  async handleChooseAddress() {



    try {
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      if (scopeAddress === true || scopeAddress === undefined) {
        // 1.1 直接调用获取用户的收货地址


      } else {
        // 2.1 先打开授权页面
        await openSetting();

      }
      // 调用后台的收货地址
      const res2 = await chooseAddress();
      res2.all=res2.provinceName+res2.cityName+res2.countyName+res2.detailInfo;
      wx.setStorageSync("address", res2);

    } catch (error) {

    }
  },

  // 得到底部的计算总价，计算总数量，全选的状态
  setCart(cart){
    // 1.先把cart对象转换为数组
    let cartArr=Object.values(cart);
    // 设置全选的初始值，在循环里面找到里面的特别值
    let isAllChecked=true;
    // 计算总的价格
    let totalPrice=0;
    // 计算要购买的商品的总数量
    let totalNum=0;
    // 对数组进行遍历
    cartArr.forEach(v=>{
      if(v.checked){
        // 选中了
        totalPrice +=v.num*v.goods_price;
        totalNum +=v.num;
      }else{
        isAllChecked=false;
      }
    })
    
    // 判断购物车内有没有商品
    const hasGoods=cartArr.length?true:false;
    // 把值重置回data里面，让值在页面上显示
    this.setData({hasGoods, cart,isAllChecked, totalPrice, totalNum })
    wx.setStorageSync('cart', cart);
  },
// 商品的复选框选中事件
  handleCartCheck(e){
    // 1.获取要修改的商品的id值
    const {id}=e.currentTarget.dataset;
    // 2.获取data中的购物车对象
    let {cart}=this.data;
    // 3.修改商品信息身上的选中状态，取反
    cart[id].checked=!cart[id].checked;
    // 计算总价，把值设置回本地存储和data里面
    this.setCart(cart);
  },
  // 商品的全选功能
  handleCartAllCheck(e){
    // 1.获取data中的数据
    let {isAllChecked,cart}=this.data;
    // 2.给全选按钮取反
    isAllChecked=!isAllChecked;
    // 3.拿购物车对象进行循环，修改每一个购物车商品对象，
    // 把选中的状态都修改为isallchecked
    for(const key in cart){
      // 判断该属性是否是自己的
      if(cart.hasOwnProperty(key)){
        cart[key].checked=isAllChecked;
      }
    }
    // 4.把cart传入到setcart函数即可
    this.setCart(cart);
  },
  // 数量的改变所触发的函数，目的把购物车对象身上的属性值进行修改
  async   handleCartNumEdit(e){
   // 获取传递的参数，常量用的是const
    const {id,operation}=e.currentTarget.dataset;
    // 获取data中的购物车对象，变量用的是let
    let {cart }=this.data;
    // console.log(cart)
    // console.log(id,operation)
    // 判断当前的操作是否是删除操作
    if(cart[id].num===1&&operation===-1){
      // 执行删除
    const res=  await   showModal({content:"您确定删除吗"});
      // 确定删除
      if(res.confirm){
        delete cart[id];
        this.setCart(cart);
      }else{
        console.log('用户点击取消')
      }

    }else{
      // 把购物车对象身上的商品信息的属性修改
      cart[id].num +=operation;
      // 把cart重新赋值到data和缓存中，同时把底部的工具栏重新计算
      this.setCart(cart);
    }
  },

  // 点击结算按钮，注册点击事件
async  handlePay(){
    // 获取data中的地址
    const {address ,cart}=this.data;
    let cartArr=Object.values(cart);
    // 得到是否有勾选的商品
    // some只要有一个值是true，那么整个some值为true
    const hasChecked=cartArr.some(v=>v.checked);
    if(!address.all){
      await showToast({title:"您没有选择收货地址"});
        
    }else if(!hasChecked){
      await showToast({title:"您没有要结算的商品"});
    }else{
      // 满足要求，可以进行商品页面的跳转
      wx.navigateTo({
        url:"/pages/pay/index"
      });
        
    }
  }

})