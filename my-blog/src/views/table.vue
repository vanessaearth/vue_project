<!--  -->
<template>
  <div>
    <div class="filter-box">
      <div class="filter-line">
        <div class="filter-label">姓名：</div>
        <ElSelect class="wid235 mul-select"
                   v-model="filterParams.nameList"
                   size="small"
                   collapse-tags
                   multiple
                   filterable
                   remote
                   :remote-method="(val)=>{remoteName(val,'name')}"
                   :reserve-keyword="false">
          <ElOption v-for="(item,code) in filterOption.name"
                     :key="code"
                     :label="item"
                     :value="code">
          </ElOption>
        </ElSelect>
      </div>
      <div class="filter-line">
        <div class="filter-label">状态：</div>
        <ElSelect class="wid235 mul-select"
                   v-model="filterParams.statusList"
                   size="small"
                   collapse-tags
                   multiple
                   filterable
                   :reserve-keyword="false">
          <ElOption v-for="(item,code) in {online:'上线',offline:'下线'}"
                     :key="code"
                     :label="item"
                     :value="code">
          </ElOption>
        </ElSelect>
      </div>
      <ElButton type="primary"
                 class="search-btn"
                 @clicl="search">查询</ElButton>
    </div>
    <div class="part-box">
      <div class="part-control-box">
        <div class="part-right">
          <ElButton type="primary"
                     plain
                     @click="download">下载</ElButton>
        </div>
      </div>
      <MyTable :columns="columns"
                :tableData="tableData"
                @reloadData="getAllData"
                @tableSort="tableSort"
                :ipagiation="ipagiation">
        <template v-slot:name="{row}">
          <ElPopover trigger="hover"
                      placement="top">
            <p>姓名: {{ row.name }}</p>
            <p>住址: {{ row.address }}</p>
            <div slot="reference"
                 class="name-wrapper">
              <ElTag size="medium">{{ row.name }}</ElTag>
            </div>
          </ElPopover>
        </template>
        <template v-slot:address="{row}">
          {{row.address}}
        </template>
      </MyTable>
    </div>

  </div>
</template>

<script>
import MyTable from '@/components/table/myTable.vue'
import { downloadBlobFile } from '@/utils/modules/downloadFile.js'
import { filterNullParams } from '@/utils/modules/filterNullParams.js'
export default {
  name: 'tabelPage',
  components: { MyTable },
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
        sequence: 'desc'
      },
      // 远程查找下拉值
      filterOption: {
        name: []
      },
      // table数据
      total: 0,
      tableData: [],
      tableLoading: false,
      ipagiation: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      columns: [
        {
          prop: 'date',
          label: '日期',
          sortable: true,
          width: 180,
          slotScope: true
        },
        {
          prop: 'status',
          label: '状态',
          sortable: true,
          width: 100,
          formatter: (row) => {
            let type = ''
            if (row.status === 'online') {
              type = '上线'
            } else if (row.status === 'offline') {
              type = '下线'
            }
            return type
          }
        }, {
          prop: 'name',
          label: '姓名',
          sortable: true,
          width: 100,
          slot: 'name'
        },
        {
          prop: 'address',
          label: 'address',
          sortable: true,
          width: 300,
          slot: 'address'
        }
      ]
    }
  },
  props: {},
  computed: {},
  methods: {
    tableSort (params) {
      this.filterParams.orderBy = params.orderBy
      this.filterParams.sequence = params.sequence
      this.getAllData()
    },
    getAllData (isFirstPage) {
      if (isFirstPage) {
        this.ipagiation.pageNum = 1
      }
      const params = filterNullParams({ ...this.filterParams, ...this.ipagiation })
      this.$axios.post('/getTableData', params).then(res => {
        this.tableData = res.list
        this.ipagiation.total = res.total
      })
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
      const params = {
        id: row.id,
        address: this.editAddress
      }
      const path = `/${type}/update`
      this.tableLoading = true
      this.axios.post(path, params).then(res => {
        this.getAllData()
      }).finally(res => {
        this.editId = ''
        this.editAddress = ''
        this.tableLoading = false
      })
    },
    // 远程搜索名字
    remoteName (key, type) {
      key = key.trim()
      if (key) {
        const typeFist = type.charAt(0).toUpperCase() + type.slice(1)
        this.$axios.post(`/sug${typeFist}`, { key: key }).then(res => {
          this.filterOption[type] = res.list
        })
      }
    },
    handleSelectionChange (e) {

    },
    search () {
      this.getAllData(true)
    },
    download () {
      this.$axios.get('/download/table', {}).then(res => {
        downloadBlobFile(res)
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
