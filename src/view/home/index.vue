<template>
  <div>
    <!-- 歌单部分 -->
    <p class="title">推荐歌单</p>
    <van-row gutter="6">
      <van-col span="8" v-for="obj in songList" :key="obj.id">
        <van-image
          fit="cover"
          width="100%"
          height="3rem"
          :src="obj.picUrl"
          />
          <p class="song_name">{{obj.name}}</p>
      </van-col>
    </van-row>

    <!-- 歌曲部分 -->
    <p class="title">最新音乐</p>
    <!-- <van-cell center  :title="obj.name"  :label="obj.song.artists[0].name +'---'+  obj.name" v-for="obj in newMusicLsit" :key="obj.id">
       <template #right-icon>
          <van-icon name="play-circle-o" size="0.6rem" />
        </template>
    </van-cell> -->
    <ShowItem :name="obj.name"  :author="obj.song.artists[0].name" :id="obj.id" v-for="obj in newMusicLsit" :key="obj.id"></ShowItem>
  </div>
</template>
<script>
import {recommendMusicAPI} from '@/api'
import {newMusicAPI} from '@/api'
import ShowItem from '@/components/ShowItem.vue'
export default {
  data(){
    return {
        songList:[],
        newMusicLsit:[]
    }
  },
    async created(){
       const res = await recommendMusicAPI({
        limit: 6
       })
        this.songList = res.data.result

        const res1 = await newMusicAPI({
        limit: 20
       })
       this.newMusicLsit = res1.data.result
        
    },
    components:{
      ShowItem
    }
}
</script>

<style scoped>
     /* 标题 */
.title {
  width: 100%;
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
  background-color: #eee;
  color: #333;
  font-size: 15px;
}
/* 推荐歌单 - 歌名 */
.song_name {
  font-size: 0.346667rem;
  padding: 0 0.08rem;
  margin-bottom: 0.266667rem;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}
.van-cell{
  border-bottom:1px solid lightgray;
}
</style>