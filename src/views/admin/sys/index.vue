<template>
  <div class="sys-head">
    <div class="switch-code">
      <el-table
        :data="csData"
        tooltip-effect="dark"
        border
        stripe
        style="width: 100%">
        <el-table-column type="index" label="序号" align="center" width=""/>
        <el-table-column label="名称" align="center" >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.code"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="1"
              inactive-value="0"
              active-text="开启"
              inactive-text="关闭"
              @change="changeSwitch(scope.row)"/>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { sysState, startClass, closeClass, startCode, closeCode } from '@/api/admin'
export default {
  name: 'Switch',
  data() {
    return {
      code: true,
      student: true,
      csData: []
    }
  },
  created() {
    this.getState()
  },
  methods: {
    getState() {
      sysState().then(response => {
        this.csData = response.data
      })
    },
    changeSwitch(row) {
      if (row.code === '0') {
        if (row.name === '学生选课开关') {
          startClass().then(() => {
            this.$message({
              type: 'syccess',
              message: '学生选课系统开启'
            })
          })
        } else {
          startCode().then(() => {
            this.$message({
              type: 'syccess',
              message: '教师打分已开启'
            })
          })
        }
      } else {
        console.log(row)
        if (row.name === '学生选课开关') {
          console.log(row.name)
          closeClass().then(() => {
            this.$message({
              type: 'syccess',
              message: '学生选课系统关闭'
            })
          })
        } else {
          closeCode().then(() => {
            this.$message({
              type: 'syccess',
              message: '教师打分已关闭'
            })
          })
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
