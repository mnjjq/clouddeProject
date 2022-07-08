<template>
    <van-cell center  :title="name"  :label="author + name">
            <template #right-icon>
              <van-icon name="play-circle-o" size="0.6rem" 
                @click="playFn"
              />
            </template>
          </van-cell>
          <!-- <van-cell center  :title="obj.name"  :label="obj.ar[0].name +'---'+  obj.name" v-for="obj in searchHotLsit"> -->
</template>

<script>
export default {
    props:{
        name: String,
        author: String,
        id: Number
    },
    methods:{
        playFn(){
            this.$router.push({
                path: '/play',
                query: {
                    id: this.id
                }
            })
        }
    }
}
</script>

<style>

</style>