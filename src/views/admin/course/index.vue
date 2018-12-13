<template>
  <div class="course">
    <el-button type="success" @click="createCourse">新增课程</el-button>
    <el-table :data="course" border fit highlight-current-row style="width: 100%">

      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="课程编号">
        <template slot-scope="scope">
          <span>{{ scope.row.courseId }}</span>
        </template>
      </el-table-column>

      <el-table-column width="250px" align="center" label="课程名称">
        <template slot-scope="scope">
          <span>{{ scope.row.courseName }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px" align="center" label="授课教师">
        <template slot-scope="scope">
          <spam>{{ scope.row.courseTeacher }}</spam>
        </template>
      </el-table-column>

      <el-table-column width="200px" align="center" label="授课地点">
        <template slot-scope="scope">
          <spam>{{ scope.row.address }}</spam>
        </template>
      </el-table-column>

      <el-table-column width="200px" align="center" label="授课学院">
        <template slot-scope="scope">
          <spam>{{ scope.row.academic }}</spam>
        </template>
      </el-table-column>

      <el-table-column width="200px" align="center" label="课程图片">
        <template slot-scope="scope">
          <img :src="scope.row.pictureName" alt="" style="width: 50px;height: 50px">
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button v-if="scope.row.edit" type="danger" size="small" icon="el-icon-circle-check-outline" @click="confirmDele(scope.row)">删除</el-button>
          <el-button v-else type="primary" size="small" icon="el-icon-edit" @click="confirmEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>

    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="80px" style="width: 400px; margin-left:80px;">
        <el-form-item label="课程编号" prop="courseId">
          <el-input v-model="temp.courseId"/>
        </el-form-item>
        <el-form-item label="课程名称" prop="courseName">
          <el-input v-model="temp.courseName"/>
        </el-form-item>
        <el-form-item label="授课教师" prop="courseTeacher">
          <el-select v-model="temp.courseTeacher" placeholder="请选择">
            <el-option
              v-for="item in teacher"
              :key="item.id"
              :label="item.name"
              :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="授课地点">
          <el-input v-model="temp.address"/>
        </el-form-item>
        <el-form-item label="课时" prop="crouseTime">
          <el-input v-model="temp.crouseTime"/>
        </el-form-item>
        <el-form-item label="授课学院" prop="academic">
          <el-select v-model="temp.academic" placeholder="请选择">
            <el-option
              v-for="item in academic"
              :key="item.id"
              :label="item.name"
              :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="课程描述">
          <el-input v-model="temp.courseDsc"/>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            action="http://47.107.96.28/data/web/"
            list-type="picture-card">
            <i class="el-icon-plus"/>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { isvalidUsername, time } from '@/utils/validate'
import { getTeacher, getAllClass, addCourse } from '@/api/admin'
export default {
  name: 'Course',
  data() {
    const isvalid = (rule, value, callback) => {
      if (isvalidUsername(value)) {
        callback(new Error('请输入课程ID'))
      } else {
        callback()
      }
    }
    const isCount = (rule, value, callback) => {
      if (time(value)) {
        callback(new Error('请输入正确课时'))
      } else {
        callback()
      }
    }
    return {
      academic: [],
      teacher: [],
      dialogImageUrl: null,
      course: [],
      textMap: {
        update: '编辑',
        create: '新建'
      },
      dialogStatus: null,
      dialogFormVisible: false,
      temp: {
        courseId: null,
        courseName: null,
        courseTeacher: null,
        address: null,
        pictureName: null
      },
      rules: {
        courseId: [{ required: true, trigger: 'blur', validator: isvalid }],
        // ?? courseName:[{ required: true, message: '请输入课程名称'}],
        // courseTeacher: [{ required: true, trigger: 'blur', validator: isvalid }],
        crouseTime: [{ required: true, trigger: 'blur', validator: isCount }],
        courseTeacher: [{ required: true, message: '请选择授课教师', trigger: 'change' }],
        academic: [{ required: true, message: '请选者授课学院', trigger: 'change' }]
      }
    }
  },
  created() {
    this.fetch()
    this.fetchTeacher()
  },
  methods: {
    /**  * @Author:   * @Date: 2018-12-04 14:16:37  * @Desc:  获取教师信息 */
    fetchTeacher() {
      getTeacher().then(response => {
        this.teacher = response.data.teacher
        this.academic = response.data.academic
      })
    },
    /**  * @Author:  MD * @Date: 2018-11-30 23:19:33  * @Desc:新增按钮   */
    createCourse() {
      this.dialogFormVisible = true
      this.dialogStatus = 'create'
      this.restDataForm()
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    /**  * @Author: MD  * @Date: 2018-11-30 23:11:31  * @Desc: 新增课程  */
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          addCourse(this.temp).then(() => {
            this.fetch()
            this.$notify({
              title: '成功',
              type: 'success',
              message: '课程创建成功',
              duration: 2000
            })
          })
        }
      })
    },

    /**  * @Author:  MD * @Date: 2018-11-30 23:12:05  * @Desc:  编辑课程 */
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          editCourse(this.temp).then(() => {
            this.fetch()
            this.$notify({
              title: '成功',
              type: 'success',
              message: '课程跟新成功',
              duration: 2000
            })
          })
        }
      })
    },
    fetch() {
      getAllClass().then(response => {
        this.course = response.data
      })
    },
    /*
    edit
     */
    confirmEdit(row) {
      this.dialogFormVisible = true
      this.restDataForm()
      this.dialogStatus = 'update'
      this.temp = Object.assign({}, row)
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    confirmDele(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delectCourse(row.courseId).then(() => {
          this.fetch()
          this.dialogFormVisible = false
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    restDataForm() {
      this.temp = {
        courseId: null,
        courseName: null,
        courseTeacher: null,
        address: null,
        pictureName: null
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
