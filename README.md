teaching_fe 项目规范
==============

## 项目优化方向(已完成)
![项目优化方向指示图](https://lcdns-static.learnta.com/%E6%A1%86%E6%9E%B6%E4%BC%98%E5%8C%96%E6%96%B9%E5%90%91.png)

## 准备工作

工具|内容|描述
-|-|-
编辑器|vscode|为保证最佳的编辑体验和团队协作便利性，统一使用vscode
包管理|npm6及以上|包管理工具统一使用npm，不要使用yarn
插件（vscode）|eslint|代码风格检查
插件（vscode）|prettier - code formatter|代码自动格式化
插件（vscode）|path intellisense|路径自动查找
*以上只是提供部分建议插件，其他插件可根据个人喜好安装  
*prettier安装完之后需要在设置中的Format On Save进行勾选（workspace）

## git操作规范

### 分支管理
一共有4类分支，分别在不同情况下使用  
1.**master** 主分支 一般开发新的功能或者修改bug都从这个分支切出来，最后从release分支合到这个分支  
2.**hotfix/*** bug修复分支 当需要修复一个bug时从master切出这个分支  
3.**feature/*** 功能开发分支 当需要开发或者迭代一个新功能时切出这个分支  
4.**experiment/*** 实验分支 当需要进行一个实验性功能时切出这个分支  
5.**qa/*** 待发布分支 当多个分支需要同时进入测试阶段时，将多个分支合并到一个qa分支，最后将这个分支提测  
6.**release/*** 发布分支 最后发布到正服的分支，与此同时，需要合并到master  

### 操作管理
1.**常规代码提交流程** git add -> git commit -> git pull -> git push  
2.**代码发布流程** git checkout -b w8release/* -> git rebase master -> git push  
3.**代码合并流程** git merge branch --squash  -> git branch -d branch  
注： commit必须严格书写功能点，如下
```$xslt
1.modified upload to HOC
2.use iconfont(svg) instead of png
```

## 项目启动
通过./bin脚本启动项目，主要参数有-p(product) -t(target), 主要action有dev, build, release, 具体可通过./bin --help进行查看  

### 示例
1.本地启动
```
./bin -p test dev
```
2.本地打包
```
./bin -p test build
```
3.发布正式版本
```
./bin -p test -t prod release
```
4.以ip启动
```
./bin -p test -h true release
```

## 项目结构说明
| - dist  打包完的文件夹  
| - src 资源文件夹  
|   | - components 业务无关组件  
|   | - core 核心方法  
|   | - libs 自己封装的通用库  
|   | - models 全局状态管理  
|   | - products 项目代码  
|   |   | - test 示例项目  
|   |   |   | - config 项目内配置  
|   |   |   | - layouts 项目内组件  
|   |   |   | - pages 项目内页面  
|   |   |   | - models 项目内状态管理  
|   |   |   | - index.ejs  项目的模板文件  
|   |   |   | - index.js  项目的入口文件  
| - settings 配置文件夹  
|   | - api.js 接口定义文件  
|   | - consts.js 敞亮定义文件  
|   | - mocker接口定义文件（开发完成后需要注释掉） 
| - static 静态资源文件夹  
| - widgets 业务相关组件  
| - .babelrc bebal配置文件  
| - .editorconfig 编辑器配置文件
| - .eslintignore eslint忽略文件  
| - .eslintrc.json eslint配置文件  
| - .gitignore git忽略文件  
| - bin 项目启动文件  
| - nodemon.json nodemon配置文件  
| - package.json 包管理文件  
| - README.md 说明文件  
| - webpack.config.js webpack配置文件  
| - webpack.dll.config.js webpack的dll配置文件(webpack打包排除的包)  
**注：业务无关公共组件都在src/components，业务相关公共组件都在src/widgets**

## 上传管理
用upload_qianjin包进行资源上传，目前支持七牛和阿里，配置文件为.uploadrc
### 阿里配置
```
{
  "uploader": "ali",
  "ak": "LTAInMm7B3MBd4QP",
  "sk": "wR2I6SZWpmqKE6besFyV7BZ4n7xQDa",
  "region": "oss-cn-hangzhou",
  "bucket": "learnta-frontend",
  "url": "http://learnta-frontend.oss-cn-hangzhou.aliyuncs.com",
  "dist": "dist",
  "prefix": "`staSrc/${process.env.PRODUCT}/${process.env.TARGET}/`",
  "ignore": [
    ".DS_Store",
    "report.html",
    "index.html"
  ]
}
```
### 七牛配置
```
{
  "uploader": "qiniu",
  "ak": "saYKbU6IfyNqcSfDLfWM1lGy4xG3JtjnHd8m91cE",
  "sk": "BKZHqPAmu69UAaJuffbj-8W-rT9JAPuJkKgtV-nw",
  "region": "Zone_z0",
  "bucket": "learnta-frontend",
  "url": "https://lcdns-static.learnta.com",
  "dist": "dist",
  "prefix": "`staSrc/${process.env.PRODUCT}/${process.env.TARGET}/`",
  "ignore": [
    ".DS_Store",
    "report.html",
    "index.html"
  ]
}

```

## 样式管理
项目内都尽量使用sass进行样式编辑，在webpack中已经开启css module方案，会自动生成\[name\]-\[local\]-\[hash:base64:6\]的className，而且在chrome的调试面板中会显示对应的scss文件。

## 状态管理
使用state+redux结合的方式，为了优化开发体验，本项目中使用[mirrorx方案](https://github.com/mirrorjs/mirror)

## 异步管理
使用async/await方案，如果需要捕获错误，请用try...catch...

## 图片管理
矢量图统一采用svg，位图统一采用png(或jpg，视是否透明而定)，目前采用iconfont来管理svg库，由UI切图上传以及管理，前端负责下载以及使用，操作步骤如下：  
1.拷贝项目下面生成的symbol代码，并加入ejs文件中  
```$xslt
//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js
```
2.加入通用css代码（引入一次就行）
```$xslt
.icon {
       width: 1em; height: 1em;
       vertical-align: -0.15em;
       fill: currentColor;
       overflow: hidden;
    }
```
3.挑选相应图标并获取类名，应用于页面：
```$xslt
<svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-xxx"></use>
</svg>
```

## 项目文档
项目中的非业务公共组件（src/components/**）都必须写注释，表明参数，作者等信息，最终由[jsDoc]: <http://www.css88.com/doc/jsdoc/>自动生成文档，文档生成命令为
```
npm run doc
```
最终文档生成在docs/。文档相关实例教程写在src/tutorials/
