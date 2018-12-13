<template>
  <div class="teacher">
    <div class="class">
      <div class="list">
        <span>未选课程</span>
        <el-table :data="list" border fit highlight-current-row >

          <el-table-column align="center" label="课程ID" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.courseId }}</span>
            </template>
          </el-table-column>

          <el-table-column width="180px" align="center" label="课程名称">
            <template slot-scope="scope">
              <span>{{ scope.row.courseName }}</span>
            </template>
          </el-table-column>

          <el-table-column width="120px" align="center" label="授课地点">
            <template slot-scope="scope">
              <span>{{ scope.row.address }}</span>
            </template>
          </el-table-column>

          <el-table-column width="120px" align="center" label="授课教师">
            <template slot-scope="scope">
              <span>{{ scope.row.teacherName }}</span>
            </template>
          </el-table-column>

          <el-table-column width="120px" align="center" label="课时">
            <template slot-scope="scope">
              <span>{{ scope.row.courseTime }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="success" size="small" icon="el-icon-circle-check-outline" @click="selectClass(scope.row)">选课</el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>

      <div class="un-select">
        <span>已选课程</span>
        <el-table :data="unlist" border fit highlight-current-row >

          <el-table-column align="center" label="课程ID" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.courseId }}</span>
            </template>
          </el-table-column>

          <el-table-column width="180px" align="center" label="课程名称">
            <template slot-scope="scope">
              <span>{{ scope.row.courseName }}</span>
            </template>
          </el-table-column>

          <el-table-column width="120px" align="center" label="授课地点">
            <template slot-scope="scope">
              <span>{{ scope.row.address }}</span>
            </template>
          </el-table-column>

          <el-table-column width="120px" align="center" label="授课教师">
            <template slot-scope="scope">
              <span>{{ scope.row.teacherName }}</span>
            </template>
          </el-table-column>

          <el-table-column width="120px" align="center" label="课时">
            <template slot-scope="scope">
              <span>{{ scope.row.teacher }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="success" size="small" icon="el-icon-circle-check-outline" @click="unSelectClass(scope.row)">退课</el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchMessage, select, unselect } from '@/api/student'
export default {
  name: 'StudentClass',
  data() {
    return {
      typeClass: null,
      list: null,
      unlist: null,
      listLoading: true
    }
  },

  created() {
    this.getList()
  },
  methods: {
    getList() {
      fetchMessage().then(response => {
        console.log(response)
        this.list = response.data.selectClass
        this.unlist = response.data.unselectClass
      })
    },
    selectClass(row) {
      select(row.courseId).then(() => {
        this.getList()
        this.$message({
          type: 'success',
          message: '选课成功'
        })
      })
    },
    unSelectClass(row) {
      unselect(row.courseId).then(() => {
        this.getList()
        this.$message({
          type: 'success',
          message: '退课成功'
        })
      })
    },
    select() {
      fetchMessage(this.typeClass).then(response => {
        this.list = response.data.select
        this.unlist = response.data.unselect
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.class {
  display: flex;
  flex-direction: row;
  .list {
    float: left;
    padding-inline-start: 10px
  }
  .un-list {
    float: right;
    padding-left: 20px;
    margin-left: 20px
  }
}
</style>

