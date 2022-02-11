const IS_PROD = ['production'].includes(process.env.NODE_ENV)
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

// gzip --start
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzip = true // 是否使用gzip
const productionGzipExtensions = ['js', 'css'] // 需要gzip压缩的文件后缀
// gzip --end

module.exports = {
  devServer: {
    host: '127.0.0.1', // 允许外部访问本地开发服务器，以方便联调
    hot: true,
    open: true, // 开发服务器启动时，打开浏览器
    proxy: {
      '/': {
        target: 'http://120.92.16.17/xiantao-di-api', // 'http://120.92.16.17/chibi-di-api',
        changeOrigin: true
      }
    }
  },
  publicPath: '/xiantao-di-web', // 默认'/'，部署应用包时的基本 URL
  outputDir: 'dist',
  assetsDir: '', // 相对于outputDir的静态资源(js、css、img、fonts)目录
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: false, // 生产环境的 source map
  lintOnSave: !IS_PROD,
  configureWebpack: () => {
    const myConfig = {}
    if (IS_PROD) {
      // // 1. 生产环境npm包转CDN
      // myConfig.externals = externals

      myConfig.plugins = [
        // Components({
        //   resolvers: [ElementPlusResolver()]
        // })
      ]
      // gzip
      // 2. 构建时开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
      productionGzip &&
        myConfig.plugins.push(
          new CompressionWebpackPlugin({
            test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
            threshold: 8192,
            minRatio: 0.8
          })
        )

      myConfig['performance'] = {
        //打包文件大小配置
        maxEntrypointSize: 10000000,
        maxAssetSize: 30000000
      }
    }
    return myConfig
  },

  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '沔古脑.经济大脑'
      return args
    })
    return config
  }
}
