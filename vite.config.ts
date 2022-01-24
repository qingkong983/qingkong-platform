import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// @ts-ignore
import proxy from './config/proxy'
// @ts-ignore
import externalGlobals from "rollup-plugin-external-globals";
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';

// 由于express代理配置与vite代理不一致，所以需要转换
// FAT PROD
const env = 'DEV'
let convertProxyConfig: any = {}
const proxyConfig = proxy[env]
console.log(proxyConfig,'proxyConfig')
for (const proxyConfigKey in proxyConfig) {
  const rewriteKey = Object.keys(proxyConfig[proxyConfigKey].pathRewrite)[0]
  const rewriteValue = String(
      Object.values(proxyConfig[proxyConfigKey].pathRewrite)[0]
  )
  convertProxyConfig[proxyConfigKey] = {}
  convertProxyConfig[proxyConfigKey].target = proxyConfig[proxyConfigKey].target
  convertProxyConfig[proxyConfigKey].changeOrigin =
      proxyConfig[proxyConfigKey].changeOrigin
  convertProxyConfig[proxyConfigKey].rewrite = (path: string) =>
      path.replace(rewriteKey, rewriteValue)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),visualizer(),viteCompression()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'root-entry-name': 'default'
        }
      },
    },
  },
  resolve: {
    alias: [
      { find: /^~/, replacement: '' },
    ],
  },
  server: {
    proxy: convertProxyConfig,
    host: '0.0.0.0',
    port: 8000,
  },
  build: {
    rollupOptions: {
      // external: ["antd"],
      plugins: [
        // commonjs(),
        externalGlobals({
          react: "React",
          "react-dom": "ReactDOM",
          "antd": "antd",
          "moment": "moment"
        }),
      ],
    },
  },
})
