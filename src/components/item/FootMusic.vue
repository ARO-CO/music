<template>
    <div class="footMusic">
        <div class="footLeft" @click="updateDetailShow">
            <img :src="playList[playListIndex].al.picUrl" alt="">
            <div class="footWords">
                <p>{{playList[playListIndex].al.name}}</p>
                <span>横滑切换上下首</span>
            </div>
        </div>
        <div class="footRight">
            <svg class="icon" aria-hidden="true" v-if="updateIsbtnShow" @click="play">
                <use xlink:href="#icon-Playerplay"></use>
            </svg>
            <svg class="icon" aria-hidden="true" v-else @click="play">
                <use xlink:href="#icon-Playerplay"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-24gl-playlistMusic3"></use>
            </svg>
            <audio ref="audio" @timeupdate="timeUpdate" preload="auto"
            :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"></audio>
            <van-popup v-model="detailShow" position="bottom" :style="{ height: '100%',width:'100%' }">
                <MusicDetail :musicList="playList[playListIndex]" :play="play" :setTime="setTime"/>
            </van-popup>
        </div>
    </div>
</template>
<script>
    import MusicDetail from '@/components/item/MusicDetail'
    import {mapState,mapMutations} from 'vuex'
    export default {
        computed: {
            ...mapState(['playList',
            'playListIndex',
            'isbtnShow',
            'detailShow',
            'currentTime',
            'duration']),
        },
        mounted() {
        },
        methods: {
            ...mapMutations(['updateIsbtnShow',
            'updateDetailShow',
            'updateCurrent',
            'updateDuration']),
            play: function(){
                if(this.$refs.audio.paused){
                    this.$refs.audio.play();
                    this.updateIsbtnShow(false)
                }else{
                    this.$refs.audio.pause();
                    this.updateIsbtnShow(true)
                }
            },
            timeUpdate(e){
                // 此处更新currentTime
                this.updateCurrent(e.target.currentTime)
            },
            setTime(value){
                this.$refs.audio.currentTime = value
            }
        },
        watch: {
            playListIndex: function () {
                this.$refs.audio.autoplay=true
                if(this.$refs.audio.paused){
                    this.updateIsbtnShow(false)
                }
                this.$store.dispatch("getLyric",this.playList[this.playListIndex].id)
                this.updateDuration(this.$refs.audio.duration)
                // console.log(this.$refs.audio.duration)
            },
            playList: function () {
                if(this.IsbtnShow){
                    this.$refs.audio.autoplay=true
                    tihs.updateIsbtnShow(false)
                }
            },
            
        },
    }
</script>
<style>
    .footMusic {
        width: 100vw;
        height: 50px;
        background-color: #fff;
        position: fixed;
        bottom: 0px;
        border-top: 1px solid #999;
        display: flex;
        padding: 10px;
        justify-content: space-between;
    }

    .footLeft {
        width: 60%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .footLeft img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    .footRight {
        width: 20%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .footMusic .icon {
        width: 30px;
        height: 30px;
    }
    .footWords {
        margin-left: 10px;
    }
    .footWords p {
        margin: 0 0 5px 5px;
    }
</style>