<template>
  <div>
    <TopNav></TopNav>
    <Swiper></Swiper>
    <IconList></IconList>
    <MusicList></MusicList>
  </div>
</template>
<script>
import TopNav from "@/components/TopNav.vue"
import Swiper from "@/components/SwiperTop.vue"
import IconList from "@/components/IconList.vue"
import MusicList from "@/components/MusicList.vue"
export default {
  name: 'Home',
  components: {
    TopNav,
    Swiper,
    IconList,
    MusicList
}
}
</script>

<style>
  body {
    /* width: 350px; */
  }
</style>