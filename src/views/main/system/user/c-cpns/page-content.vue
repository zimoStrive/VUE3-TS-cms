<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" @click="handleAddUser" v-if="isCreate">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="usersList" style="width: 100%">
        <el-table-column align="center" type="selection" label="选择" />
        <el-table-column align="center" type="index" label="序号" width="70" />
        <el-table-column align="center" prop="name" label="用户名" width="110" />
        <el-table-column align="center" prop="realname" label="真实姓名" width="110" />
        <el-table-column align="center" prop="cellphone" label="手机号码" width="120" />
        <el-table-column align="center" prop="enable" label="状态" width="100">
          <template #default="{ row }">
            <el-button :type="row.enable ? 'success' : 'danger'" size="small" plain>{{
              row.enable ? '启用' : '禁用'
            }}</el-button>
          </template>
        </el-table-column>
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
            <el-button
              type="primary"
              size="small"
              icon="EditPen"
              link
              @click="EditUserClick(row)"
              v-if="isUpdate"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              link
              @click="deleteUserClick(row.id)"
              v-if="isDelete"
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
        :total="usersTotalCount"
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
import usePermission from '@/hooks/usePermission'

const emit = defineEmits(['newDataClick', 'editDataClick'])

//用户权限判断
const isCreate = usePermission('users', 'create')
const isDelete = usePermission('users', 'delete')
const isQuery = usePermission('users', 'query')
const isUpdate = usePermission('users', 'update')

//分页器请求数据
const currentPage = ref(1)
const pageSize = ref(5)
//发起action, 请求userList
const systemStore = useSystemStore()

//获取用户列表的回调
function getUserList(queryInfo: any = {}) {
  //判读是否有查询权限
  if (!isQuery) return

  //获取size和offset
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  //带上参数发请求
  systemStore.getUserListDataAction({ size, offset, ...queryInfo })
}

getUserList()

//获取userList数据，进行展示
const { usersList, usersTotalCount } = storeToRefs(systemStore)

//绑定分页数据
function handleCurrentChange() {
  getUserList()
}
function handleSizeChange() {
  getUserList()
}
//重置按钮，重置参数
function handleResetClick() {
  currentPage.value = 1
  pageSize.value = 5
  getUserList()
}

//删除用户
function deleteUserClick(id: number) {
  systemStore.deleteUserDataAction(id)
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
  getUserList
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
