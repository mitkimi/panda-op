import { fetch, post } from '../../utilitys/ipAxios'
import NumberGrow from '../../components/numberGrow'
export default {
  components: {
    NumberGrow
  },
  data () {
    return {
      dialogVisible: false,
      filterShow: false,
      filter: {
        name: null
      },
      loading: true,
      pageData: {
        tableData: [],
        count: 0
      },
      form: {
        name: null,
        version: null,
        desc: null,
        mac: null,
        win: null
      }
    }
  },
  created () {
    setTimeout(() => {
      this.loading = false
    }, 1000)
  },
  mounted () {
    this.handleSearchSubmit()
  },
  methods: {
    handleClearFilter () {
      this.search = {
        name: null
      }
      this.handleSearchSubmit()
      this.filterShow = false
    },
    async handleSearchSubmit () {
      this.loading = true
      // 发送请求
      const params = this.filter
      const uri = '/version/query'
      const { data: res } = await fetch(uri, params)
      // console.log(res)
      // return
      if (res.code === 0) {
        this.pageData.tableData = res.data.mix
        this.pageData.count = res.data.count
        this.filterShow = true
        setTimeout(() => {
          this.loading = false
        }, 500)
      } else {
        this.$message.error(`${res.error.returnUserMessage}`)
      }
    },
    handleView (item) {
      console.log(item)
    },
    handleDelete (item) {
      console.log(item)
      this.$confirm('确认删除？')
        .then(async () => {
          const uri = '/version/destroy'
          const params = {
            id: item.id
          }
          const { data: res } = await post(uri, params)
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.handleSearchSubmit()
          } else {
            this.$message.error(res.msg)
          }
        })
    },
    async handleCreateSubmit () {
      if (!this.form.version) {
        this.$notify.error({
          title: '缺少必备字段',
          message: '请填写版本号'
        })
        return
      }
      if (!this.form.mac && !this.form.win) {
        this.$notify.error({
          title: '缺少必备字段',
          message: 'Mac 版本或 Win 版本至少发布一个'
        })
        return
      }
      const url = '/version/create'
      const params = this.form
      const { data: res } = await post (url, params)
      if (res.code === 0) {
        this.$message.success('创建成功！')
        this.handleSearchSubmit()
        this.dialogVisible = false
        this.form = {
          name: null,
          version: null,
          desc: null,
          mac: null,
          win: null
        }
      } else {
        this.$message.error(`创建失败：${res.message}`)
      }
    }
  }
}
