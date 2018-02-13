完成效果如下：

![播放器](https://github.com/FanXuanyi/react-music-player/blob/master/preview/player.png)

![音乐列表](https://github.com/FanXuanyi/react-music-player/blob/master/preview/music-list.png)

**1、使用create-react-app脚手架搭建React开发环境。**

[create-react-app](https://github.com/facebook/create-react-app)是来自于Facebook官方的零配置命令行工具，能够帮你自动创建基于Webpack+ES6的最简易的React项目模板。

安装如下：

```
npm install -g create-react-app
```

使用create-react-app生成一个新的项目，这里我的项目名为react-music-player。

```
create-react-app react-music-player
```

进入创建的项目目录，执行`npm start`，打开`http://localhost:3000`可以看见运行效果。

```
cd react-music-player

npm start
```

**2、组件**

由于React组件化的思想，我们将页面中的各模块进行分割并形成组件。

在src目录下新建一个空的文件夹components，用来放一些基本组件，具体组件如下：

1）Header组件

这个组件比较简单，由一个logo图片和标题组成。

2）Progress组件

这是一个进度条组件，在音量控制和歌曲播放进度中都会用到。

3）MusicListItem组件

这一个组件显示的是歌曲列表中的一列。

**3、页面**

主要包含两个页面：一个是音乐播放器页面（Player），一个是音乐列表页面（MusicList）。

在src目录下新建一个空的文件夹page，用来放这两个页面。

1）Player页面

音乐播放器需要用到[jPlayer](http://www.jplayer.cn/)插件。

在App.js文件中添加一个`<div id="player"></div>`作为jPlayer的容器。
最开始以为是放在Player.js中，因为跳转到音乐列表页面时也需要播放音乐，所以将其放在App.js中。

2）MusicList页面

以列表的形式显示全部歌曲信息。

**4、路由**

React Router被拆分为三个包：react-router、react-router-dom和react-router-native。
react-router提供核心的路由组件与函数，其余两个则提供运行环境（即浏览器与react-native）所需的特定组件。

这里进行网站构建是运行在浏览器环境中，所以，我们应当安装react-router-dom。react-router-dom暴露出react-router中暴露的对象与方法，因此只需要安装并引用react-router-dom即可。

```
npm install react-router-dom --save
```

特别注意的是，执行上述命令装的是最新版本，当前是4.2，该版本与2.0版本相差很大。

**5、组件通信**