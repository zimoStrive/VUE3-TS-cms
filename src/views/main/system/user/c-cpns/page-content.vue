<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="usersList" style="width: 100%">
        <el-table-column align="center" type="selection" />
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
          <el-button type="primary" size="small" icon="EditPen" link>编辑</el-button>
          <el-button type="danger" size="small" icon="Delete" link>删除</el-button>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script setup lang="ts" name="content">
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { utcFormat } from '@/utils/format'

//发起action, 请求userList
const systemStore = useSystemStore()
systemStore.getUserListDataAction({ offset: 2, size: 10 })

//获取userList数据，进行展示
const { usersList } = storeToRefs(systemStore)
console.log(usersList)
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

  .footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
  }
}
</style>
