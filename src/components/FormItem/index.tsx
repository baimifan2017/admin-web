// @ts-ignore
import React, { useEffect, useState } from 'react';
import {
  FormItemProps,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDateTimePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';

import ProDescriptions from '@ant-design/pro-descriptions';
import { get } from 'lodash';
import { Form } from 'antd';
import SearchSelect from './components/SearchSelect';
import { ProFormItemProps } from '@ant-design/pro-form/es/interface';

export interface CommProps {
  fieldProps?: any;
  width: string;
  style?: React.CSSProperties;
  store: {
    url?: string;
    method?: 'POST' | 'GET';
  };
  rules?: any[];
}

let comProps: CommProps = {
  store: {},
  width: 'md',
};

// @ts-ignore
const defineMethod = (props: any): CommProps => {
  if (props.required) {
    comProps.rules = [{ required: true, message: `请输入${props.label}` }];
  } else {
    comProps.rules = [{ required: false }];
  }

  if (get(props, 'store.url')) {
  }
  return comProps;
};

const IProFormText = function (props: any) {
  const myProps = defineMethod(props);
  return (
    <span style={props.style}>
      <ProFormText {...myProps} {...props} />
    </span>
  );
};

const IProFormSelect = function (props: any) {
  const myProps = defineMethod(props);
  return <ProFormSelect {...myProps} {...props} />;
};

const IProFormTextArea = function (props: any) {
  const myProps = defineMethod(props);
  return <ProFormTextArea {...myProps} {...props} />;
};
const IProFormDigit = function (props: any) {
  const myProps = defineMethod(props);
  return <ProFormDigit {...myProps} {...props} />;
};

const IProFormDateTimePicker = function (props: any) {
  const myProps = defineMethod(props);
  return <ProFormDateTimePicker {...myProps} {...props} />;
};

const IProFormDatePicker = function (props: any) {
  const myProps = defineMethod(props);
  return <ProFormDatePicker {...myProps} {...props} />;
};

const IProFormDateRangePicker = function (props: any) {
  const myProps = defineMethod(props);
  return <ProFormDateRangePicker {...myProps} {...props} />;
};

const IProFormSwitch = function (props: any) {
  const myProps = defineMethod(props);
  myProps.fieldProps = {
    size: 'middle',
  };
  return <ProFormSwitch {...myProps} {...props} />;
};

type SearchSelectProps = {
  onChange?: (v: object) => void;
  store: {
    url: string;
    method?: string;
    params?: object;
  };
  placeholder?: string;
};

const IProFormSearchSelect = function (
  props: SearchSelectProps & FormItemProps & ProFormItemProps,
) {
  const myProps = defineMethod(props);
  return (
    <Form.Item {...myProps} {...props}>
      <SearchSelect {...props} />
    </Form.Item>
  );
};

const IDescriptionItem = function (props: any) {
  const { value } = props;
  return <ProDescriptions.Item {...props}>{value}</ProDescriptions.Item>;
};

export {
  IProFormText,
  IProFormSelect,
  IProFormDateRangePicker,
  IProFormTextArea,
  IProFormSwitch,
  IProFormDigit,
  IProFormDateTimePicker,
  IProFormDatePicker,
  IProFormSearchSelect,
  IDescriptionItem,
};
