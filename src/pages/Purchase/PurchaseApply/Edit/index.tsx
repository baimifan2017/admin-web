import {CloseCircleOutlined} from '@ant-design/icons';

import type {FC} from 'react';
// @ts-ignore
import React, {useState} from 'react';
import ProForm, {ProFormDateRangePicker, ProFormSelect, ProFormText, ProFormTimePicker,} from '@ant-design/pro-form';
import type {ProColumnType} from '@ant-design/pro-table';
import {EditableProTable} from '@ant-design/pro-table';
import {Card, Col, message, Popover, Row} from 'antd';
import {FooterToolbar, PageContainer} from '@ant-design/pro-layout';
import {fakeSubmitForm} from '../service';
import styles from '../style.less';
import {Header} from "@/components/Apply";
import {IProFormSearchSelect, IProFormDateTimePicker, IProFormDatePicker} from "@/components/FormItem";

interface TableFormDateType {
  key: string;
  workId?: string;
  name?: string;
  department?: string;
  isNew?: boolean;
  editable?: boolean;
}

type InternalNamePath = (string | number)[];

const fieldLabels = {
  name: '仓库名',
  url: '仓库域名',
  applicantName: '申请人',
  orgName: '组织机构',
  planUseDate: '计划使用日期',
  dateRange: '生效日期',
  type: '仓库类型',
  name2: '任务名',
  url2: '任务描述',
  owner2: '执行人',
  approver2: '责任人',
  dateRange2: '生效日期',
  type2: '任务类型',
};

const tableData = [
  {
    key: '1',
    workId: '00001',
    name: 'John Brown',
    department: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    workId: '00002',
    name: 'Jim Green',
    department: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    workId: '00003',
    name: 'Joe Black',
    department: 'Sidney No. 1 Lake Park',
  },
];

interface ErrorField {
  name: InternalNamePath;
  errors: string[];
};

const FormAdvancedForm: FC<Record<string, any>> = () => {
  const [error, setError] = useState<ErrorField[]>([]);
  const getErrorInfo = (errors: ErrorField[]) => {
    const errorCount = errors.filter((item) => item.errors.length > 0).length;
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = (fieldKey: string) => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    const errorList = errors.map((err) => {
      if (!err || err.errors.length === 0) {
        return null;
      }
      const key = err.name[0] as string;
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <CloseCircleOutlined className={styles.errorIcon}/>
          <div className={styles.errorMessage}>{err.errors[0]}</div>
          <div className={styles.errorField}>{fieldLabels[key]}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="表单校验信息"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={(trigger: HTMLElement) => {
            if (trigger && trigger.parentNode) {
              return trigger.parentNode as HTMLElement;
            }
            return trigger;
          }}
        >
          <CloseCircleOutlined/>
        </Popover>
        {errorCount}
      </span>
    );
  };

  const onFinish = async (values: Record<string, any>) => {
    setError([]);
    try {
      await fakeSubmitForm(values);
      message.success('提交成功');
    } catch {
      // console.log
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    setError(errorInfo.errorFields);
  };

  const columns: ProColumnType<TableFormDateType>[] = [
    {
      title: '成员姓名',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
    },
    {
      title: '工号',
      dataIndex: 'workId',
      key: 'workId',
      width: '20%',
    },
    {
      title: '所属部门',
      dataIndex: 'department',
      key: 'department',
      width: '40%',
    },
    {
      title: '操作',
      key: 'action',
      valueType: 'option',
      render: (_, record: TableFormDateType, index, action) => {
        return [
          <a
            key="eidit"
            onClick={() => {
              action.startEditable(record.key);
            }}
          >
            编辑
          </a>,
        ];
      },
    },
  ];

  // @ts-ignore
  return (
    <ProForm
      layout="vertical"
      hideRequiredMark
      submitter={{
        render: (props, dom) => {
          return (
            <FooterToolbar>
              {getErrorInfo(error)}
              {dom}
            </FooterToolbar>
          );
        },
      }}
      initialValues={{members: tableData}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <PageContainer
        title={<Header title={'12313'}/>}>
        <Card title="基本信息" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <IProFormSearchSelect
                label={fieldLabels.applicantName}
                name="applicantName"
                required
                store={{
                  url: '/api/user/findByPage'
                }}
                placeholder="请选择申请人"
              />
            </Col>

            <Col xl={{span: 6, offset: 2}} lg={{span: 8}} md={{span: 12}} sm={24}>
              <IProFormSearchSelect
                label={fieldLabels.orgName}
                name="orgName"
                required
                store={{
                  url: '/api/user/findByPage'
                }}
                placeholder="请选择组织机构"
              />
            </Col>

            <Col xl={{span: 8, offset: 2}} lg={{span: 10}} md={{span: 24}} sm={24}>
              <IProFormDatePicker
                label={fieldLabels.planUseDate}
                name="planUseDate"
                required
                placeholder="请选选择计划使用日期"
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormSelect
                label={fieldLabels.approver}
                name="approver"
                rules={[{required: true, message: '请选择审批员'}]}
                options={[
                  {
                    label: '付晓晓',
                    value: 'xiao',
                  },
                  {
                    label: '周毛毛',
                    value: 'mao',
                  },
                ]}
                placeholder="请选择管理员"
              />
            </Col>
            <Col xl={{span: 6, offset: 2}} lg={{span: 8}} md={{span: 12}} sm={24}>
              <ProFormDateRangePicker
                label={fieldLabels.dateRange}
                name="dateRange"
                fieldProps={{
                  style: {
                    width: '100%',
                  },
                }}
                rules={[{required: true, message: '请选择生效日期'}]}
              />
            </Col>
            <Col xl={{span: 8, offset: 2}} lg={{span: 10}} md={{span: 24}} sm={24}>
              <ProFormSelect
                label={fieldLabels.type}
                name="type"
                rules={[{required: true, message: '请选择仓库类型'}]}
                options={[
                  {
                    label: '私密',
                    value: 'private',
                  },
                  {
                    label: '公开',
                    value: 'public',
                  },
                ]}
                placeholder="请选择仓库类型"
              />
            </Col>
          </Row>
        </Card>

        <Card title="任务管理" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormText
                label={fieldLabels.name2}
                name="name2"
                rules={[{required: true, message: '请输入'}]}
              />
            </Col>
            <Col xl={{span: 6, offset: 2}} lg={{span: 8}} md={{span: 12}} sm={24}>
              <ProFormText
                label={fieldLabels.url2}
                name="url2"
                rules={[{required: true, message: '请选择'}]}
              />
            </Col>
            <Col xl={{span: 8, offset: 2}} lg={{span: 10}} md={{span: 24}} sm={24}>
              <ProFormSelect
                label={fieldLabels.owner2}
                name="owner2"
                rules={[{required: true, message: '请选择管理员'}]}
                options={[
                  {
                    label: '付晓晓',
                    value: 'xiao',
                  },
                  {
                    label: '周毛毛',
                    value: 'mao',
                  },
                ]}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormSelect
                label={fieldLabels.approver2}
                name="approver2"
                rules={[{required: true, message: '请选择审批员'}]}
                options={[
                  {
                    label: '付晓晓',
                    value: 'xiao',
                  },
                  {
                    label: '周毛毛',
                    value: 'mao',
                  },
                ]}
                placeholder="请选择审批员"
              />
            </Col>
            <Col xl={{span: 6, offset: 2}} lg={{span: 8}} md={{span: 12}} sm={24}>
              <ProFormTimePicker
                label={fieldLabels.dateRange2}
                name="dateRange2"
                rules={[{required: true, message: '请输入'}]}
                placeholder="提醒时间"
                fieldProps={{
                  style: {
                    width: '100%',
                  },
                }}
              />
            </Col>
            <Col xl={{span: 8, offset: 2}} lg={{span: 10}} md={{span: 24}} sm={24}>
              <ProFormSelect
                label={fieldLabels.type2}
                name="type2"
                rules={[{required: true, message: '请选择仓库类型'}]}
                options={[
                  {
                    label: '私密',
                    value: 'private',
                  },
                  {
                    label: '公开',
                    value: 'public',
                  },
                ]}
                placeholder="请选择仓库类型"
              />
            </Col>
          </Row>
        </Card>
        <Card title="成员管理" bordered={false}>
          <ProForm.Item name="members">
            <EditableProTable<TableFormDateType>
              recordCreatorProps={{
                record: () => {
                  return {
                    key: `0${Date.now()}`,
                  };
                },
              }}
              columns={columns}
              rowKey="key"
            />
          </ProForm.Item>
        </Card>
      </PageContainer>
    </ProForm>
  );
};

export default FormAdvancedForm;
