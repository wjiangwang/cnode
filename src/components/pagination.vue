<template>
    <div class="pagination">
        <button @click="changebtn('firstPage')">首页</button>
        <button @click="changebtn('prePage')">上一页</button>
        <button
            v-for="(btn,index) in pagebtn "
            @click="changebtn(btn)"
            :key="index"
            :class="[{currentPage:btn===currentPage},'pagbtn']"
        >{{btn}}</button>
        <button @click="changebtn('nextPage')">下一页</button>
    </div>
</template>

<script>
import $ from "jquery";
export default {
    name: 'pagination',
    data () {
        return {
            pagebtn: [1, 2, 3, 4, 5, '...'],
            currentPage: 1,
        }
    },
    methods: {
        changebtn (btn) {

            if (typeof btn !== 'number') {
                if (btn === 'firstPage') {
                    this.pagebtn = [1, 2, 3, 4, 5, '...']
                    this.changebtn(1)
                } else if (btn === 'prePage' && this.currentPage !== 1) {
                    console.log(this.currentPage);
                    $('.currentPage').prev().click()
                } else if (btn === 'nextPage') {
                    $('.currentPage').next().click()
                } else if (btn === '...') {
                    $('.currentPage').next().click()
                }

            } else {
                this.currentPage = btn
                if (btn === this.pagebtn[4]) {
                    this.pagebtn.shift()
                    this.pagebtn.splice(4, 0, this.pagebtn[3] + 1)
                } else if (btn === this.pagebtn[0] && btn !== 1) {
                    this.pagebtn.unshift(this.pagebtn[0] - 1)
                    this.pagebtn.splice(5, 1)
                }
            }
            this.$emit('handleList', this.currentPage)
        }
    }
}
</script>

<style scoped>
.pagination {
  margin-top: 5px;
  margin-bottom: 20px;
  background-color: white;
  padding: 6px 20px;
  border-radius: 5px;
  box-shadow: 0px 2px 9px #888888;
}

button {
  background-color: #fff;
  border: 1px solid #ddd;
  color: #778087;
  border-radius: 3px;
  outline: none;
  height: 21px;
  cursor: pointer;
  padding: 0 2px;
  width: 55px;
  height: 29px;
}

.pagebtn {
  position: relative;
  bottom: 1px;
  width: 40px;
  margin: 0 4px;
}

.currentPage {
  color: white;
  background-color: #e5e5e5;
}
</style>
