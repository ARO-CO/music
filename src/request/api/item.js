import service from "..";
// 获取歌单详情页
export function getMusicItemList(data) {
    return service({
        method:"GET",
        url:`/playlist/detail?id=${data}`
    })
}
export function getMusicLyric(data){
    return service({
        method:"GET",
        url:`/lyric?id=${data}`
    })
}