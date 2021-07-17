// 流程状态
const column_status = {
  title: '流程状态',
  dataIndex: 'status',
  valueType: 'select',
  valueEnum: {
    init: {
      text: '未提交',
      status: 'Error',
    },
    process: {
      text: '流程中',
      status: 'Processing',
    },
    completed: {
      text: '已完成',
      status: 'Success',
      disabled: true,
    },
    refused: {
      text: '已拒绝',
      status: 'Error',
      disabled: true,
    },
  }
}


export {
  column_status
}
