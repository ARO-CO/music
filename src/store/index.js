import { getMusicLyric } from '@/request/api/item'
import { getPhoneLogin } from '@/request/api/home'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    playList: [{
      al: {
      id: 11307,
      name: "红日",
      pic: 109951166784613150,
      picUrl: "https://p2.music.126.net/TOsZX8iEymJggFtrNLFY8g==/109951166784613153.jpg",
      pic_str: "109951166784613153",
      },
      id: 115502
    }],
    playListIndex:0,
    isbtnShow:true,//暂停按钮
    detailShow:false,//歌曲详情
    lyricList:{},//歌词
    currentTime:0,//歌曲当前时间
    // backgroundUrl:{},
    duration:0,//歌曲时长
    isLogin:false,//是否登录
    isFooterMusic:true,//是否需要显示播放器
    token:'',

  },
  getters: {
  },
  mutations: {
    updateIsbtnShow: function(state,value){
      state.isbtnShow=value
    },
    updatePlayList:function(state,value){
      state.playList=value
      // console.log(state.playList)
    },
    updatePlayListIndex:function(state,value){
      state.playListIndex=value
    },
    updateDetailShow:function(state){
      state.detailShow=!state.detailShow
    },
    updateLyricList:function(state,value){
      state.lyricList=value
    },
    updateCurrent:function(state,value){
      state.currentTime=value
    },
    // updateBackgroundUrl:function(){
    // },
    updateDuration:function(state,value){
      state.duration=value
    },
    updateToken(state,value){
      state.token=value
    }
  },
  actions: {
    getLyric:async function(context,value){
      let res =await getMusicLyric(value)
      // console.log(res)
      context.commit("updateLyricList",res.data.lrc)
    },
    getLogin: async function(context,value){
      let res =await getPhoneLogin(value)
      // console.log(res)
      return res
    }
  },
  modules: {
  }
})
