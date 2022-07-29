<!--
/**
 * @name 'myTable'
 * @desc ''
 * @author ''
 * @time 2020年07月22日 17:16:14 Wednesday
 */
-->
<template>
  <div>
    <ElTable :data="tableData"
              @sort-change="tableSort"
              class="table-template"
              style="width: 100%">
      <!-- @selection-change="handleSelectionChange" -->

      <!-- <el-table-column type="selection"
                       width="55">
      </el-table-column> -->

      <ElTableColumn v-for="(item,index) in columns"
                       :key="index"
                       :prop="item.prop"
                       :label="item.label"
                       :sortable="item.sortable"
                       :formatter="item.formatter"
                       :sort-orders="['ascending', 'descending']"
                       :width="item.width">
        <template slot-scope="{row}">
          <slot v-if="item.slot"
                :name="item.slot"
                :row="row"></slot>
          <slot v-else>{{row[`${item.prop}`]}}</slot>
        </template>
      </ElTableColumn>
    </ElTable>
    <ElPagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="ipagiation.pageNum"
                   :page-size="ipagiation.pageSize"
                   :page-sizes="[10,20,50,100]"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="ipagiation.total"
                   class="paging-box">
    </ElPagination>
  </div>
</template>

<script>

export default {
  name: 'myTable',
  components: {},
  props: {
    columns: {
      type: Array
    },
    tableData: {
      type: Array
    }
  },
  data () {
    return {
      ipagiation: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  computed: {},
  methods: {
    handleSizeChange (e) {
      this.ipagiation.pageNum = 1
      this.ipagiation.pageSize = e
      this.$emit('reloadData')
    },
    handleCurrentChange (e) {
      this.ipagiation.pageNum = e
      this.$emit('reloadData')
    },

    // table排序
    tableSort ({ column, prop, order }) {
      if (order === 'descending') {
        order = 'desc'
      } else {
        order = 'asc'
      }
      const params = {
        orderBy: prop,
        sequence: order
      }
      this.ipagiation.pageNum = 1
      this.$emit('tableSort', params)
    }
  },
  watch: {},
  created () {
  },
  mounted () { },
  destroyed () { }
}

</script>
<style lang='scss' scoped>
</style>
