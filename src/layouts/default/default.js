// import { post } from '../../utilitys/ipAxios'
export default {
  mounted () {
    // setTimeout(() => {
    //   this.initPageData()
    // }, 1000)
    this.getUserLogin()
  },
  methods: {
    initPageData () {
      this.getUserLoginMock()
    },
    async getUserLogin () {
      // 检查用户登录状态
      /**
       * 本地是否有code 无 => 未登录
       * 本地超时时间是否已过？ 过 => 未登录
       */
      if (!localStorage.code) {
        this.autoNotLogin()
        return
      }
      if (localStorage.expires_in * 1000 - new Date() * 1000 < 0) {
        this.autoNotLogin()
        return
      }
      this.autoIsLogin()
    },
    autoIsLogin () {
      this.$router.push({
        path: '/dashboard/welcome'
      })
    },
    autoNotLogin () {
      // 未登录跳转
      // 创建页面并跳过去
      const uri = 'https://api.panda.ipietech.com/login/login.html'
      const redirectUri = encodeURIComponent(uri)
      const appId = 'cli_9dbc613a9d7f510c'
      const url = `https://open.feishu.cn/connect/qrconnect/page/sso/?redirect_uri=${redirectUri}&app_id=${appId}&state=panda_login_page_dev`
      window.location.href = url
    }
  }
}
