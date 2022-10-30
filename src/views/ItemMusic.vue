<template>
    <div class="itemMusic">
        <ItemMusicTop :playlist="playlist" v-if="playlist.creator"></ItemMusicTop>
        <ItemMusicList :subscribedCount="subscribedCount"></ItemMusicList>
    </div>
</template>

<script>
    // import { useRoute } from 'vue-router' // vue3
    // import { getMusicItemList } from '@/request/api/item.js'
    import axios from 'axios'
    import ItemMusicTop from "@/components/item/ItemMusicTop.vue"
    import ItemMusicList from '@/components/item/ItemMusicList.vue'
    export default {
        components: { ItemMusicTop, ItemMusicList },
        data() {
            return {
                playlist: {},
                subscribedCount: '',
            }
        },
        mounted() {
            // console.log(this.$route.params.id)
            axios.get('http://localhost:3000/playlist/detail?id=' + this.$route.params.id).then((res) => {
                this.playlist = res.data.playlist

                this.subscribedCount = this.changeNum(this.playlist.subscribedCount)

                // console.log(this.playlist)
                // console.log(this.subscribedCount)
            })
        },
        methods: {
            changeNum(num) {
                if (num >= 10000000)
                    return (num / 100000000).toFixed(1) + "亿"
                else if (num >= 10000)
                    return (num / 10000).toFixed(1) + "万"
            }
        }

    }
</script>

<style>

</style>