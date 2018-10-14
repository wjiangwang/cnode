<template>
    <div class="sideBar">
        <div class="author">
            <div class="header">作者</div>
            <router-link
                :to="{name:'user_info',params:{
                name:userInfo.loginname
            }}"
            >
                <div class="userName">
                    <img class="avatar" :src="userInfo.avatar_url" alt="头像">
                    <p>{{userInfo.loginname}}</p>
                </div>
            </router-link>
        </div>
        <div class="recent_topics">
            <div class="header">作者最近主题</div>
            <ul>
                <li v-for="(item,index) in limtListTopics" :key="index">
                    <router-link
                        :to="{name:'articleLink',params:{
                            id:item.id,
                            name:item.author.loginname
                }}"
                    >{{item.title}}</router-link>
                </li>
            </ul>
        </div>
        <div class="recent_replies">
            <div class="header">作者最近回复</div>
            <ul>
                <li v-for="(item,index) in limtListReplies" :key="index">
                    <router-link
                        :to="{name:'articleLink',params:{
                            id:item.id,
                            name:item.author.loginname
                }}"
                    >{{item.title}}</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>


<script>
export default {
    name: 'sideBar',
    data () {
        return {
            userInfo: {},

        }
    },

    methods: {
        getDate () {
            this.$axios.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
                .then((res) => {
                    this.userInfo = res.data.data
                    console.log('1111111111111111111111');
                    console.log(res);
                }).catch((err) => {
                    console.log(err);
                })
        }
    },
    computed: {
        limtListTopics () {
            if (this.userInfo.recent_topics) {
                return this.userInfo.recent_topics.slice(0, 5);
            }
        },
        limtListReplies () {
            if (this.userInfo.recent_replies) {
                return this.userInfo.recent_replies.slice(0, 5);
            }
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
.sideBar {
  float: right;
  margin: 15px 40px;
  width: 290px;
}
.header {
  padding: 10px;
  background-color: #f6f6f6;
  border-radius: 3px 3px 0 0;
}
.author,
.recent_topics,
.recent_replies {
  background: #fff;
  margin: 20px;
  padding-bottom: 10px;
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
  padding: 3px 0;
}
.recent_replies ul,
.recent_topics ul {
  margin-top: 0px;
  margin-bottom: 0px;
  list-style: none;
  padding-left: 14px;
}

ul a {
    display: inline-block;
    width: 100%;
  font-size: 12px;
  text-decoration: none;
  color: #778087;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>


