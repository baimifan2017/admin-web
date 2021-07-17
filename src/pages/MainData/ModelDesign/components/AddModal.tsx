/**
 *@author:lzh
 *@describe:
 *@time:
 */

// @ts-ignore
import React, {useRef} from 'react';
import type {FormInstance} from 'antd';
import {Form, message, Tag} from 'antd';
import moment from "moment";
import {ModalForm, ProFormRadio, ProFormText} from '@ant-design/pro-form';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};


const now = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

export default (props: { visible: boolean; toggleVisible: ((v: boolean) => void) }) => {
  const {visible, toggleVisible} = props
  const formRef = useRef<FormInstance>();

  return (
      <ModalForm
        title="新建表单"
        formRef={formRef}
        visible={visible}
        onVisibleChange={toggleVisible}
        width={400}
        submitter={{
          searchConfig: {
            resetText: '重置',
          },
          resetButtonProps: {
            onClick: () => {
              formRef.current?.resetFields();
            },
          },
        }}

        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
          formRef.current?.getFieldsValue();
          message.success('提交成功');
          return true;
        }}
      >
        <ProFormText
          width="md"
          name="modelName"
          label="模型名称"
          tooltip="最长为 24 位"
          placeholder="请输入名称"
          rules={[
            {
              required: true,
              message: '请输入验证码',
            },
          ]}
        />

        <ProFormText
          width="md"
          name="modelCode"
          label="模型代码"
          tooltip="模型代码将作为数据库名称"
          placeholder="请输入名称"
          fieldProps={{
            size: 'middle',
            prefix: 'tb_',
          }}
        />

        <ProFormRadio.Group
          name="frozen"
          label="是否冻结"
          initialValue={'b'}
          options={[
            {
              label: '正常',
              value: false,
            },
            {
              label: '冻结',
              value: true,
            }
          ]}
        />

        <Form.Item name="updateTime" label="更新时间" initialValue={now}>
          <Tag>{now}</Tag>
        </Form.Item>
      </ModalForm>
  );
};
