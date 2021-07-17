import {PlusOutlined} from '@ant-design/icons';
import {Button, message} from 'antd';
import React, {useRef, useState} from 'react';
import {FormattedMessage,history } from 'umi';
import {FooterToolbar, PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
// import type {FormValueType} from './components/UpdateForm';
import type {TableListItem} from './data.d';
import {del, findByPage, save} from './service';
import {Action} from "@/components/Action";
import {column_status} from "@/utils/commColumn";

/**
 * 添加节点
 *
 * @param fields
 */
// const handleAdd = async (fields: TableListItem) => {
//   const hide = message.loading('正在添加');
//   try {
//     await save({...fields});
//     hide();
//     message.success('添加成功');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('添加失败请重试！');
//     return false;
//   }
// };

/**
 * 更新节点
 *
 * @param fields
 */
// const handleUpdate = async (fields: FormValueType) => {
//   const hide = message.loading('正在配置');
//   try {
//     await updateRule({
//       name: fields.name,
//       desc: fields.desc,
//       key: fields.key,
//     });
//     hide();
//
//     message.success('配置成功');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('配置失败请重试！');
//     return false;
//   }
// };

/**
 * 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await del({
      id: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const Supplier: React.FC = () => {
  const itemArr = [
    {name: '详情', powerCode: 'detail'},
    {name: '编辑', powerCode: 'edit'},
    {name: '删除', powerCode: 'delete'},
  ]

  /** 新建窗口的弹窗 */
  const [modalVisible, handleModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);

  const handleClick = (type: any, record: any) => {
    switch (type) {
      case 'detail':
        setCurrentRow(record);
        setShowDetail(true);
        break;
      case 'edit':
        setCurrentRow(record);
        handleModalVisible(true);
        break;
      case 'delete':
        handleRemove([record]).then(r => {
          if (r) {
            actionRef.current?.reloadAndRest?.()
          }
        })
        break;
      default:
        break
    }
  };

  // @ts-ignore
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '申请单号',
      dataIndex: 'applyNo',
      copyable: true, // 支持copy
      ellipsis: true, // 超出自动收缩
    },
    {
      title: '申请人',
      dataIndex: 'applicantName',
    },
    {
      title: '申请单位',
      dataIndex: 'orgName',
    },
    {
      title: '总价',
      dataIndex: 'totalAmount',
    },
    {
      title: '流程状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: column_status.valueEnum
    },
    {
      title: '计划使用日期',
      dataIndex: 'planUseDate',
      valueType: 'dateRange',
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="操作"/>,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => <Action onClick={handleClick} itemArr={itemArr} record={record}/>
    },
  ];

  // @ts-ignore
  return (
    <PageContainer>
      <ProTable<TableListItem>
        headerTitle='物料采购汇总表'
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              history.push(`/purchase/purchaseApply/edit?id=${currentRow?.id}`)
              handleModalVisible(true);
            }}
          >
            <PlusOutlined/>
            <FormattedMessage id="pages.searchTable.new" defaultMessage="新建"/>
          </Button>,
        ]}
        request={
          (params, sorter, filter) => findByPage({...params, sorter, filter})}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="已选择"/>{' '}
              <a style={{fontWeight: 600}}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项"/>
            </div>
          }
        >
          <Button
            type="primary"
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}
    </PageContainer>
  );
};

export default Supplier;
