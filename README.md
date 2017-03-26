#个人配置的gulp+browserSync预编译的模板

##功能

1.less编译压缩
2.js合并，压缩，混淆
3.图片的复制
4.html的压缩
5.browserSync服务和监视==》该功能同步实现以上4个功能

##结构布局
根目录---
        |--dist  （最终展示的文件）
        |--src    (开发阶段文件目录)
            |--lib(第三方库)
            |--script（js文件）
            |--style（less文件）
            |--images（图片）
            |--index.html
            |--font(字体图标)
        |--node_modules(npm配置文件,开发依赖)
        |--.bowercc(bower安装第三方库的位置)
        |--.gitignore(git追踪忽略列表)
        |--bower.json(bower配置)
        |--gulpfile.js（gulp功能文件）
        |--package.json(npm配置)
        |--README.md

##使用方法    
    -环境配置，npm 安装，gulp设置为全局变量
    ```
    npm install
    npm install gulp -g --save-dev
    ```
    -命令行中启动 gulp server服务
    -进行开发
        开发过程中每当保存文件（html，js，less，图片），browsersync-sevrer就会同步刷新到网页上