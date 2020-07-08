<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  .el-menu-item {  //设置二级菜单的默认样式
  color: #a6a6a6;
    background-color: #3f4d5e !important;
  }

  .el-menu-item:hover {  //设置二级菜单的鼠标经过时候的样式
  background-color: #515e6f !important;
    color: #fff !important;
  }

  .el-submenu__title {  //设置一级菜单选项默认状态的样式
  font-size: 16px;
    background-color: #354252 !important;
  }

  .el-submenu__title:hover { //设置一级菜单选项鼠标经过的样式
  color: #409eff !important;
    background-color: #252f3b !important;
  }

  .el-submenu.is-opened .el-submenu__title {//设置一级菜单点开后的状态
  color: #409eff !important;
    background-color: #252f3b !important;
    border-left: 2px solid #409eff;
  }

  .el-menu-item.firstPageMenu { //首页默认样式
  font-size: 16px;
    background-color: #354252 !important;
  }

  .firstPageMenu.el-menu-item:hover { //首页鼠标经过样式
  color: #409eff !important;
    background-color: #252f3b !important;
  }

  .firstPageMenu.el-menu-item.is-active {  //设置首页选中时候的样式
  color: #409eff !important;
    background-color: #252f3b !important;
    border-left: 2px solid #409eff;
  }
</style>
