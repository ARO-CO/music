import { Swipe, SwipeItem, Button,Popup,Slider } from "vant"
import Vue from 'vue'
let plugins=[
    Swipe,SwipeItem,Button,Popup,Slider
]
export default function getVant(app){
    plugins.forEach((item)=>{
        return Vue.use(item)
    })
}