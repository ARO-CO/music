<template>
    <div class="itemMusicList">
        <div class="itemListTop">
            <div class="listLeft">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-Playerplay"></use>
                </svg>
                <span>
                    播放全部（共{{itemList.length}}首）
                </span>
            </div>
            <div class="listRight">
                <span>+收藏({{subscribedCount}})</span>
            </div>
        </div>
        <div class="itemList">
            <div class="item" v-for="(item,i) in itemList" :key="i">
                <div class="itemLeft" @click="playMusic(i)">
                    <span class="leftspan">
                        <div>{{i+1}}</div>
                    </span>
                </div>
                <div class="itemDetail" @click="playMusic(i)">
                    <p class="musicName">{{item.name}}</p>
                    <div class="singer">
                        <span v-for="(item1,index) in item.ar" :key="index">{{item1.name}}</span>
                    </div>
                </div>
                <div class="itemRight">
                    <svg class="icon" aria-hidden="true" v-if="item.mv !=0">
                        <use xlink:href="#icon-shipin"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-24gl-playlistMusic3"></use>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import { mapMutations } from 'vuex'
    export default {
        props: {
            subscribedCount: String
        },
        data() {
            return {
                itemList: [],
            }
        },
        methods: {
            playMusic:function(i){
                this.updatePlayList(this.itemList)
                this.updatePlayListIndex(i)
            },
            ...mapMutations(['updatePlayList', 'updatePlayListIndex', 'this.updateIsbtnShow'])
        },
        mounted() {
            // console.log(this.$route.params.id)
            axios.get('http://localhost:3000/playlist/track/all?id=' +
                this.$route.params.id
                + '&limit=10&offset=1').then((res) => {
                    // console.log(res.data)
                    this.itemList = res.data.songs
                    // console.log(this.itemList)
                })
        }
    }
</script>

<style>
    .itemMusicList {
        margin-top: 50px;
        width: 100%;
        /* height: 100%; */
        background-color: white;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
    }

    .itemListTop {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 5px;
        height: 60px;
    }

    .listRight span {
        background-color: red;
        color: white;
        border-radius: 20px;
        padding: 8px;
    }

    .item {
        display: flex;
        height: 60px;
        justify-content: space-between;
    }

    .itemLeft {
        width: 40px;
        /* height: 80px; */
        display: flex;
    }

    .itemLeft span {
        display: flex;
        align-items: center;
        padding-left: 15px;
    }

    .itemRight {
        width: 80px;
        display: flex;
        justify-content: flex-end;
    }

    .itemDetail {
        font-size: 15px;
        width: 100%;

    }

    .musicName {
        margin: 0;
        font-weight: bold;
        margin-bottom: 5px;
    }

    .itemDetail span {
        color: rgb(195, 195, 195);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
    }

    .singer {
        display: flex;
    }
</style>