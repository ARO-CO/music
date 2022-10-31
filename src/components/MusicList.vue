<template>
    <div class="musicList">
        <div class="musicTop">
            <div class="title" style="font-weight:bold">发现好歌单</div>
            <div class="more">查看更多</div>
        </div>
        <div class="musicContent">
            <div class="my-swipe">
                <van-swipe :loop="false" :width="150" :show-indicators="false">
                    <van-swipe-item v-for="(item,index) in musicList" :key="index" class="musicSwpie">
                        <router-link :to="{name:'ItemMusic',params:{id: item.id } }">
                            <div class="pic"><img :src="item.picUrl"></div>
                            <div class="playCount">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-Playerplay"></use>
                                </svg>
                                {{changeNum(item.playCount)}}
                            </div>
                            <span class="name">{{item.name}}</span>
                        </router-link>
                    </van-swipe-item>
                </van-swipe>

            </div>
        </div>
    </div>
</template>

<script>
    import { getMusicList } from "@/request/api/home.js"
    import axios from "axios"
    export default {
        data() {
            return {
                musicList: [],
            }
        },
        mounted() {
            this.getmusiclist()
        },
        methods: {
            changeNum(num) {
                if (num >= 10000000)
                    return (num / 100000000).toFixed(1) + "亿"
                else if (num >= 10000)
                    return (num / 10000).toFixed(1) + "万"
            },
            async getmusiclist() {
                let res = await getMusicList()
                this.musicList = res.data.result
                this.changeNum()
                this.playcount = this.changeNum()
            }
        }
    }
</script>
<style>
    .musicList {
        width: 100vw;
        height: 250px;
        padding: 10px;
    }

    .musicTop {
        width: 100%;
        height: 30px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }

    .musicTop >.title {
        font-size: 20px;
        font-weight: 900;
    }

    .more {
        border: 1px solid #ccc;
        text-align: center;
        line-height: 30px;
        padding: 0 10px;
        border-radius: 20px;
    }

    .musicContent {
        height: 200px;
    }

    .my-swipe {
        height: 100%;
    }

    .musicSwpie >a >.pic {
        height: 150px;
        width: 150px;
        border-radius: 20px;
        overflow: hidden;
    }

    .pic img {
        height: 100%;
        width: 100%;
    }

    .playCount {
        position: absolute;
        height: 5px;
        right: 2px;
        top: 2px;
    }

    .van-swipe-item {
        border-radius: 10px;
    }

    .musicSwpie {
        margin: 10px;
    }
</style>