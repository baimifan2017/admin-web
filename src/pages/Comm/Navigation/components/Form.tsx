// @ts-ignore
import React from 'react';
import ProForm from '@ant-design/pro-form';
import {IProFormSwitch, IProFormText, IProFormTextArea} from "@/components/FormItem";
import {FooterToolbar} from "@ant-design/pro-layout";


const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};


const layout = {
  labelCol: { span: 24},
  wrapperCol: { span: 24},
};

type IFormProps = {
  handleSave:(v:object) => void
}

export default (props:IFormProps) => {
  return (
    <ProForm
      submitter={{
        render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
      }}
      onFinish={async (values) => props.handleSave(values)}
      {...layout}
      params={{}}
      request={async () => {
        await waitTime(100);
        return {
          name: '蚂蚁设计有限公司',
          useMode: 'chapter',
        };
      }}
    >
      <ProForm.Group>
        <IProFormText
          name="name"
          label="导航名称"
          tooltip="将作目录名称显示"
          placeholder="请输入名称"
          required
        />
        <IProFormText
          name="url"
          label="页面路径"
          required
        />
      </ProForm.Group>
      <ProForm.Group>
        <IProFormText
          name='icon'
          width="md"
          label="图标名称"
          placeholder="请输入名称"
        />

        <IProFormSwitch
          name='frozen'
          label="冻结"
          placeholder="请输入名称"
          fieldProps={{
              size: 'small'
            }}
        />
      </ProForm.Group>
      <IProFormTextArea
        name="unusedMode"
        label="合同约定失效效方式"
        width= {undefined}
      />
    </ProForm>
  );
};
