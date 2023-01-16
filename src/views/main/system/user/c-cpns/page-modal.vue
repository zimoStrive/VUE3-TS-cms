<template>
  <div class="modal">
    <el-dialog v-model="centerDialogVisible" title="新建用户" width="30%" center>
      <span> 哈哈哈</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const centerDialogVisible = ref(false)

function setDialogVisible() {
  centerDialogVisible.value = true
}

defineExpose({ setDialogVisible })
</script>

<style scoped></style>
