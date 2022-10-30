<template>
    <div>
        <van-swipe :autoplay="3000" lazy-render>
            <van-swipe-item v-for="(image,index) in images" :key="index" class=topSwipe>
              <img :src="image.pic" />
            </van-swipe-item>
          </van-swipe>          
    </div>
</template>

<script>
import axios from "axios"
import { getBanner } from "@/request/api/home.js"
export default {
  // setup() {
    // const state = reactive({//响应式知识点
  //     const images = [
  //       'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
  //       'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
  //     ];
  //     mounted(()=>{//为什么写回调函数？
  //       axios.get('http://localhost:3000/banner?type=2').then((res)=>{
  //           console.log(res)
  //       })
  //   })
  //   return { images };
  // },
  data(){
      return {
        images : [
        'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
        'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
        ]
      }
  },
  mounted(){
    
      axios.get('http://localhost:3000/banner?type=2').then((res)=>{
      this.images = res.data.banners
      // console.log(res)
    })

    // async()=>{
    // let res = await getBanner();
    // console.log(res)
    // this.images = res.data.banners
    // }
  }
}
</script>

<style>
    .topSwipe img {
      width: 100vw;
      height: 150px;
    }
    .topSwipe img {
      height: 100%;
    }
</style>
