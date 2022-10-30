<template>
  <div class="container" @touchmove.prevent>
    <router-view></router-view>
    <FootMusic v-show="$store.state.isFooterMusic" class="footMusic"></FootMusic>
  </div>
</template>

<script>
  import FootMusic from "@/components/item/FootMusic.vue"
  export default {
    components: {
      FootMusic
    }
  }
</script>
<style lang="scss">
.icon {
  width: 20px;
  height: 20px;
}
a {
  color: black;
}
.container {
  display: flex;
  position: relative;
  width: 100vw;
  overflow: hidden;
}
.footMusic {
  position: fixed;
  bottom: 0;
}
router-view {
  height: 100vh;
}
</style>
