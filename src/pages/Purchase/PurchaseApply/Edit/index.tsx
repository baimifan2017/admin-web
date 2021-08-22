import { CloseCircleOutlined } from '@ant-design/icons';

import type { FC } from 'react';
// @ts-ignore
import React, { useEffect, useRef, useState } from 'react';
import ProForm from '@ant-design/pro-form';
import type { ProColumnType } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { omit } from 'lodash';
import { Button, Card, Col, FormInstance, Popover, Row } from 'antd';
import { history } from 'umi';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { findOneById, save } from '../service';
import styles from '../style.less';
import { Header } from '@/components/Apply';
import { IProFormDatePicker, IProFormSearchSelect, IProFormText } from '@/components/FormItem';
import { myMessage } from '@/utils/myUtils';

interface TableFormDateType {
  name: string;
  specification?: string;
  unitPrice?: number;
  amount: number;
  unit?: string;
  supplierName?: string;
  key: string;
  isNew?: boolean;
  editable?: boolean;
}

type InternalNamePath = (string | number)[];

const fieldLabels = {
  applicantName: '申请人',
  orgName: '组织机构',
  planUseDate: '计划使用日期',
  totalAmount: '采购总价',
  remark: '采购说明',

  name: '物料名称',
  specification: '规格型号',
  unitPrice: '单价（单位：元）',
  amount: '数量',
  unit: '单位',
  supplierName: '指定供应商',

  url: '仓库域名',
  dateRange: '生效日期',
  type: '仓库类型',
  name2: '任务名',
  url2: '任务描述',
  owner2: '执行人',
  approver2: '责任人',
  dateRange2: '生效日期',
  type2: '任务类型',
};

interface ErrorField {
  name: InternalNamePath;
  errors: string[];
}

const FormAdvancedForm: FC<Record<string, any>> = () => {
  const [dataSource, setDataSource] = useState([]);

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
          <CloseCircleOutlined className={styles.errorIcon} />
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
          <CloseCircleOutlined />
        </Popover>
        {errorCount}
      </span>
    );
  };

  const searchParams = new URLSearchParams(history.location.search);
  const formRef = useRef<FormInstance>();
  useEffect(() => {
    findOneById({ id: searchParams.get('id') }).then((r) => {
      const { success, data } = r;
      if (success) {
        formRef.current?.setFieldsValue({
          applicantName: {
            key: data.applicantId,
            label: data.applicantName,
            value: data.applicantId,
          },
          applicantId: data.applicantId,
          orgName: {
            key: data.orgId,
            label: data.orgName,
            value: data.orgId,
          },
          // orgId: data.orgId,
          orgId: data.orgId,
          remark: data.remark,
          planUseDate: data.planUseDate,
          totalAmount: data.totalAmount,
          items: data.purchaseItems,
        });

        setDataSource(data.purchaseItems);
      }
    });
  }, [searchParams.get('id')]);

  const onFinish = async (values: Record<string, any>) => {
    setError([]);
    try {
      if (values.applicantName.key) {
        const applicant = values.applicantName;
        values.applicantName = applicant.label;
        values.applicantId = applicant.value;
      }

      if (values.orgName.key) {
        const org = values.orgName;
        values.orgId = org.value;
        values.orgName = org.label;
      }

      const temParams = {
        header: omit(values, 'items'),
        items: values.items,
      };

      const r = await save(temParams);
      myMessage(r);
    } catch {
      // console.log
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    setError(errorInfo.errorFields);
  };

  const columns: ProColumnType<TableFormDateType>[] = [
    {
      title: '物料名称',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
    },
    {
      title: '规格型号',
      dataIndex: 'specification',
      key: 'specification',
      width: '20%',
    },
    {
      title: '单价',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      width: '10%',
    },
    {
      title: '数量',
      dataIndex: 'amount',
      key: 'amount',
      width: '10%',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      width: '20%',
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
              // @ts-ignore
              action.startEditable(record.key);
            }}
          >
            编辑
          </a>,
        ];
      },
    },
  ];

  console.log('dataSource', dataSource);
  // @ts-ignore
  return (
    <ProForm
      layout="vertical"
      hideRequiredMark
      formRef={formRef}
      submitter={{
        render: (props, dom) => {
          return (
            <FooterToolbar>
              <Button onClick={() => history.go(-1)}>返回</Button>
              {getErrorInfo(error)}
              {dom}
            </FooterToolbar>
          );
        },
      }}
      initialValues={{ items: dataSource }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <PageContainer title={<Header title="采购申请单" />}>
        <Card title="基本信息" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <IProFormSearchSelect
                label={fieldLabels.applicantName}
                name="applicantName"
                required
                store={{
                  url: '/api/user/findHeaderByPage',
                }}
                placeholder="请选择申请人"
              />
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <IProFormSearchSelect
                label={fieldLabels.orgName}
                name="orgName"
                required
                store={{
                  url: '/api/org/findByPage',
                }}
                placeholder="请选择组织机构"
              />
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
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
              <IProFormText label={fieldLabels.totalAmount} name="totalAmount" />
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <IProFormText label={fieldLabels.remark} name="remark" />

              <IProFormText
                name="orgId"
                style={{
                  display: 'none',
                }}
              />

              <IProFormText
                name="applicantId"
                style={{
                  display: 'none',
                }}
              />
            </Col>
          </Row>
        </Card>

        <Card title="采购明细" bordered={false}>
          <ProForm.Item name="items">
            <EditableProTable<TableFormDateType>
              rowKey="key"
              // request={() => findPurchaseItems({current: 0, pageSize: 500})}
              columns={columns}
              request={async () => ({
                data: dataSource,
                total: 3,
                success: true,
              })}
              recordCreatorProps={{
                // @ts-ignore
                record: () => {
                  return {
                    key: `0${Date.now()}`,
                  };
                },
              }}
            />
          </ProForm.Item>
        </Card>
      </PageContainer>
    </ProForm>
  );
};

export default FormAdvancedForm;
