/**
 * @description:权限列表
 */

// @ts-ignore
import React from 'react';
import {Button, Popover, Space, Tag, Popconfirm} from 'antd';
import cls from 'classnames';
import ProList from '@ant-design/pro-list';
import ProForm from "@ant-design/pro-form";
import {IProFormText} from "@/components/FormItem";
import style from './style.less'

type PowerBtnProps = {
  handleSavePowerBtn: (v: any) => void,
  handleDelPowerBtn: (v: any) => void,
  powerBtnArr: any[]
}

export default (props: PowerBtnProps) => {
  const {powerBtnArr, handleSavePowerBtn, handleDelPowerBtn} = props;

  const onFrozen = (v: { frozen: boolean; }) => {
    v.frozen = !v.frozen;
    handleSavePowerBtn(v)
  }
  const renderPopElement = (): JSX.Element => {
    return <ProForm
      onFinish={async (values) => handleSavePowerBtn(values)}
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

  return <ProList<any>
    toolBarRender={() => {
      return [
        <Popover title='新增子节点'
                 key='add'
                 placement='left'
                 content={renderPopElement}
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
    dataSource={powerBtnArr}
    showActions="hover"
    showExtra="hover"
    // loading={true}
    metas={{
      // title: {
      //   dataIndex: 'name',
      // },
      description: {
        dataIndex: 'powerCode',
      },
      subTitle: {
        render: (_, item) => {
          return (
            <Space size={0}>
              <Tag>{item.powerName}</Tag>
              <Tag color={item.frozen ? 'red' : 'blue'}>{item.frozen ? '冻结' : '正常'}</Tag>
            </Space>
          );
        },
      },
      actions: {
        render: (text, row) => [
          <Popconfirm title="确认删除？"
                      onConfirm={() => handleDelPowerBtn(row)}
                      okText="确认" cancelText="取消">
            <a href={row} target="_blank"
               rel="noopener noreferrer" key="link">
              删除
            </a>
          </Popconfirm>
          ,
          <a onClick={() => onFrozen(row)}
             target="_blank" rel="noopener noreferrer" key="warning">
            {
              row.frozen ? '解冻' : '冻结'
            }
          </a>,
        ],
      },
    }}
  />
};
