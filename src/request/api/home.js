import service from '..'
// 获取首页轮播数据
export function getBanner(){
    return service({
        // 传一个对象
        method:"GET",
        url:"/banner?type=2",
    })
}
// 发现好歌单
export function getMusicList (){
    return service ({
        methods:"GET",
        url:"/personalized?limit=10"
    })
}
// 搜索
export function getSearchMusic(data){
    return service ({
        methods:"GET",
        url:`/cloudsearch?keywords=${data}`
    })
}
// 登录
export function getPhoneLogin(data){
    return service ({
        methods:"GET",
        url:`/login/cellphone?phone=${data.phone}&password=${data.password}`
    })
}
// 获取用户详情
export function getLoginUser(data){
    return service ({
        methods:"GET",
        url:`/user/detail?uid=${data}`
    })
}