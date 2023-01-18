<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" @click="handleAddUser">新建部门</el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" style="width: 100%">
        <el-table-column align="center" type="selection" label="选择" />
        <el-table-column align="center" type="index" label="序号" width="70" />
        <el-table-column align="center" prop="name" label="部门名称" width="110" />
        <el-table-column align="center" prop="leader" label="领导名称" width="110" />
        <el-table-column align="center" prop="parentId" label="上级部门" width="120" />
        <el-table-column align="center" prop="createAt" label="创建时间">
          <template #default="{ row }">
            {{ utcFormat(row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateAt" label="更新时间">
          <template #default="{ row }">
            {{ utcFormat(row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="address" label="操作" width="180">
          <template #default="{ row }">
            <el-button type="primary" size="small" icon="EditPen" link @click="EditUserClick(row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              link
              @click="deleteDeleteClick(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 15, 20]"
        layout="sizes, prev, pager, next, jumper,total"
        :total="pageTotalCount"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts" name="content">
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { utcFormat } from '@/utils/format'
import { ref } from 'vue'

const emit = defineEmits(['newDataClick', 'editDataClick'])

//分页器请求数据
const currentPage = ref(1)
const pageSize = ref(5)
//发起action请求
const systemStore = useSystemStore()

//获取用户列表的回调
function getPageList(queryInfo: any = {}) {
  //获取size和offset
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  //带上参数发请求
  systemStore.getPageListDataAction('department', { size, offset, ...queryInfo })
}

getPageList()

//获取userList数据，进行展示
const { pageList, pageTotalCount } = storeToRefs(systemStore)
//绑定分页数据
function handleCurrentChange() {
  getPageList()
}
function handleSizeChange() {
  getPageList()
}
//重置按钮，重置参数
function handleResetClick() {
  currentPage.value = 1
  pageSize.value = 5
  getPageList()
}

//删除用户
function deleteDeleteClick(id: number) {
  systemStore.deletePageDataAction('department', id)
}

//新建用户
function handleAddUser() {
  emit('newDataClick')
}

//编辑用户信息
function EditUserClick(row: any) {
  emit('editDataClick', row)
}

//暴露查询函数
defineExpose({
  handleResetClick,
  getPageList
})
</script>

<style scoped lang="less">
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;

  .header {
    display: flex;
    height: 45px;
    padding: 0 5px;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 20px;
      font-weight: 700;
    }

    .handler {
      align-items: center;
    }
  }

  .table {
    :deep(.el-table__cell) {
      padding: 14px 0;
    }
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
}
</style>
