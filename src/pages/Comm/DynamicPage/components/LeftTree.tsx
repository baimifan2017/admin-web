/**
 * @description:右侧form表单
 */

import React from 'react';
// @ts-ignore
import { ITree } from 'm-demo';
import { Button, Popconfirm, Popover } from 'antd';
import ProForm from '@ant-design/pro-form';
import { IProFormText } from '@/components/FormItem';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';

export interface RightFormProps {
  handleAdd?: () => void;
  handleSave: (v: any) => void;
  handleSelect: (v: any) => void;
  handleDel: (v: any, callback: any) => void;
  url: string;
  myRef: React.Ref<any>;
}

const RightForm: React.FC<RightFormProps> = (props) => {
  const { handleSave, handleDel, url, handleSelect, myRef } = props;

  /**
   * 新建目录
   * @param v
   * @param row
   */
  const mySave = (v: any, row?: any) => {
    handleSave(v);
  };

  const myDel = (v: any) => {
    handleDel(v, (res: any) => {
      if (res) {
        // @ts-ignore
        myRef.current.handleFindTree();
      }
    });
  };

  const popElement = (
    <ProForm
      onFinish={async (values) => {
        await mySave(values);
      }}
    >
      <ProForm.Group>
        <IProFormText width="small" name="name" label="名称" required />
        <IProFormText width="small" name="code" label="代码" required />
      </ProForm.Group>
    </ProForm>
  );

  const renderExtra = (row: { title: {} | null | undefined; children: any; key: any }): any => {
    const commStyle = {
      fontSize: 12,
      cursor: 'pointer',
      margin: '0 3px',
    };
    return [
      <Popover title="新增子节点" key="add" content={popElement} trigger="click">
        <PlusCircleOutlined style={{ ...commStyle, color: 'red' }} />
      </Popover>,
      <Popconfirm
        title="确定删除？删除后不可恢复"
        key="del"
        onConfirm={() => myDel(row)}
        okText="确认"
        cancelText="取消"
      >
        <MinusCircleOutlined style={{ ...commStyle }} />
      </Popconfirm>,
    ];
  };

  const { handleAdd } = props;
  const treeProps = {
    title: 'name',
    myKey: 'id',
    handleSave: mySave,
    handleDel: myDel,
    renderExtra,
    handleClick: handleSelect,
    header: {
      right: (
        <Popover content={popElement} title="新增根目录" trigger="click">
          <Button onClick={handleAdd}>新增</Button>
        </Popover>
      ),
    },
    ref: myRef,
    store: {
      url,
    },
  };
  return (
    <>
      <ITree {...treeProps} />
    </>
  );
};

export default RightForm;
