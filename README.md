# 主要技术栈
### react16 + webpack4 + react-router5 + typescript + antd-design4


##  如果 `import classes from './index.less'` ts检测报错

```

根目录创建 @types 文件夹

创建文件 less.d.ts 

declare module '*.less' {
  const classes: { [className: string]: string };
  export default classes;
}

```

### Description

相比较上个版本， 改用 typescript 和 webpack@4.0 进行项目重构， 目的是体验typescript得编写风和 webpack@4.0 得打包优化


### Yarn 国内快速镜像


### 查询当前镜像
```
yarn config get registry
```

### 设置为淘宝镜像
```
yarn config set registry https://registry.npm.taobao.org/
```

### 设置为官方镜像
```
yarn config set registry https://registry.yarnpkg.com   
```


