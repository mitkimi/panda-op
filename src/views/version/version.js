import { fetch, post } from '../../utilitys/ipAxios'
import NumberGrow from '../../components/numberGrow'
export default {
  components: {
    NumberGrow
  },
  data () {
    return {
      dialogVisible: true,
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
    }
  }
}
