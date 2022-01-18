const express = require('express')
const app = express()
const { createProxyMiddleware } = require('http-proxy-middleware')
const proxy = require('./config/proxy')

const { config = {} } = require('./package.json')
const { port = 8080, env = 'FAT' } = config

console.log(port, env)

// 托管静态文件
app.use(express.static('dist'))

// 读取机器环境配置代理
// 发布到captain上，机器内脚本会给package.json加上 port 和 env，环境枚举为 FAT LPT FWS UAT PROD
for (const proxyKey in proxy[env]) {
    app.use(
        proxyKey,
        createProxyMiddleware({
            target: proxy[env][proxyKey].target,
            changeOrigin: proxy[env][proxyKey].changeOrigin,
            pathRewrite: proxy[env][proxyKey].pathRewrite,
        })
    )
}

// 健康检查
app.get('/vi/health', (req, res) => {
    res.end(`365ms`)
})

// 监听8080端口
app.listen(8080, function () {
    console.log('hi')
})
