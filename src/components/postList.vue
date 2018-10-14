<template>
    <div class="itemList">
        <div class="loading" v-if="isloading">
            <img src="../assets/loading.gif" alt="加载中">
        </div>
        <!--帖子列表 -->
        <div v-else class="list">
            <ul>
                <li>
                    <div class="topbar">
                        <span>全部</span>
                        <span>精华</span>
                        <span>分享</span>
                        <span>问答</span>
                        <span>招聘</span>
                    </div>
                </li>
                <li class="item" v-for="(item,index) in list" :key="index">
                    <img class="avatar" :src="item.author.avatar_url" alt="">
                    <span class="allcount">
                        <span class="reply_count">{{item.reply_count}}</span>
                        /{{item.visit_count}}
                    </span>
                    <span
                        :class="[{
                    putGood:(item.good  === true),
                    putTop:(item.top  === true),
                    putNormal:(item.good  !== true && item.top  !== true)
                    }]"
                    >{{item | formatTab}}</span>
                    <!-- 标题 -->
                    <router-link
                        :to="{
                        name:'articleLink',
                        params:{
                            id:item.id,
                            name:item.author.loginname
                        }
                    }"
                    >
                        <span class="title">{{item.title}}</span>
                    </router-link>
                    <span class="last_reply_at">{{item.last_reply_at| formatDate}}</span>
                </li>
                <li>
                    <pagination @handleList="changeList"></pagination>
                </li>
            </ul>
        </div>
    </div>
</template>


<script>
import pagination from './pagination'
export default {
    name: 'itemList',
    data () {
        return {
            isloading: false,
            list: [],
            currentPage: 1

        }
    },
    methods: {
        getData () {
            this.$axios.get('https://cnodejs.org/api/v1/topics', {
                params: {
                    page: this.currentPage,
                    limit: 15,
                }
            }).then((res) => {
                console.log(res);
                this.list = res.data.data
                console.log(this.list);
            }).catch(err => {
                console.log(err);
            })
        },
        changeList (val) {
            this.currentPage = val
            this.getData()
        }
    },
    components: {
        pagination
    },
    beforeMount () {
        this.isLoading = true;
        this.getData()
    },

}
</script>

<style scoped>
li {
  list-style: none;
}
.itemList {
  background-color: white;
  margin: 15px 68px;
}
.item {
  display: flex;
  padding: 10px;
  align-items: center;
  position: relative;
}
.item:hover {
  background: #f5f5f5;
}
.avatar {
  width: 30px;
  height: 30px;
}
.title {
}
.putGood,
.putTop {
  background: #80bd01;
  padding: 2px 4px;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  color: #fff;
  font-size: 12px;
  margin-right: 10px;
}

.putNormal {
  background-color: #e5e5e5;
  color: #999;
  padding: 2px 4px;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  font-size: 12px;
  margin-right: 10px;
}
.allcount {
  width: 80px;
  display: inline-block;
  text-align: center;
  font-size: 12px;
}

.reply_count {
  color: #9e78c0;
  font-size: 14px;
}
.last_reply_at {
  position: absolute;
  right: 10px;
}

.topbar {
  height: 40px;

  background-color: #f6f6f6;
  border-radius: 3px 3px 0 0;
}

.topbar span {
  font-size: 14px;
  color: #80bd01;
  line-height: 40px;
  margin: 0 10px;
  cursor: pointer;
}

.topbar span:hover {
  color: #9e78c0;
}

a {
  display: inline-block;
  max-width: 70%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

a:hover {
  text-decoration: underline;
}

.loading {
  text-align: center;
  padding-top: 300px;
}
</style>
