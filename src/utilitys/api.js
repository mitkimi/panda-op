/**
 * api 接口设置
 * 以下设置中，dev 为测试服务器地址，pro 为生产环境服务器地址，系统会根据选择开发环境或生产环境自动返回其相关的服务端地址
 */
const url = {
  dev: 'http://localhost:9023',
  pro: 'http://47.96.8.230:9023'
}
//
export default {
  url: process.env.NODE_ENV === 'development' ? url.dev : url.pro
}
