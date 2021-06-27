/**
 * @description:权限列表
 */

// @ts-ignore
import React from 'react';
import {Button, Tag, Space, Popover} from 'antd';
import cls from 'classnames';
import ProList from '@ant-design/pro-list';
import ProForm from "@ant-design/pro-form";
import {IProFormText} from "@/components/FormItem";
import style from './style.less'

const dataSource = [
  {
    name: '语雀的天空',
    desc: '我是一条测试的描述',
  },
  {
    name: 'Ant Design',
    desc: '我是一条测试的描述',
  },
];

const renderPopElement = (save: (v: any) => void): JSX.Element => {
  return <ProForm
    onFinish={async (values) => {
      await save(values)
    }}
    style={{
      width: 230,
      margin: 'auto',
    }}
    className={cls(style.powerBtn)}
  >
    <ProForm.Group>
      <IProFormText
        width='small'
        name="powerName"
        label="权限按钮名称"
        required
      />
      <IProFormText
        width='small'
        name="powerCode"
        label="权限按钮代码"
        required
      />
    </ProForm.Group>
  </ProForm>
}

type PowerBtnProps = {
  handleAddPowerBtn: (v: any) => void
}

export default (props: PowerBtnProps) => (
  <ProList<any>
    toolBarRender={() => {
      return [
        <Popover title='新增子节点'
                 key='add'
                 placement='left'
                 content={() => renderPopElement(props.handleAddPowerBtn)}
                 trigger='click'>
          <Button key="add" type="primary">
            新建
          </Button>
        </Popover>,
      ];
    }}
    onRow={(record: any) => {
      return {
        onMouseEnter: () => {
          console.log(record);
        },
        onClick: () => {
          console.log(record);
        },
      };
    }}
    rowKey="name"
    headerTitle="功能权限"
    tooltip="页面功能权限"
    dataSource={dataSource}
    showActions="hover"
    showExtra="hover"
    // loading={true}
    metas={{
      // title: {
      //   dataIndex: 'name',
      // },
      avatar: {
        dataIndex: 'image',
      },
      description: {
        dataIndex: 'desc',
      },
      subTitle: {
        render: () => {
          return (
            <Space size={0}>
              <Tag color="blue">Ant Design</Tag>
              <Tag color="#5BD8A6">TechUI</Tag>
            </Space>
          );
        },
      },
      actions: {
        render: (text, row) => [
          <a href={row.html_url} target="_blank" rel="noopener noreferrer" key="link">
            删除
          </a>,
          <a href={row.html_url} target="_blank" rel="noopener noreferrer" key="warning">
            冻结
          </a>,
        ],
      },
    }}
  />
);
