/**
 * @description: 树状表演示
 */

import React, { useRef } from 'react';
// @ts-ignore
import { ITree } from 'm-demo';
import { Button, Popconfirm, Popover } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';

export interface RightFormProps {
  handleAdd?: () => void;
  handleSave: (v: any, row: { title: {} | null | undefined; children: any; key: any }) => void;
  handleSelect: (v: any) => void;
  handleDel: (v: any, callback: any) => void;
  url: string;
  myRef: React.Ref<any>;
}

const Demo: React.FC<RightFormProps> = (props) => {
  const myRef = useRef();

  /**
   * 删除行
   * @param row
   */
  const handleDel = (row?: any) => {
    console.log(row);
  };

  /**
   * 保存
   * @param v
   * @param row
   */
  const handleSave = (v: object, row?: any) => {
    console.log(v, row);
  };

  /**
   * 选择tree节点事件
   * @param row
   */
  const onSelect = (row: object) => {
    console.log(row);
  };

  const popElement = (
    <ProForm
      onFinish={async (values: object) => {
        await handleSave(values);
      }}
    >
      <ProForm.Group>
        <ProFormText name="name" label="组织机构名称" />
        <ProFormText name="code" label="组织机构代码" />
      </ProForm.Group>
    </ProForm>
  );

  /**
   * 树形选择器行后额外操作
   * @param row 当前选中树状节点内容
   */
  const renderItemExtra = (row: { title: {} | null | undefined; children: any; key: any }): any => {
    const commStyle = {
      fontSize: 12,
      cursor: 'pointer',
      margin: '0 3px',
    };

    const popElement = (
      <ProForm
        onFinish={async (values: any) => {
          await handleSave(values, row);
        }}
      >
        <ProForm.Group>
          <ProFormText
            name="departName"
            label="部门名称"
            fieldProps={{
              width: 'middle',
            }}
            required
          />
          <ProFormText
            name="departCode"
            label="部门代码"
            fieldProps={{
              width: 'middle',
            }}
          />
        </ProForm.Group>
      </ProForm>
    );
    return [
      <Popover title="新增子节点" key="add" content={popElement} trigger="click">
        <PlusCircleOutlined style={{ ...commStyle, color: 'red' }} />
      </Popover>,
      <Popconfirm
        title="确定删除？删除后不可恢复"
        key="del"
        onConfirm={() => handleDel(row)}
        okText="确认"
        cancelText="取消"
      >
        <MinusCircleOutlined style={{ ...commStyle }} />
      </Popconfirm>,
    ];
  };

  const { handleAdd } = props;
  const treeProps = {
    myTitle: 'name',
    myKey: 'id',
    renderItemExtra,
    onSelect,
    header: {
      right: (
        <Popover content={popElement} title="新增根目录" trigger="click">
          <Button onClick={handleAdd}>新增</Button>
        </Popover>
      ),
    },
    ref: myRef,
    store: {
      url: '/test',
    },
  };
  return (
    <>
      <ITree {...treeProps} />
    </>
  );
};

export default Demo;
