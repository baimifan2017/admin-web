// @ts-ignore
import React, {useState} from 'react';
import ProForm, {
  ProFormGroup,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton
} from '@ant-design/pro-form';
import {FooterToolbar, PageContainer} from '@ant-design/pro-layout';
import {get} from 'lodash';
import {IProFormDigit, IProFormText} from "@/components/FormItem";
import styles from './index.less';
import {Dispatch} from "@@/plugin-dva/connect";
import {connect} from "umi";


export interface RegisterProps {
  entity?: any
  dispatch: Dispatch;
  submitting: boolean;
}

const requiredProps = {required: true, message: '必填项目！'};

const Register: React.FC<RegisterProps> = (props) => {
  const {entity, submitting, dispatch} = props;

  return (<div className={styles.container}>
    <PageContainer title='用户注册申请'>
      <ProForm
        name="validate_other"
        onFinish={async (values) => {
          const {attachIds} = values;

          if (attachIds && attachIds.length > 0) {
            attachIds.forEach((item: { response: object[] }, index: string | number) => {
              // @ts-ignore
              item.response.forEach((obj: { id: any; }) => {
                values.attachIds[index] = obj.id;
              })
            })
          }

          dispatch({
            type: 'register/save',
            payload: values
          })
        }}
        submitter={{
          render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
          submitButtonProps: {
            loading: submitting,
          },
        }}
      >
        <ProFormGroup label="个人信息">
          <IProFormText
            initialValue={get(entity, 'userName')}
            name="userName" label="用户名称"
            required
          />
          {/*@ts-ignore*/}
          <ProFormText.Password
            initialValue={get(entity, 'password')}
            name="password" label="登录密码"
            width='md'
            required
          />
          <ProFormRadio.Group
            name="sex"
            label="性别"
            options={[
              {
                label: '男',
                value: 'male',
              },
              {
                label: '女',
                value: 'female',
              },
            ]}
            initialValue={get(entity, 'sex')}
            rules={[requiredProps]}
          />
          <IProFormText
            initialValue={get(entity, 'email')}
            name="email" label="联系邮箱"
            required/>
          <IProFormText
            initialValue={get(entity, 'phone')}
            name="phone" label="联系电话"
            required/>
          <IProFormText
            name="address"
            initialValue={get(entity, 'address')}
            label="联系地址"/>
          <IProFormDigit
            label="年龄"
            name="age"
            initialValue={get(entity, 'age')}
            fieldProps={{precision: 0}}
            min={1} max={10}/>
          <ProFormSelect
            name="deptId"
            label="所在部门"
            width="md"
            valueEnum={{
              china: 'China',
              usa: 'U.S.A',
            }}
            initialValue={get(entity, 'deptName')}
            placeholder="请选择所属单位或者部门"
            rules={[requiredProps]}
          />

          <ProFormSelect
            name="typeOfWorkId"
            label="工种"
            width="md"
            valueEnum={{
              china: 'China',
              usa: 'U.S.A',
            }}
            placeholder="请选所属工种"
            initialValue={get(entity, 'typeOfWorkName')}
            rules={[requiredProps]}
          />
        </ProFormGroup>

        <ProFormTextArea
          name="description" label="工作经历介绍"
          initialValue={get(entity, 'description')}/>
        <ProFormGroup label="支付信息">
          <IProFormText
            name="idNumber" label="身份证号" rules={[requiredProps]}/>
          <IProFormText
            name="bankAccountName" label="银行户名称" rules={[requiredProps]}/>
          <IProFormText
            name="bankAccountNumber" label="银行卡号" rules={[requiredProps]}/>
        </ProFormGroup>

        <ProFormGroup label="附件信息">
          <ProFormUploadButton
            name='attachIds'
            label="身份证正反面"
            max={4}
            fieldProps={{
              name: 'file',
              listType: 'picture-card',
              data: {
                type: 'idCard'
              }
            }}
            action="api/files/upload"
          />
        </ProFormGroup>
      </ProForm>
    </PageContainer>
  </div>)
}

export default connect(({register, loading}: any) => ({
  register: register,
  submitting: loading.effects['register/save'],
}))(Register);


