import request from '@/util/request'
export const hotList = params => request({
    url:'/search/hot',
    params
})

export const searchLsit = params => request({
    url:'/cloudsearch',
    params
})