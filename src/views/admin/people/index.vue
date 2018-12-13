<template>
  <div class="people-head">
    <div class="selectUser">
      <el-select v-model="role" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <div class="button">
        <el-button type="success" @click="reataddUser()">添加人员</el-button>
      </div>
    </div>
    <div class="teacher">
      <el-table v-show="this.role === 2" :data="listTeacher" border fit highlight-current-row style="width: 100%">

        <el-table-column align="center" label="ID" width="80">
          <template slot-scope="scope">
            <span>{{ scope.$index+1 }}</span>
          </template>
        </el-table-column>

        <el-table-column width="180px" align="center" label="教师姓名">
          <template slot-scope="scope">
            <span>{{ scope.row.userName }}</span>
          </template>
        </el-table-column>

        <el-table-column width="250px" align="center" label="教师工号">
          <template slot-scope="scope">
            <span>{{ scope.row.userId }}</span>
          </template>
        </el-table-column>

        <el-table-column width="200px" align="center" label="教师所属院系">
          <template slot-scope="scope">
            <spam>{{ scope.row.userClass }}</spam>
          </template>
        </el-table-column>

        <el-table-column width="200px" align="center" label="性别">
          <template slot-scope="scope">
            <spam v-if="scope.row.sex === 0">男</spam>
            <spam v-if="scope.row.sex === 1">女</spam>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="danger" size="small" icon="el-icon-circle-check-outline" @click="confirm(scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>

    <div class="student">
      <el-table v-show="this.role === 3" :data="listStundent" border fit highlight-current-row style="width: 100%">

        <el-table-column align="center" label="ID" width="80">
          <template slot-scope="scope">
            <span>{{ scope.$index+1 }}</span>
          </template>
        </el-table-column>

        <el-table-column width="180px" align="center" label="学生姓名">
          <template slot-scope="scope">
            <span>{{ scope.row.userName }}</span>
          </template>
        </el-table-column>

        <el-table-column width="250px" align="center" label="学生学号">
          <template slot-scope="scope">
            <span>{{ scope.row.userId }}</span>
          </template>
        </el-table-column>

        <el-table-column width="200px" align="center" label="学生所属院系">
          <template slot-scope="scope">
            <spam>{{ scope.row.userClass }}</spam>
          </template>
        </el-table-column>

        <el-table-column width="200px" align="center" label="性别">
          <template slot-scope="scope">
            <spam v-if="scope.row.sex === 0">男</spam>
            <spam v-if="scope.row.sex === 1">女</spam>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="danger" size="small" icon="el-icon-circle-check-outline" @click="confirm(scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>

    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="80px" style="width: 400px; margin-left:80px;">
        <el-form-item label="身份" prop="roleId">
          <el-select v-model="temp.roleId" class="filter-item" placeholder="请选择">
            <el-option v-for="item in roleType" :key="item.key" :label="item.display_name" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item label="账户" prop="userID">
          <el-input v-model="temp.userID"/>
        </el-form-item>
        <el-form-item label="用户姓名" prop="userName">
          <el-input v-model="temp.userName"/>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="temp.sex" class="filter-item" placeholder="请选择">
            <el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="学院" prop="userClass">
          <el-select v-model="temp.userClass" class="filter-item" placeholder="请选择">
            <el-option v-for="item in userClassOptions" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="createUser()">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { fetchUser, getTeacher, delectUser, addUser, updateUser } from '@/api/admin'
import { isvalidUsername } from '@/utils/validate'
export default {
  name: 'User',
  data() {
    const isvalid = (rule, value, callback) => {
      if (isvalidUsername(value)) {
        callback(new Error('请输入正确的帐号'))
      } else {
        callback()
      }
    }
    return {
      temp: {
        roleId: 2,
        sex: 0,
        password: `123456`,
        userName: null,
        userClass: null,
        userID: null
      },
      listTeacher: [],
      listStundent: [],
      role: 2,
      options: [
        {
          label: '教师',
          value: 2
        },
        {
          label: '学生',
          value: 3
        }
      ],
      textMap: {
        creat: '新增',
        update: '编辑'
      },
      dialogStatus: null,
      dialogFormVisible: false,
      roleType: [
        {
          key: 2,
          display_name: '教师'
        },
        {
          key: 3,
          display_name: '学生'
        }
      ],
      sexOptions: [
        {
          label: '男',
          value: 0
        },
        {
          label: '女',
          value: 1
        }
      ],
      userClassOptions: [],
      rules: {
        roleId: [{ required: true, message: '请选择身份', trigger: 'change' }],
        userID: [{ required: true, message: '请输入用户ID', trigger: 'blur' }],
        // ?? userName:[{ required: true, message: '请输入用户姓名'}],
        userName: [{ required: true, trigger: 'blur', validator: isvalid }],
        userClass: [{ required: true, message: '请选择学生所在的院系', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    restForm() {
      this.temp = {
        roleId: 2,
        sex: 0,
        password: `123456`,
        userName: null,
        userClass: null,
        userID: null
      }
    },
    reataddUser() {
      getTeacher().then(response => {
        this.userClassOptions = response.data.academic
      })
      this.dialogFormVisible = true
      this.restForm()
      this.dialogStatus = 'create'
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    getUser() {
      fetchUser().then(response => {
        this.listStundent = response.data.student
        this.listTeacher = response.data.teacher
      })
    },
    /**  * @Author:  MD * @Date: 2018-12-03 21:00:56  * @Desc: 删除教师  */
    confirm(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const roleId = this.role
        delectUser(row.userId, roleId).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.fetchUser()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    /**  * @Author:   MD* @Date: 2018-12-03 21:02:42  * @Desc:  编辑人员 */
    editUser(row) {
      this.dialogFormVisible = true
      this.dialogStatus = 'update'
      this.temp = Object.assign({}, row)
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    /**  * @Author: MD  * @Date: 2018-12-03 21:39:00  * @Desc: 确认新增用户  */
    createUser() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          addUser(this.temp).then(() => {
            this.dialogFormVisible = false
            this.$message({
              type: 'success',
              message: '用户创建成功'
            })
            this.getUser()
          })
        }
      })
    },
    /**  * @Author:  MD * @Date: 2018-12-03 21:44:00  * @Desc:  更新用户信息 */
    updateUser() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updateUser(this.temp).then(() => {
            this.$message({
              type: 'success',
              message: '用户跟新成功'
            })
            this.getUser()
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
