<template>
  <div class="content">
    <div class="header">
      <h3 class="title">{{ contentConfig?.header?.title ?? '数据列表' }}</h3>
      <el-button type="primary" @click="handleAddUser">{{
        contentConfig?.header?.btnTitle ?? '添加数据'
      }}</el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" style="width: 100%" v-bind="contentConfig.childrenTree">
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column v-bind="item">
              <template #default="{ row }">
                {{ utcFormat(row.prop) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" v-bind="item">
              <template #default="{ row }">
                <el-button
                  type="primary"
                  size="small"
                  icon="EditPen"
                  link
                  @click="EditUserClick(row)"
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
          </template>
          <template v-else-if="item.type === 'custom'">
            <el-table-column v-bind="item" align="center">
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope" :prop="item.prop"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item" />
          </template>
        </template>
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

interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    propsList: any[]
    childrenTree?: any
  }
}

const emit = defineEmits(['newDataClick', 'editDataClick'])
const props = defineProps<IProps>()

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
  systemStore.getPageListDataAction(props.contentConfig.pageName, { size, offset, ...queryInfo })
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
  systemStore.deletePageDataAction(props.contentConfig.pageName, id)
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
