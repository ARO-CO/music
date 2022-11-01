<template>
    <div class="musicDetail">
        <img :src="musicList.al.picUrl" alt="" class="detailbg">
        <div class="musicDetailTop">
            <div class="musicDetailLeft">
                <svg class="icon" aria-hidden="true" @click="updateDetailShow">
                    <use xlink:href="#icon-shouqi"></use>
                </svg>
                <div clas="leftMarquee">
                    <rolling-marquee style="color:#fff">{{musicList.al.name}}</rolling-marquee>
                    <div class="topName">
                        <span v-for="(item,i) in musicList.ar" :key="i">
                            {{item.name}}
                        </span>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-xiangyoujiantou"></use>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="musicDetailRight">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fenxiang"></use>
                </svg>
            </div>
        </div>
        <div class="musicDetailContent" v-show="!isLyricShow" @click="lyricShow()">
            <img src="@/assets/needle-ab.png" alt="" class="needle" :class="{needle_active: isbtnShow}">
            <img src="@/assets/cd.png" alt="" class="cd">
            <img :src="musicList.al.picUrl" alt="" class="cdimg" :class="{cd_paused: isbtnShow}">
        </div>
        <div class="musicLyric" v-show="isLyricShow" @click="lyricShow()" ref="musicLyric">
            <p v-for="(item,i) in lyric" :key="i"
                :class="{lyricActive:(currentTime *1000>=item.time && currentTime *1000<item.pre)}">
                {{item.lrc}}
            </p>
        </div>
        <div class="musicDetailFooter">
            <div class="footerTop">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-aixin"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiazai-wenjianxiazai-07"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-lingsheng"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-pinglun"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-gengduo-shuxiang"></use>
                </svg>
            </div>
            <div class="footerContent">
                <van-slider v-model="currentTime" @change="onChange" :max="duration" :min="0" />
            </div>
            <div class="footer">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-liebiaoxunhuan"></use>
                </svg>
                <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
                    <use xlink:href="#icon-shangyishoushangyige"></use>
                </svg>
                <svg class="icon" aria-hidden="true" v-if="isbtnShow" @click="play">
                    <use xlink:href="#icon-bofang"></use>
                </svg>
                <svg class="icon" aria-hidden="true" v-else @click="play">
                    <use xlink:href="#icon-zanting"></use>
                </svg>
                <svg class="icon" aria-hidden="true" @click="goPlay(1)">
                    <use xlink:href="#icon-xiayigexiayishou"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-24gl-playlistMusic3"></use>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapMutations, mapState } from 'vuex'
    import RollingMarquee from "vue-rolling-marquee";
    export default {
        props: ['musicList', 'play', 'setTime'],
        components: {
            RollingMarquee
        },
        data() {
            return {
                isLyricShow: false,
                lyric: {},
            }
        },
        computed: {
            ...mapState(['detailShow',
                'isbtnShow',
                'lyricList',
                'currentTime',
                'playListIndex',
                'duration']),
        },
        methods: {
            ...mapMutations(['updateDetailShow', 'updateIsbtnShow', 'updateCurrent', 'updatePlayListIndex']),
            lyricShow() {
                this.isLyricShow = !this.isLyricShow
                let arr;
                if (this.lyricList.lyric) {
                    arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
                        let min = item.slice(1, 3)
                        let sec = item.slice(4, 6)
                        let mill = item.slice(7, 10)
                        let lrc = item.slice(11, item.length)
                        let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
                        // console.log(item)
                        if (isNaN(Number(mill))) {
                            mill = item.slice(7, 9)
                            lrc = item.slice(10, item.length)
                            time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
                        }
                        return { min, sec, mill, lrc, time }
                    })
                }
                arr.forEach((item, i) => {
                    if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
                        item.pre = 100000
                    }
                    else {
                        item.pre = arr[i + 1].time
                    }
                });
                this.lyric = arr
            },
            goPlay(num) {
                let index = this.playListIndex + num
                if (index < 0) {
                    index = this.musicListIndex - 1
                } else if (index == this.musicList.length) {
                    index = 0
                }
                this.updatePlayListIndex(index)
            },
            onChange(value) {
                this.updateCurrent(value)
                this.setTime(value)
            }
        },
        watch: {
            currentTime: function () {
                let p = document.querySelector("p.lyricActive")
                if (p && p.offsetTop > 300) {
                    this.$refs.musicLyric.scrollTop = p.offsetTop - 300
                }
                if (this.$refs.ended) {
                    this.updatePlayListIndex((this.playListIndex + 1) % (this.musicList.length))
                }
            },
        },
    }
</script>

<style>
    .musicDetail {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100vh;
        width: 100vw;
    }

    .detailbg {
        width: 100vw;
        height: 100%;
        position: absolute;
        z-index: -1;
        filter: blur(70px);
    }

    .musicDetailTop {
        width: 100vw;
        height: 50px;
        display: flex;
        padding: 10px;
        justify-content: space-between;
        align-items: center;
        fill: #fff;
    }

    .musicDetailLeft {
        display: flex;
        align-items: center;
    }

    .leftMarquee {
        width: 200px;
        height: 100%;
        margin-left: 20px;
    }

    .topName .icon {
        width: 10px;
        height: 10px;
    }

    .musicDetailContent {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
    }

    .needle {
        width: 2rem;
        height: 3rem;
        top: -5.5rem;
        position: absolute;
        left: 46%;
        transform-origin: 0 0;
        transform: rotate(0deg);
        transition: all 2s;
        z-index: 1;
    }

    .needle_active {
        width: 2rem;
        height: 3rem;
        top: -5.5rem;
        position: absolute;
        left: 46%;
        transform-origin: 0 0;
        transform: rotate(-30deg);
        transition: all 2s;
    }

    .cd {
        width: 5.5rem;
        height: 5.5rem;
        top: -4rem;
        position: absolute;
        bottom: -12.25rem;
        z-index: -1;
    }

    .cdimg {
        width: 3.5rem;
        height: 3.5rem;
        top: -3rem;
        border-radius: 50%;
        position: absolute;
        bottom: -150px;
        animation: rotate_cd 10s linear infinite;
    }

    @keyframes rotate_cd {
        0% {
            transform: rotateZ(0deg);
        }

        100% {
            transform: rotateZ(360deg);
        }
    }

    .cd_active {
        animation-play-state: running;
    }

    .cd_paused {
        animation-play-state: paused;
    }

    .musicDetailFooter {
        display: flex;
        flex-direction: column;
    }

    .footerTop {
        display: flex;
    }

    .footerContent {
        margin: 20px 0;
    }

    .footerTop svg {
        flex: 1;
    }
    .footer {
        display: flex;
    }
    .footer >svg {
        flex: 1;
    }

    .musicLyric {
        width: 100%;
        height: 30rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 10px;
        overflow: scroll;
        scroll-behavior: smooth;
    }

    .musicLyric p {
        color: #fff;
        margin-bottom: 20px;
        opacity: 50%;
        scroll-behavior: smooth;
    }

    .lyricActive {
        font-size: 25px;
    }

    /* 隐藏滚动条 */
    ::-webkit-scrollbar {
        display: none
    }
</style>