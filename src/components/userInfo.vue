<template>
    <div class="userInfo">
        <div class="loading" v-if="isloading">
            <img src="../assets/loading.gif" alt="加载中">
        </div>
        <div v-else>
            <section class="main">
                <div class="header topbar">
                    <span>主页 /</span>
                </div>
                <div class="info">
                    <div class="userName">
                        <img class="avatar" :src="userInfo.avatar_url" alt="头像">
                        <p>{{userInfo.loginname}}</p>
                    </div>
                    <ul>
                        <li>{{userInfo.score}}积分</li>
                        <li></li>
                        <li></li>
                        <li class="creatTime">注册时间{{userInfo.create_at | formatDate}}</li>
                    </ul>
                </div>
            </section>
            <section class="recent_replies">
                <div class="header">
                    <span>最近创建的话题</span>
                </div>
                <ul>
                    <li class="item" v-for="(item,index) in userInfo.recent_topics" :key="index">
                        <img class="avatar" :src="item.author.avatar_url" alt="">
                        <!-- 标题 -->
                        <router-link
                            :to="{
                        name:'articleLink',
                        params:{
                            id:item.id
                        }
                    }"
                        >
                            <span class="title">{{item.title}}</span>
                        </router-link>
                        <span class="last_reply_at">{{item.last_reply_at| formatDate}}</span>
                    </li>
                </ul>
            </section>
            <section class="recent_topics">
                <div class="header">
                    <span>最近参与的话题</span>
                </div>
                <ul>
                    <li class="item" v-for="(item,index) in userInfo.recent_replies" :key="index">
                        <img class="avatar" :src="item.author.avatar_url" alt="">
                        <!-- 标题 -->
                        <router-link
                            :to="{
                        name:'articleLink',
                        params:{
                            id:item.id
                        }
                    }"
                        >
                            <span class="title">{{item.title}}</span>
                        </router-link>
                        <span class="last_reply_at">{{item.last_reply_at| formatDate}}</span>
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    name: 'userInfo',
    data () {
        return {
            isloading: false,
            userInfo: {}
        }
    },
    methods: {
        getDate () {
            this.$axios.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
                .then((res) => {
                    this.userInfo = res.data.data
                }).catch((err) => {
                    console.log(err);
                })
        }
    },
    beforeMount () {
        this.isloading = true
        this.getDate()
    },
    mounted () {
        this.isloading = false
    }
}
</script>

<style scoped>
.userInfo {
  margin-right: 340px;
  margin-top: 15px;
  margin-left: 68px;
}
section {
  margin: 20px 0;
  background-color: #fff;
}

.header {
  padding: 10px;
  background-color: #f6f6f6;
  border-radius: 3px 3px 0 0;
}
.topbar {
  color: #80bd01;
}
.info {
  padding: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
.userName {
  display: flex;
  color: #778087;
  align-items: center;
}
li {
  list-style: none;
  line-height: 2em;
  margin: 10px 0;
}
.creatTime {
  color: #ababab;
}
.item {
  display: flex;
  padding: 10px;
  align-items: center;
  position: relative;
}

.avatar {
  width: 30px;
  height: 30px;
}
.title {
  color: #08c;
  max-width: 70%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.title:hover {
  color: #005580;
  text-decoration: underline;
}

.last_reply_at {
  position: absolute;
  right: 10px;
}
</style>
