<template> 
  <div class="app-container">
    <h2>项目相关博客列表!</h2>
    <div class="table-container">
      <el-table :data="blogList" border style="width: 100%" stripe>
        <el-table-column prop="category" label="专栏分类"  min-width="20%" align="center">
          <template slot-scope="scope">
            <a :href="scope.row.category_url" target="_blank" class="buttonText">{{scope.row.category}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="category" label="文章标题（链接）" min-width="80%">
          <template slot-scope="scope">
            <a :href="scope.row.blog_url" target="_blank" class="buttonText">{{scope.row.blog_itle}}</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        blogList: [
          {"category": "Spring Security","category_url": "https://blog.csdn.net/still_ly/category_10406054.html","blog_itle": "一、Spring Security核心原理及Demo演示", "blog_url":"https://blog.csdn.net/STIll_ly/article/details/108398767"},
          {"category": "Spring Security","category_url": "https://blog.csdn.net/still_ly/category_10406054.html","blog_itle": "二、Spring Security认证和授权-基于表单的认证流程及源码解析", "blog_url":"https://blog.csdn.net/STIll_ly/article/details/108926079"},
          {"category": "Spring Security","category_url": "https://blog.csdn.net/still_ly/category_10406054.html","blog_itle": "三、Spring Security认证和授权-授权流程及源码解析", "blog_url":"https://blog.csdn.net/STIll_ly/article/details/108932251"},
          {"category": "Spring Security","category_url": "https://blog.csdn.net/still_ly/category_10406054.html","blog_itle": "四、Spring Security认证和授权-动态授权解决方案", "blog_url":"https://blog.csdn.net/STIll_ly/article/details/108941998"},
          {"category": "Spring Security","category_url": "https://blog.csdn.net/still_ly/category_10406054.html","blog_itle": "五、Spring Security认证和授权-实现自定义图片验证码功能", "blog_url":"https://blog.csdn.net/STIll_ly/article/details/109294579"},
          {"category": "前端","category_url": "https://blog.csdn.net/still_ly/category_10350060.html","blog_itle": "一、资源管理系统-CKPLayer去除播放窗口水印", "blog_url":"https://blog.csdn.net/STIll_ly/article/details/108347854"},
          {"category": "前端","category_url": "https://blog.csdn.net/still_ly/category_10350060.html","blog_itle": "二、资源管理系统-VUE使用ckplayer实现视频列表播放", "blog_url":"https://blog.csdn.net/STIll_ly/article/details/108342856"},
        ],
      }
    },
    created() {
    },
    methods: {
    },
  }
</script>
<style>

</style>
