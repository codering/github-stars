# react-antd-roof-boilerplate

![](https://os.alipayobjects.com/rmsportal/NFchEbgbkKXvrtQ.gif)

## 包含

### 类库

- [Ant Design](http://ant.design/) - 基于 React 的 UI 框架
- [Roof](http://gitlab.alipay-inc.com/roof/roof) - 应用框架
- [Redux](https://github.com/rackt/redux)
- [React Router](https://github.com/rackt/react-router)
- [Redux Simple Router](https://github.com/rackt/redux-simple-router)
- [@alipay/ajax](http://gitlab.alipay-inc.com/chengyu/ajax) - 基于 [reqwest](https://github.com/ded/reqwest)，自动加 ctoken 及 _input_charset

### 工具

- [atool-build](https://github.com/ant-tool/atool-build) - 打包方案，基于 [webpack](https://github.com/webpack/webpack) 的简单封装
- [Dora](https://github.com/dora-js/dora) - 完全插件化的本地开发服务器
  - [dora-plugin-atool-build](https://github.com/dora-js/dora-plugin-atool-build)
  - [dora-plugin-proxy](https://github.com/dora-js/dora-plugin-proxy) - proxy 转发和数据 mock
  - [dora-plugin-hmr](https://github.com/dora-js/dora-plugin-hmr) - 热替换
  - [dora-plugin-livereload](https://github.com/dora-js/dora-plugin-livereload)
- [Babel](http://babeljs.io/) - 提供 ES6 和 ES7 语法支持
- [ESLint](http://eslint.org/)
- PostCSS
- AutoPrefixer

### 规范

- [flux-standard-action](https://github.com/acdlite/flux-standard-action)
- [eslint-config-airbnb](https://github.com/airbnb/javascript)

## 脚手架

clone 仓库并安装依赖。

```bash
$ git clone --single-branch -o react-antd-roof-boilerplate -b master \
      git@gitlab.alipay-inc.com:roof/react-antd-roof-boilerplate.git MyApp
$ cd MyApp
$ tnpm i
```

## 调试

在项目根目录执行。

```
$ npm run dev
```

在浏览器中打开 [http://127.0.0.1:8989](http://127.0.0.1:8989) 即可看到 Demo。

## 构建

```bash
$ npm run build
```

默认是*压缩*模式。如果不想压缩，只需在后面添加 `-- --no-compress` 标记。

