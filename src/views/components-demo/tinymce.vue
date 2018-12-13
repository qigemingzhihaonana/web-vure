<template>
  <div class="components-container">
    <code>
      <div class="title">
        <el-input ref="title" v-model="title" :rules="titleRule" placeholder="请输入新闻标题" prop="title"/>
      </div>
    </code>
    <div>
      <tinymce :height="300" v-model="content"/>
    </div>
    <code>
      <div class="sublime">
        <el-button type="primary" @click="sublime">提交</el-button>
      </div>
    </code>
    <div class="editor-content" v-html="content"/>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { sublimeNews } from '@/api/news'
export default {
  name: 'TinymceDemo',
  components: { Tinymce },
  data() {
    return {
      title: ``,
      content: ``,
      titleRule: {
        title: [
          { required: true, message: '请填写新闻标题', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    sublime() {
      sublimeNews(this.title, this.content).then(() => {
        this.$message({
          type: 'success',
          message: '新闻发布成功'
        })
      })
    }
  }
}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>

