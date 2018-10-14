<template>
    <div class="header">
        <img  src="../assets\cnodejs_light.svg" alt="logo" >
        <ul>
            <li><a href="">首页</a></li>
            <li><a href="">新手入门</a></li>
            <li><a href="">API</a></li>
            <li><a href="">关于</a></li>
            <li><a href="">注册</a></li>
            <li><a href="">登录</a></li>
        </ul>
    </div>
</template>

<script>
    export default{
        name:'Header'
    }
</script>

<style scoped>
li{
    list-style: none;
}
.header{
    display: flex;
    justify-content:space-between;
    background-color: #444;
    padding: 0 67px;
    height: 50px;
}

.header>img{
    max-width: 120px;
    padding: 7px 0 8px 0;
}

ul{
    display: flex;
    align-items: center;
    justify-content: center;
}


a{
    padding: 10px 15px;
    color: #ccc;
    font-size: 13px;
}
</style>
