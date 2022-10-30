<template>
    <div>
        <div class="itemMusicTop">
            <div class="topLeft">
                <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                    <use xlink:href="#icon-houtui"></use>
                </svg>
                <span style="font-weight:bold" class="gedan">歌单</span>
            </div>
            <div class="topRight">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-sousuo"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-24gl-playlistMusic3"></use>
                </svg>
            </div>
        </div>
        <div class="details">
            <div class="cover">
                <img :src="playlist.coverImgUrl" class="bgimg">
                <div class="playCount">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-Playerplay"></use>
                    </svg>
                    <span>{{changeNum(playlist.playCount)}}</span>
                </div>
            </div>
            <img :src="playlist.coverImgUrl" class="coverimg">
            <div class="message">
                <div class="about">
                    <span class="title">{{playlist.name}}</span>
                </div>
                <div class="creator">
                    <div class="photo"><img :src="playlist.creator.backgroundUrl"></div>
                    <span class="name">{{playlist.creator.nickname}}</span>
                    <div class="follow">+关注</div>
                </div>
                <div class="about" maxlength="20">{{playlist.description}}</div>
            </div>
        </div>
        <div class="action">
            <div>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-pinglun"></use>
                </svg>
                <br />
                {{playlist.commentCount}}
            </div>

            <div>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fenxiang"></use>
                </svg>
                <br />
                {{playlist.shareCount}}
            </div>
            <div>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiazai-wenjianxiazai-07"></use>
                </svg>
                <br />
                <!-- {{playlist.subscribedCount}} -->
                下载
            </div>
            <div>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xuanze-duoxuan-tianchong"></use>
                </svg>
                <br />
                多选
            </div>
        </div>
    </div>
</template>

<script>
    import { mapMutations, mapState } from 'vuex'
    export default {
        props: {
            playlist: Object,
        },
        // data(){
        //     return {
        //     }
        // },
        computed:{
            // ...mapState(['backgroundUrl'])
        },
        // mounted() {
        // },
        methods: {
            // ...mapMutations(['updateBackgroundUrl']),
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
    .itemMusicTop {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        /* padding: 100px; */
    }

    topLeft,
    topRight {
        width: 25%;
        margin: 0 10px;
        position: absolute;
    }

    .gedan {
        color: white;
    }

    .bgimg {
        width: 100%;
        height: 16rem;
        position: fixed;
        z-index: -1;
        /* 背景虚化 */
        filter: blur(30px);
    }

    .itemMusicTop svg {
        margin-right: 10px;
    }

    .coverimg {
        height: 50%;
        width: 30%;
        margin: 10px;
        border-radius: 10px;
        float: left;
    }

    .detail {
        overflow: hidden;
        display: flex;

    }

    .about .title {
        font-size: large;
        color: white;

    }

    .photo img {
        display: inline-block;
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }

    .photo {
        overflow: hidden;
        margin-top: 10px;
        float: left;
    }

    .creator .name {
        margin-left: 10px;
        opacity: 50%;
        color: white;
        font-family: YouYuan;
        line-height: 50px;
    }

    .creator {
        display: flex;
    }

    .about {
        opacity: 50%;
        color: white;
        /* text-overflow: ellipsis;
        width: 60%;
        height: 50px;
        display: inline-block; */

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        /* 能够显示的行数，超出部分用...表示*/
        -webkit-box-orient: vertical;
    }

    .follow {
        opacity: 50%;
        color: white;
        height: 23px;
        width: 50px;
        margin-top: 15px;
        border-radius: 10px;
        margin-left: 5px;
        /* border: 1px solid white; */
        /* line-height:50px; */
        background-color: rgba(236, 236, 236, 0.306);
    }

    .action {
        margin-top: 80px;
        height: 50px;
        justify-content: space-around;
        display: flex;
    }

    .action svg {
        width: 30px;
        height: 30px;
    }

    .details .cover .playCount {
        /* 怎样给playcount定位？ */
        position: relative;
        top: 1rem;
        left: 15%;
    }
    
</style>