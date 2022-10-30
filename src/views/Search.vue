<template>
    <div>
        <div class="searchTop">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
            <input type="text" @keydown.enter="enterKey" v-model="searchKey">
        </div>
        <div class="searchHistory">
            <span class="searchSpan">历史</span>
            <span v-for="(item,i) in keyWordList" :key="i" class="spanKey" @click="searchHistory(item)">
                {{item}}
            </span>
            <svg class="icon" aria-hidden="true" @click="clear">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
        </div>
    </div>
</template>

<script>
    import { getSearchMusic } from "@/request/api/home.js"
    import axios from "axios"
    export default {
        data() {
            return {
                keyWordList: [],
                searchKey: "",
                searchList: [],
            }
        },
        methods: {
            enterKey: async function() {
                if (this.searchKey) {
                    this.keyWordList.unshift(this.searchKey)
                    // 去重
                    this.keyWordList = [...new Set(this.keyWordList)]
                    // 限制长度 可以pop
                    if (this.keyWordList.length > 5) {
                        this.keyWordList.splice(this.keyWordList.length - 1, 1)
                    }
                    localStorage.setItem('keyWordList', JSON.stringify(this.keyWordList))

                    let res = await getSearchMusic(this.searchKey)
                    // axios.get('http://localhost:3000/cloudsearch?keywords=' + this.searchKey).then((res) => {
                    //     this.searchList = res.data.result.songs
                    //     console.log(res)
                    // })
                    this.searchList = res.data.result.songs
                    // console.log(res)
                    this.searchKey = ""
                }
            },
            clear() {
                localStorage.removeItem("keyWordList")
                this.keyWordList = []
            },
            searchHistory:async function(item){
                let res = await getSearchMusic(item)
            }
        },
        mounted() {
            this.keyWordList = JSON.parse(localStorage.getItem("keyWordList")) || []
        }
    }
</script>

<style>
    .searchTop {
        width: 100vw;
        height: 50px;
        padding: 0 10px;
        display: flex;
        align-items: center;
    }

    .searchTop input {
        margin-left: 20px;
        border: none;
        border-bottom: 1px solid #999;
        width: 90%;
        padding: 5px;
    }

    .searchHistory {
        width: 100%;
        padding: 10px;
        position: relative;
    }

    .searchSpan {
        font-weight: 700;
    }

    .spanKey {
        padding: 5px 10px;
        background-color: rgb(185, 169, 169);
        border-radius: 20px;
        margin: 5px 10px;
        display: inline-block;
    }

    .searchHistory .icon {
        width: 15px;
        height: 15px;
        position: absolute;
        right: 10px;
    }
</style>