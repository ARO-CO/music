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
import { getBanner } from "@/request/api/home.js"
export default {
  data(){
      return {
        images : [
        'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
        'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
        ]
      }
  },
  methods:{
    async getbanner(){
      let res = await getBanner()
      this.images = res.data.banners
    }
  },
  mounted(){
    this.getbanner()
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
