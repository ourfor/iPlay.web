# 前言

一个简单、开源的视频点播平台，适配多种媒体服务器数据源

## 使用
![登录页面](./doc/image/Screen-20230821@2x4.png)

目前已经适配Emby数据源, 点击登录页面右下角⚙️, 填写emby服务器相关信息，然后点击登录即可

![登录设置](./doc/image/Screen-20230821@2x3.png)

## 界面

|![](./doc/image/20240313_125004.png)|![](./doc/image/20240313_125059.png)|![](./doc/image/20240313_125123.png)|
|-|-|-|
|![推荐页面](./doc/image/Screen-20230821@2x.png)|![推荐页面2](./doc/image/Screen-20230821@2x1.png)|![媒体列表](./doc/image/Screen-20230818@2x2.png)|
|![剧集详细](./doc/image/Screen-20230818@2x3.png)|![播放页面](./doc/image/Screen-20230818@2x4.png)|![登录页面](./doc/image/Screen-20230821@2x4.png)|

适配移动端

<div style="display: inline-flex;align-item:center;justify-content: space-around">
<img width="45%" src="./doc/image/IMG_0255.png" />
<img width="45%" src="./doc/image/IMG_0256.png" />
</div>



## 功能

- 支持emby数据源
- 支持多个emby站点切换
- 可以定制主题
- 可以播放视频
- 支持外部播放器调用

## 进度

学业繁重，业余时间开发，刚需可提issue

Todo:

- [ ] 完善用户界面交互
- [ ] 支持调用外部播放器
- [ ] 支持调用外部接口查询未知电影或剧集
- [ ] 支持广告功能

## 部署

直接下载项目的`gh-pages`分支代码即可

## 开发

在项目根目录执行`npm install`安装依赖，然后`npm run start`即可运行程序

## 交流

[GitHub Discussions]( https://github.com/ourfor/iplay/discussions)
