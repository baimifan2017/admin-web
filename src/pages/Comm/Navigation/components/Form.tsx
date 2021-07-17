// @ts-ignore
import React from 'react';
import ProForm from '@ant-design/pro-form';
import {IProFormSwitch, IProFormText, IProFormTextArea} from "@/components/FormItem";


const layout = {
  labelCol: {span: 24},
  wrapperCol: {span: 24},
};

type IFormProps = {
  handleSave: (v: any) => void,
  formRef?: any,
  entity?: object,
}

export default (props: IFormProps) => {
  return (
    <ProForm
      // submitter={{
      //   render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
      // }}
      onFinish={async (values) => props.handleSave(values)}
      {...layout}

      formRef={props.formRef}
    >
      <ProForm.Group>
        <IProFormText
          name="id"
          label="id"
          placeholder="id"
          hidden
        />
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
        name="remark"
        label="备注"
        width={undefined}
      />
    </ProForm>
  );
};
