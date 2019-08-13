import GecMenu from '../../components/menu'
import BreadCrumb from '../../components/breadcrumb'
export default {
  components: { GecMenu, BreadCrumb },
  data () {
    return {
      basic: {
        realName: '加载中...',
        avatar: require('@/assets/user.jpg')
      }
    }
  },
  mounted () {
    // 获取用户名称
    const realName = localStorage.name || '加载中...'
    this.basic.realName = realName
    this.basic.avatar = localStorage.avatar_url || require('@/assets/user.jpg')
    console.log(localStorage.avatar_url)
  },
  methods: {
    routePath (path) {
      this.$router.push({
        path
      })
    }
  }
}
