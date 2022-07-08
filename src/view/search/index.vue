<template>
  <div>
    <van-search
     v-model="value" 
     placeholder="请输入搜索关键词" 
     shape="round"
     @input="iptFn()"
     />

      <!-- 热搜词_容器 -->
     <div class="search_wrap" v-if="searchHotLsit.length === 0">
        <p class="hot_title">热门搜索</p>
        <div class="hot_name_wrap">
            <span class="hot_item" v-for="(obj,ind) in hotList" :key="ind"
              @click="fn(obj.first)"
            >{{obj.first}}</span>
        </div>
     </div>
     <div class="search_wrap" v-else>
        <p class="hot_title">最佳匹配</p>
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad">
          <!-- <van-cell center  :title="obj.name"  :label="obj.ar[0].name +'---'+  obj.name" v-for="obj in searchHotLsit" :key="obj.id">
            <template #right-icon>
              <van-icon name="play-circle-o" size="0.6rem" />
            </template>
          </van-cell> -->
          <ShowItem :name="obj.name"  :author="obj.ar[0].name" :id="obj.id" v-for="obj in searchHotLsit" :key="obj.id"></ShowItem>
        </van-list>
     </div>
  </div>
</template>

<script>
import {hotListAPI} from '@/api'
import {searchLsitAPI} from '@/api'
import ShowItem from '@/components/ShowItem.vue'
export default {
  components:{
      ShowItem,
  },
  data(){
    return{
      value:'',
      hotList:[],
      searchHotLsit:[],
      timer: null,
      loading: false,
      finished: false,
      page: 1
    }
  },
    async created(){
      const res = await hotListAPI({})
      this.hotList = res.data.result.hots
    },
  methods:{
    async getlist(){
        return await searchLsitAPI({
          limit:20,
          keywords:this.value,
          offset: (this.page - 1) * 20
        })
    },

    // 点击热搜歌曲
    async fn(val){
      this.page = 1  //避免上一次请求加载更多之后的数据条数影响到新请求的数据的条数
      this.finished = false   //当点击时让list组件重新执行触底加载，否则当某条数据没有更多时this.finished会被改成true导致其他数据加载不全。
      this.value =val
      const res = await this.getlist()
       this.searchHotLsit = res.data.result.songs
      console.log(res)
    },

    // 搜索框
    async iptFn(){
      this.page = 1  //避免上一次请求加载更多之后的数据条数影响到新请求的数据的条数
      // 防抖
        if(this.timer){
           clearTimeout(this.timer)
        }
        this.timer = setTimeout( async() => {
          if(this.value === ''){
          this.searchHotLsit = []
          return 
        }
        const res = await this.getlist()
        if(!res.data.result.songs){
          // 当没有歌名数据的时候判断，防止报错
          return this.searchHotLsit = []
        }
        this.searchHotLsit = res.data.result.songs
        }, 500)
    },
      // 加载
      async onLoad() {
        // if(this.value === ''){
        //   this.searchHotLsit = []
        //   return 
        // }
        this.page++
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        const res = await this.getlist()
         if(!res.data.result.songs){
          // 当没有更多歌名数据的时候判断，防止报错
          this.finished = true //true表示停止加载更多
          return 
        }
        this.searchHotLsit = [...this.searchHotLsit,...res.data.result.songs,]
        this.loading = false
      },
    }
  }
</script>

<style scoped>
    /* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
</style>