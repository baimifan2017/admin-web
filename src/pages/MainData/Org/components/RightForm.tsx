// @ts-ignore
import React from "react";
import ProForm from '@ant-design/pro-form';
import {get} from 'lodash';
import {IProFormSwitch, IProFormText, IProFormTextArea} from "@/components/FormItem";

export type RightFormProps = {
  handleSave: (v: any) => void,
  entity: Object,
}
export default (props: RightFormProps) => {
  // @ts-ignore
  const {handleSave, entity = {}} = props;

  return (
    <ProForm
      name="validate_other"
      initialValues={entity}
      onFinish={async (values) => {
        if (entity) {
          const {id, pid}: any = entity;
          values.id = id;
          values.pid = pid
        }
        await handleSave(values)
      }}
    >
      <ProForm.Group>
        <IProFormText
          name="orgNamePath"
          label="组织路径名称"
          disabled
        />
        <IProFormText
          name="orgCodePath"
          label="组织代码路径"
          disabled
        />
      </ProForm.Group>
      <ProForm.Group>
        <IProFormText
          name="orgName"
          label="组织机构名称"
          placeholder="请输入名称"
          required
        />
        <IProFormText
          name="orgCode"
          label="组织机构代码"
          placeholder="请输入名称"
          required
        />
      </ProForm.Group>
      <ProForm.Group>
        <IProFormTextArea
          name="remark"
          label="备注"
          placeholder="请输入名称"
          width='xl'
        />
      </ProForm.Group>
      <ProForm.Group>
        <IProFormSwitch
          name="frozen"
          initialValues={get(entity, 'frozen')}
          fieldProps={
            {
              size: 'small'
            }}
          label="是否冻结"/>
      </ProForm.Group>
    </ProForm>
  );
};
