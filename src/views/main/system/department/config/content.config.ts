const contentConfig = {
  pageName: 'department',
  header: {
    title: '部门列表',
    btnTitle: '新建部门'
  },
  propsList: [
    { type: 'selection', label: '选择' },
    { type: 'index', label: '序号', width: '70' },

    { type: 'normal', label: '部门名称', prop: 'name', width: '110' },
    { type: 'normal', label: '领导名称', prop: 'leader', width: '110' },
    { type: 'normal', label: '上级部门', prop: 'parentId', width: '120' },

    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },

    { type: 'handler', label: '操作', width: '180' },
    { type: 'custom', prop: 'leader', label: '部门领导', width: '110', slotName: 'leader' }
  ]
}

export default contentConfig
