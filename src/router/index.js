import vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/view/layout'
import Home from '@/view/home'
import Play from '@/view/play'
import Search from '@/view/search'

vue.use(VueRouter)

const routes = [
    {
        path:'/',
        redirect:'/layout'
    },
    {
        path:'/layout',
        redirect:'/layout/home',
        component: Layout,
        children:[
            {
                path:'home',
                component: Home,
                meta:{
                    title:'首页'
                }
            },
            {
                path:'search',
                component: Search,
                meta:{
                    title:'搜索'
                }
            },
        ]
    },
    
    {
        path:'/play',
        component: Play
    },
]
const router = new VueRouter({
    routes
})

export default router