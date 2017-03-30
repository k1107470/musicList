qq音乐api数据接口实现的SPA
=================

### 开发阶段使用
* npm+bower进行包管理，package.json有预先写好脚本，只需要`npm  install`即可包安装，启动gulp的预编译功能

### 内容介绍
1. 框架使用：bootstrap+angular，angular使用ui-router进行路由操作
2. 视图、控制器划分：
    视图部分：
    player.html 实例化h5 audio的一个自制播放器
    home.html 主页
    tabs.html 左边选项
    songList.html 榜单列表
    searchList.html 搜索列表
    details.html 详细信息  
     
    控制器：
    audio.js对应播放器插件的功能
    config 常量配置
    service.js 数据接口数据操作的方法
    home.js 主页相关数据、行为暴露，轮播图指令
    songList.js 榜单数据、行为暴露
    searchList.js 搜索页面的数据、行为暴露
    details.js 详细页面的数据、行为暴露 
    route.js 总路由控制    