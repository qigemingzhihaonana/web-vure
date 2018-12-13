<template>
  <div class="index">
    <div class="head-img" >
      <img src="@/assets/headimg/new_logo2.png">
    </div>
    <div class="menu">
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        background-color="#ffff"
        text-color="black"
        active-text-color="#ffd04b">
        <el-menu-item index="1">首页</el-menu-item>
        <el-submenu index="2">
          <template slot="title">学校概况</template>
          <el-menu-item index="2-1">湖大简介</el-menu-item>
          <el-menu-item index="2-2">现任领导</el-menu-item>
          <el-menu-item index="2-3">历任领导</el-menu-item>
          <el-menu-item index="2-4">湖大章程</el-menu-item>
          <el-menu-item index="2-5">校史略记</el-menu-item>
          <el-menu-item index="2-6">湖大风光</el-menu-item>
          <el-menu-item index="2-7">校纪校训</el-menu-item>
          <el-menu-item index="2-8">湖大之歌</el-menu-item>
          <el-menu-item index="2-9">湖大视觉形象</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">组织机构</template>
          <el-menu-item index="3-1">学院设置</el-menu-item>
          <el-menu-item index="3-2">办事机构</el-menu-item>
          <el-menu-item index="3-3">附属学校</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">学科科研</template>
          <el-menu-item index="4-1">重点学科</el-menu-item>
          <el-menu-item index="4-2">本科专业</el-menu-item>
          <el-menu-item index="4-3">博硕士点</el-menu-item>
        </el-submenu>
        <el-submenu index="9">
          <template slot="title">人才培养</template>
          <el-menu-item index="9-1">重点学科</el-menu-item>
          <el-menu-item index="9-2">本科专业</el-menu-item>
          <el-menu-item index="9-3">博硕士点</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">招生就业</template>
          <el-menu-item index="5-1">重点学科</el-menu-item>
          <el-menu-item index="5-2">本科专业</el-menu-item>
          <el-menu-item index="5-3">博硕士点</el-menu-item>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">校园文化</template>
          <el-menu-item index="6-1">校工之家</el-menu-item>
          <el-menu-item index="6-2">青春飞扬</el-menu-item>
          <el-menu-item index="6-3">学工在线</el-menu-item>
        </el-submenu>
        <el-submenu index="7">
          <template slot="title">公共服务</template>
          <el-menu-item index="7-1">湖大校历</el-menu-item>
          <el-menu-item index="7-2">办公电话</el-menu-item>
          <el-menu-item index="7-3">后勤服务</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="picture">
      <el-carousel :interval="4000" type="card" height="350px" width="600px" indicator-position="outside">
        <el-carousel-item v-for="item in picture" :key="item">
          <div class="grid-content">
            <el-col :md="12" :offset="6">
              <div>
                <img :src="item.src">
              </div>
            </el-col>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="new">
      <el-card class="box-card-left">
        <div slot="header" class="clearfix">
          <span>新闻1</span>
        </div>
        <div v-for="(item , index) in message" :key="index" class="text item">
          <p>{{ item.message }}</p><br>>
        </div>
      </el-card>
      <el-card class="box-card-right">
        <div slot="header" class="clearfix">
          <span>新闻2</span>
        </div>
        <div v-for="(item , index) in message2" :key="index" class="text item">
          <p>{{ item.message }}</p><br>
        </div>
      </el-card>
    </div>
    <div class="card">
      <el-row>
        <el-col v-for="(item, index) in bookPicture" :span="8" :key="index" >
          <el-card :body-style="{ padding: '0px' }">
            <img src="item.src" class="image" @click="click">
            <div style="padding: 14px;">
              <span>{{ item.classMessage }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bookPicture: [],
      classMessage: undefined,
      message: undefined,
      message2: undefined,
      picture: [
        {
          src: require('@/assets/headimg/1.jpg')
        },
        {
          src: require('@/assets/headimg/0011.jpg')
        },
        {
          src: require('@/assets/headimg/qianjinga.jpg')
        },
        {
          src: require('@/assets/headimg/qm.jpg')
        },
        {
          src: require('@/assets/headimg/xianfa3.jpg')
        }
      ]
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    fetch() {
      getNews().then(response => {
        this.message = response.data.data.message
        this.message2 = response.data.data.message2
        this.bookPicture = response.data.data.picture
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .new {
    display: flex;
    float: right;
  }
  .head-img {
    background-color:rgb(9, 9, 173)
  }
  .new {
    display:flex;
    flex-direction: row;
     padding-right: 100px;
    // float: left;
    .box-card-left {
      width: 200px;
      height: 300px;
    }
    .box-card-right {
      width: 200px;
      height: 300px;
    }
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 350px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
</style>
