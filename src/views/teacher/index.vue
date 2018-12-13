<template>
  <div class="teacher">
    <div class="select">
      <span>评分比例</span>
      <el-select v-model="select" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
    </div>
    <div class="table">
      <el-table :data="list" border fit highlight-current-row style="width: 100%">

        <el-table-column align="center" label="ID" width="80">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>

        <el-table-column width="250px" align="center" label="学生学号">
          <template slot-scope="scope">
            <span>{{ scope.row.userId }}</span>
          </template>
        </el-table-column>

        <el-table-column width="250px" align="center" label="学生姓名">
          <template slot-scope="scope">
            <span>{{ scope.row.userName }}</span>
          </template>
        </el-table-column>

        <el-table-column width="250px" align="center" label="课程编号">
          <template slot-scope="scope">
            <span>{{ scope.row.courseId }}</span>
          </template>
        </el-table-column>

        <el-table-column width="300px" align="center" label="学生平时成绩">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input v-model="scope.row.normalCode" class="edit-input" size="small"/>
              <el-button class="cancel-btn" size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">取消</el-button>
            </template>
            <span v-else>{{ scope.row.normalCode }}</span>
          </template>
        </el-table-column>

        <el-table-column width="300px" align="center" label="学生期末成绩">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input v-model="scope.row.lastCode" class="edit-input" size="small"/>
              <el-button class="cancel-btn" size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">取消</el-button>
            </template>
            <span v-else>{{ scope.row.lastCode }}</span>
          </template>
        </el-table-column>

        <el-table-column width="200px" align="center" label="学生总成绩">
          <template slot-scope="scope">
            <template v-show="this.select === 0">
              <span>{{ scope.row.normalCode*0.1+ scope.row.lastCode*0.9 }}</span>
            </template>
            <template v-show="this.select === 1">
              <span>{{ scope.row.normalCode*0.5+ scope.row.lastCode*0.5 }}</span>
            </template>
            <template v-show="this.select === 2">
              <span>{{ scope.row.normalCode*0.4+ scope.row.lastCode*0.6 }}</span>
            </template>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="360">
          <template slot-scope="scope">
            <el-button v-if="scope.row.edit" type="success" size="small" icon="el-icon-circle-check-outline" @click="confirmEdit(scope.row)">确定</el-button>
            <el-button v-else type="primary" size="small" icon="el-icon-edit" @click="scope.row.edit=!scope.row.edit">编辑</el-button>
            <el-button type="success" size="small" icon="el-icon-circle-check-outline" @click="confirm(scope.row)">保存</el-button>
            <el-button type="primary" size="small" icon="el-icon-edit" @click="commitCode(scope.row)">提交</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>

<script>
import { fetchList, save, commit } from '@/api/teacher'
export default {
  name: 'TeacherCode',
  data() {
    return {
      select: 0,
      options: [
        {
          value: 0,
          label: '1:9'
        },
        {
          value: 1,
          label: '5:5'
        },
        {
          value: 2,
          label: '4:6'
        }
      ],
      list: [],
      listLoading: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    confirm(row) {
      row.edit = false
      save(row).then(() => {
        this.$message({
          type: 'success',
          message: '成绩以提交'
        })
      })
    },
    commitCode(row) {
      row.edit = false
      commit(row.myCode, row.studentId, row.courseId).then(() => {
        this.$message({
          type: 'success',
          message: '成绩以提交'
        })
      })
    },
    getList() {
      this.listLoading = true
      fetchList().then(response => {
        const items = response.data
        this.list = items.map(v => {
          this.$set(v, 'edit', false)
          v.saveNormalCode = v.normalCode
          v.saveLastCode = v.lastCode
          return v
        })
        this.listLoading = false
      })
    },
    cancelEdit(row) {
      console.log(this.select)
      row.normalCode = row.saveNormalCode
      row.lastCode = row.saveLastCode
      row.edit = false
      this.$message({
        message: '未更新',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      console.log(this.select)
      row.saveNormalCode = row.normalCode
      row.saveLastCode = row.lastCode
      row.edit = false
    }
  }
}
</script>
<style lang="scss" scoped>
.teacher {
  display: flex;
  flex-direction: column;
  width: 100%
}
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
