<!--  -->
<template>
  <div>
    <div class="filter-box">
      <div class="filter-line">
        <div class="filter-label">姓名：</div>
        <el-select class="wid235 mul-select"
                   v-model="filterParams.nameList"
                   size="small"
                   collapse-tags
                   multiple
                   filterable
                   remote
                   :remote-method="(val)=>{remoteName(val,'name')}"
                   :reserve-keyword="false">
          <el-option v-for="(item,code) in filterOption.name"
                     :key="code"
                     :label="item"
                     :value="code">
          </el-option>
        </el-select>
      </div>
      <div class="filter-line">
        <div class="filter-label">状态：</div>
        <el-select class="wid235 mul-select"
                   v-model="filterParams.statusList"
                   size="small"
                   collapse-tags
                   multiple
                   filterable
                   :reserve-keyword="false">
          <el-option v-for="(item,code) in {online:'上线',offline:'下线'}"
                     :key="code"
                     :label="item"
                     :value="code">
          </el-option>
        </el-select>
      </div>
      <el-button type="primary"
                 class="search-btn"
                 @clicl="search">查询</el-button>
    </div>
    <div class="part-box">
      <div class="part-control-box">
        <div class="part-right">
          <el-button type="primary"
                     plain
                     @click="download">下载</el-button>
        </div>
      </div>
      <el-table :data="tableData"
                @sort-change="tableSort"
                class="table-template"
                @selection-change="handleSelectionChange"
                style="width: 100%">
        <el-table-column type="selection"
                         width="55">
        </el-table-column>
        <el-table-column prop="date"
                         label="日期"
                         sortable
                         :sort-orders="['ascending', 'descending']"
                         width="180">
        </el-table-column>
        <el-table-column prop="status"
                         label="状态"
                         :formatter="formatStatus"
                         sortable
                         :sort-orders="['ascending', 'descending']"
                         width="180">
        </el-table-column>
        <el-table-column prop="name"
                         label="姓名"
                         width="180">
          <template slot-scope="{row}">
            <el-popover trigger="hover"
                        placement="top">
              <p>姓名: {{ row.name }}</p>
              <p>住址: {{ row.address }}</p>
              <div slot="reference"
                   class="name-wrapper">
                <el-tag size="medium">{{ row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="address"
                         label="地址">
          <template slot-scope="{row}">
            <div v-if="editId!==row.id">
              <i class="icon ic-edit green"
                 @click="changeTag(row)"></i>

              {{row.address}}
            </div>
            <el-input size="mini"
                      :ref="`address${row.id}`"
                      v-show="editId===row.id"
                      v-model="editAddress"
                      @focus="inputFocus($event)"
                      @blur="cancelEditCell($event)"
                      @keyup.enter.native="updateAddressMethod(row,'address')"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page.sync="filterParams.pageNum"
                     :page-size="filterParams.pageSize"
                     :page-sizes="[10,20,50,100]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total"
                     class="paging-box">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import util from '@/utils/index'
export default {
  name: 'tabelPage',
  components: {},
  data () {
    return {
      // 编辑地址参数
      editId: 0,
      editAddress: '',
      editError: false,
      // 查询条件
      filterParams: {
        nameList: [],
        statusList: [],
        orderBy: 'Date',
        sequence: 'desc',
        pageNum: 1,
        pageSize: 10
      },
      // 远程查找下拉值
      filterOption: {
        name: []
      },
      // table数据
      total: 0,
      tableData: [],
      tableLoading: false
    }
  },
  props: {},
  computed: {},
  methods: {
    // table排序
    tableSort ({ column, prop, order }) {
      if (order === 'descending') {
        order = 'desc'
      } else {
        order = 'asc'
      }
      this.filterParams.pageNum = 1
      this.filterParams.orderBy = prop
      this.filterParams.sequence = order
      clog('table默认排序')
      this.getAllData()
    },
    // 编辑地址
    changeTag (row) {
      this.editId = row.id
      this.editAddress = row.address
      this.$refs['address' + row.id].$refs.input.focus()
    },
    inputFocus () {
      this.editError = false
    },
    cancelEditCell () {
      this.editId = ''
      this.editAddress = ''
      this.editError = false
    },
    // 确认更新地址
    updateAddressMethod (row, type) {
      let params = {
        id: row.id,
        address: this.editAddress
      }
      let path = `/${type}/update`
      this.tableLoading = true

      this.axios.post(path, params).then(res => {
        this.getAllData()
      }).finally(res => {
        this.editId = ''
        this.editAddress = ''
        this.tableLoading = false
      })
    },
    // 格式化table中status
    formatStatus (row) {
      let type = ''
      if (row.status === 'online') {
        type = '上线'
      } else if (row.status === 'offline') {
        type = '下线'
      }
      return type
    },
    // 远程搜索名字
    remoteName (key, type) {
      key = key.trim()
      if (key) {
        let typeFist = type.charAt(0).toUpperCase() + type.slice(1)
        this.$axios.post(`/sug${typeFist}`, { key: key }).then(res => {
          this.filterOption[type] = res.list
        })
      }
    },
    handleSelectionChange (e) {

    },
    handleSizeChange (e) {
      this.filterParams.pageNum = 1
      this.filterParams.pageSize = e
      this.getAllData()
    },
    handleCurrentChange (e) {
      this.filterParams.pageNum = e
      this.getAllData()
    },
    search () {
      this.filterParams.pageNum = 1
      this.getAllData()
    },
    download () {
      this.$axios.get('/download/table', {}).then(res => {
        const blob = new Blob([res])
        const fileName = `downloadName.xls`
        if ('download' in document.createElement('a')) { // 非IE下载
          const elink = document.createElement('a')
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href)
          document.body.removeChild(elink)
        } else { // IE10+下载
          navigator.msSaveBlob(blob, fileName)
        }
      })
    },
    getAllData () {
      let params = util.filterNullParams(this.filterParams)
      this.$axios.post('/getTableData', params).then(res => {
        this.tableData = res.list
        this.total = res.total
      })
    }
  },
  watch: {},
  created () {
    this.getAllData()
  },
  mounted () { },
  destroyed () { }
}

</script>
<style lang='scss' scoped>
</style>
