<template>
  <div class="article">
    <div class="loading" v-if="isloading">
      <img src="../assets/loading.gif" alt="加载中">
    </div>
    <div v-else>
      <div class="topic_main">
        <div class="topic_title">{{post.title}}</div>
        <ul class="msg">
          <li>•发布于：{{post.create_at | formatDate}}</li>
          <li>• 作者：{{post.author.loginname}}</li>
          <li>• {{post.visit_count}}次浏览</li>
          <li>•来自{{post | formatTab}}</li>
        </ul>
        <div v-html="post.content" class="topic_content markdown-body"></div>
      </div>
      <!-- 回复列表 -->
      <div class="reply">
        <div class="header">回复</div>
        <div v-for="(reply,index)  in post.replies" :key="index" class="replySec">
          <div class="replyUp">
            <!-- 点击头像跳转到用户信息界面 -->
            <router-link
              :to="{
            name:'user_info',
            params:{
              name:reply.author.loginname
            }
             }"
            >
              <img :src="reply.author.avatar_url" alt="">
            </router-link>
            <!-- 点击姓名跳转到用户信息界面 -->
            <router-link
              :to="{
          name:'user_info',
          params:{
            name:reply.author.loginname
          }
          }"
            >
              <span>{{reply.author.loginname}}</span>
            </router-link>
            <span>{{index+1}}楼</span>
            <span class="ups" v-if="reply.ups.length>0">{{reply.ups.length}}</span>
            <span v-else></span>
          </div>
          <p v-html="reply.content" class="markdown-body"></p>
        </div>
      </div>
    </div>
  </div>
</template>




<script>
export default {
  name: 'mainarticle',
  data () {
    return {
      isloading: false,
      post: {}
    }
  },
  methods: {
    getDate () {
      this.$axios.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
        .then((res) => {
          this.post = res.data.data

        }
        ).catch((err) => {
          console.log(err);
        })
    }
  },
  watch:{
    //检测路由变化
    '$route'(from,to){
      this.getDate()
    }
  },
  beforeMount () {
    this.getDate()
  }
}
</script>



<style scope>
.markdown-body {
  padding-left: 50px;
}
.article {
  margin-right: 340px;
  margin-top: 15px;
  margin-left: 68px;
  
}

.reply,
.topic_main {
  background-color: #fff;
}

.reply {
  margin: 15px 0;
}

.reply img {
  width: 30px;
  height: 30px;
  position: relative;
  bottom: -9px;
}
.header {
  padding: 10px;
  background-color: #f6f6f6;
  border-radius: 3px 3px 0 0;
}
.reply a,
.reply span {
  font-size: 13px;
  color: #666;
  text-decoration: none;
}
.replySec {
  border-bottom: 1px solid #e5e5e5;
  padding: 0 10px;
}

.loading {
  text-align: center;
  padding-top: 300px;
}

.replyUp a:nth-of-type(2) {
  margin-left: 0px;
  display: inline-block;
}

.topic_main {
  padding: 10px;
}

.topic_title {
  font-size: 20px;
  font-weight: bold;
  padding-top: 8px;
}

.topic_main .msg {
  margin: 6px 0px;
}

.topic_main .msg li {
  display: inline-block;
  font-size: 12px;
  color: #838383;
}

.topic_content {
  border-top: 1px solid #e5e5e5;
  padding: 0 10px;
}
</style>
