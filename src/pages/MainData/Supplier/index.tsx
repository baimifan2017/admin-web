import {PlusOutlined} from '@ant-design/icons';
import {Button, Drawer, message} from 'antd';
import React, {useRef, useState} from 'react';
import {FormattedMessage} from 'umi';
import {FooterToolbar, PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProForm, {ModalForm} from '@ant-design/pro-form';
import type {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
// import type {FormValueType} from './components/UpdateForm';
import type {TableListItem} from './data.d';
import {del, findByPage, findOneById, save} from './service';
import {IDescriptionItem, IProFormSwitch, IProFormText, IProFormTextArea} from "@/components/FormItem";
import {Action} from "@/components/Action";

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');
  try {
    await save({...fields});
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

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

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '供应商名称',
      dataIndex: 'name',
      tip: '供应商名称是唯一的 key',
      copyable: true, // 支持copy
      ellipsis: true, // 超出自动收缩
    },
    {
      title: '统一社会信用代码',
      dataIndex: 'socialCreditCode',
    },
    {
      title: '供应商联系电话',
      dataIndex: 'tel',
    },
    {
      title: '供应商地址',
      dataIndex: 'address',
      search: false,
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
        headerTitle='供应商维护表'
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
      <ModalForm
        title={<>
          供应商_
          <span style={{fontSize: '12px'}}>{currentRow ? '编辑' : '新增'}</span>
        </>}
        width="760px"
        visible={modalVisible}
        modalProps={{
          destroyOnClose: true
        }}
        onVisibleChange={handleModalVisible}
        initialValues={{
          name: currentRow?.name,
          code: currentRow?.code,
          frozen: currentRow?.frozen,
          socialCreditCode: currentRow?.socialCreditCode,
          linkName: currentRow?.linkName,
          bankAccountName: currentRow?.bankAccountName,
          bankAccountNumber: currentRow?.bankAccountNumber,
          email: currentRow?.email
        }}
        onFinish={async (value) => {
          const success = await handleAdd({...currentRow, ...value} as TableListItem);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProForm.Group>
          <IProFormText
            required
            label="供应商名称"
            name="name"
            width='sm'
          />
          <IProFormText
            required
            label="供应商代码"
            name="code"
            width='sm'
          />
          <IProFormText
            required
            label="联系人"
            name="linkName"
            width='sm'
          />
        </ProForm.Group>
        <ProForm.Group>
          <IProFormText
            required
            label="社会统一信用代码"
            name="socialCreditCode"
            width='sm'
          />
          <IProFormText
            required
            label="联系电话"
            name="tel"
            width='sm'
          />
          <IProFormText
            required
            label="邮箱"
            name="email"
            width='sm'
          />
        </ProForm.Group>
        <ProForm.Group>
          <IProFormText
            label="银行户名称"
            name="bankAccountName"
            width='sm'
          />
          <IProFormText
            label="银行卡号"
            name="bankAccountNumber"
            width='sm'
          />
          <IProFormSwitch
            name="frozen"
            fieldProps={{
              size: 'small'
            }}
            label="是否冻结"/>
        </ProForm.Group>
        <IProFormTextArea
          label='联系地址'
          width='undefined'
          name="address"/>
      </ModalForm>
      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<TableListItem>
            column={2}
            title={currentRow?.name}
            request={async () => findOneById({id: currentRow.id})
            }
            columns={columns as ProDescriptionsItemProps<TableListItem>[]}
          >
            <IDescriptionItem
              dataIndex='tel'
              label="联系电话"/>
            <IDescriptionItem
              dataIndex='email'
              label="邮箱"/>
            <IDescriptionItem
              dataIndex='frozen'
              label="是否冻结"
              valueEnum={{
                true: {
                  text: '冻结',
                  status: 'Error',
                },
                false: {
                  text: '正常',
                  status: 'Success',
                },
              }}
            />
            <IDescriptionItem
              dataIndex='bankAccountName'
              label="银行户名" tooltip="仅供参考，以实际为准"/>

            <IDescriptionItem
              dataIndex='bankAccountNumber'
              label="银行账号" tooltip="仅供参考，以实际为准"/>

            <IDescriptionItem
              dataIndex='createdAt'
              valueType="dateTime"
              label="创建时间"/>
            <IDescriptionItem
              dataIndex='updatedAt'
              valueType="dateTime"
              label="修改时间"/>
          </ProDescriptions>
        )}
      </Drawer>
    </PageContainer>
  );
};

export default Supplier;
