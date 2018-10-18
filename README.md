## NetSS客户端

###环境
nodejs/npm

###开发技能
*   html/css(less)/js
*   [react](https://react.docschina.org/)/react-router/redux
*   [webpack](https://www.webpackjs.com/)
*   [antd](https://ant-design.gitee.io/docs/react/introduce-cn)


###运行
*   npm i(建议使用淘宝镜像cnpm)  安装依赖
*   启动
    *   npm run start-proxy 以代理方式启动，代理配置project.config.js/proxy
    *   npm run start-mock  以本地mock数据启动，mock配置scripts/mock

###发布
*   npm run build 打包发布
*   由于使用browserHistory，会导致url在不刷新页面情况下发生变化，此时服务端不作配置时刷新页面会404.因为服务端也需要做适应配置，将前端所有请求直接打到index.html