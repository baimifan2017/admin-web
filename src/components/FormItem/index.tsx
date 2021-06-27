// @ts-ignore
import React from "react";
import {ProFormDateRangePicker, ProFormSelect, ProFormSwitch, ProFormText, ProFormTextArea} from '@ant-design/pro-form';


export interface CommProps {
  fieldProps?: any;
  width: string,
  rules?: any[]
}

let comProps: CommProps = {
  width: 'md',
}


const defineMethod = (props: any): CommProps => {
  if (props.required) {
    comProps.rules = [
      {required: true, message: `请输入${props.label}`}
    ]
  }else {
    comProps.rules = [
      {required: false}
    ]
  }
  return comProps;
}


const IProFormText = function (props: any) {
  const myProps = defineMethod(props);
  return <ProFormText {...myProps} {...props}/>
}

const IProFormSelect = function (props: any) {
  const myProps = defineMethod(props);
  return <ProFormSelect {...myProps} {...props} />
}

const IProFormTextArea = function (props: any) {
  const myProps = defineMethod(props);
  return <ProFormTextArea {...myProps} {...props} />
}

const IProFormDateRangePicker = function (props: any) {
  const myProps = defineMethod(props);
  return <ProFormDateRangePicker {...myProps} {...props} />
}

const IProFormSwitch = function (props: any) {
  const myProps = defineMethod(props);
  // myProps.fieldProps = {
  //   size:'middle'
  // }
  return <ProFormSwitch {...myProps} {...props} />
}

export {
  IProFormText,
  IProFormSelect,
  IProFormDateRangePicker,
  IProFormTextArea,
  IProFormSwitch
}
