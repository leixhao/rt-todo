const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    proxy('/api1', {
      // 遇见带有/api1 前缀的请求，就会触发该代理配置并转发给5005
      target: 'http://localhost:5005', // 需要把请求转发给谁
      changeOrigin: true, // 控制服务器收到的响应头中Host字段的值，为true时服务收到地址http://localhost:5005，false是服务收到http://localhost:3000/
      pathRewrite: {
        '^/api1': '' // 匹配请求路径的/api，并替换''
      }
    }),
    proxy('/api2', {
      // 遇见带有/api 前缀的请求，就会触发该代理配置并转发给5006
      target: 'http://localhost:5006', // 需要把请求转发给谁
      changeOrigin: true,  //控制服务器收到的响应头中Host字段的值，为true时服务收到地址http://localhost:5005，false是服务收到http://localhost:3000
      pathRewrite: {
        '^/api2': '' // 匹配请求路径的/api，并替换''
      }
    })
  )
}
