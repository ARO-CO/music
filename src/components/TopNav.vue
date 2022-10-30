<template>
    <div class="topNav">
        <div class="topLeft">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-24gl-playlistMusic3"></use>
            </svg>
        </div>
        <div class="topContent">
            <span @click="$router.push('/infoUser')">我的</span>
            <span style="font-weight:bold">发现</span>
            <span>云村</span>
            <span>视频</span>
        </div>
        <div class="topRight">
            <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
        </div>
    </div>
</template>

<style>
    .topNav {
        width: 100vw;
        padding: 10px;
        display: flex;
        /* 行内首位元素放置 */
        justify-content: space-between;
        /* 垂直居中 */
        align-items: center;
    }
    .topContent {
        width: 70%;
        height: 100%;
        display: flex;
        /* 行内顺序等间隔排列 */
        justify-content: space-around;
    }
</style>