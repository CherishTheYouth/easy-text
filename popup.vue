<template>
  <div class="container">
    <el-tabs>
      <el-tab-pane label="Create Your Text Template">
        <el-form label-position="top" :model="state">
          <el-form-item label="Template Name">
            <el-input v-model="state.name"></el-input>
          </el-form-item>
          <el-form-item label="Template Content">
            <el-input type="textarea" rows="5" v-model="state.content"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="createTemplate">Create</el-button>
      </el-tab-pane>
      <el-tab-pane label="Manage Your Text Template">
        <el-table :data="templateList" border style="width: 100%">
          <el-table-column label="Template Name" prop="name" width="auto"></el-table-column>
          <el-table-column label="Template Content" width="auto" prop="content"></el-table-column>
          <el-table-column label="Operation" width="230px">
            <el-button type="primary" size="small">View</el-button>
            <el-button type="primary" size="small">Edit</el-button>
            <el-button type="warning" size="small">Delete</el-button>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue"
import type { App, Ref } from "vue"
import { ElButton, ElCard, ElRow, ElCol, ElTabPane, ElTabs, ElForm, ElFormItem, ElInput, ElTable, ElTableColumn, ElNotification } from 'element-plus'
import 'element-plus/dist/index.css'
import { cloneDeep } from 'lodash-unified'
import { Storage } from '@plasmohq/storage'
import type { Template } from './Types.ts'

defineOptions({
  prepare(app: App) {
    // Use any plugins here:
    // app.use
  }
})

const state: Template = reactive({
  name: '',
  content: ''
})

const templateList: Ref<Array<Template>> = ref([])
const storage = new Storage({
  area: "local"
})

const createTemplate = async () => {
  console.log('templateList', templateList)
  templateList.value.push({ ...cloneDeep(state) })
  await storage.set('easy-text', templateList.value)
  ElNotification.success('Success Create!')
  console.log('templateList', templateList.value)
}

onMounted(async () => {
  const storedTemplates = await storage.get('easy-text')
  if (storedTemplates) {
    templateList.value = storedTemplates as unknown as Array<Template>
  }
})
</script>
<style lang="scss" scoped>
.container {
  min-width: 500px;
  min-height: 400px;
  display: flex;
  // align-items: center;
  justify-content: center;
  gap: 47px;
}
.text-center {
  text-align: center;
}
.action {
  color: #470;
  font-weight: bold;
}
</style>