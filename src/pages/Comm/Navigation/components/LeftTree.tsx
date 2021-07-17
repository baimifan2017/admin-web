/**
 * @description:右侧form表单
 */


import React from 'react';
import SearchTree from "@/components/Tree";
import ProForm from "@ant-design/pro-form";
import {IProFormText} from "@/components/FormItem";
import {Button, Popconfirm, Popover} from "antd";
import {MinusCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";

export interface RightFormProps {
  handleAdd?: () => void,
  // 新增目录
  handleSave?: (v: any, row?: { title: {} | null | undefined; children: any; key: any }) => void,
  handleSelect?: (v: any) => void,
  handleDel: (v: any) => void,
  url: string,
  myRef: React.Ref<any>,
  loading: boolean
}

const RightForm: React.FC<RightFormProps> = (props) => {

  const {url, handleSelect, myRef, handleSave, handleDel, loading} = props;

  const popForm = <ProForm.Group>
    <IProFormText
      width='small'
      name="name"
      label="页面名称"
      required
    />
    <IProFormText
      width='small'
      name="url"
      label="路由地址"
      required
    />
  </ProForm.Group>

  const renderExtra = (row: { title: {} | null | undefined; children: any; key: any; }): any => {

    const commStyle = {
      fontSize: 12,
      cursor: 'pointer',
      margin: '0 3px'
    }

    const popElement = <ProForm
      onFinish={async (values) => {
        if (handleSave) {
          handleSave(values, row)
        }
      }}
      submitter={{
        submitButtonProps: {
          loading: loading,
        },
      }}
    >
      {popForm}
    </ProForm>
    return [
      <Popover title='新增子节点'
               key='add'
               content={popElement}
               trigger='click'>
        <PlusCircleOutlined style={{...commStyle, color: 'red'}}/>
      </Popover>,
      <Popconfirm title="确定删除？删除后不可恢复"
                  key='del'
                  onConfirm={() => handleDel(row)}
                  okText="确认" cancelText="取消">
        <MinusCircleOutlined style={{...commStyle}}/>
      </Popconfirm>
    ]
  };

  const popElement = <ProForm
    onFinish={async (values) => {
      if (handleSave) {
        handleSave(values)
      }
    }}

    submitter={{
      submitButtonProps: {
        loading: loading,
      },
    }}
  >
    {popForm}
  </ProForm>

  const treeProps = {
    title: "name",
    myKey: 'id',
    onSelect: handleSelect,
    // 渲染树状节点上的操作
    renderExtra: renderExtra,
    header: {
      right: <Popover content={popElement}
                      title="新增根目录" trigger="click">
        <Button>新增</Button>
      </Popover>
    },
    ref: myRef,
    store: {
      url
    }
  }
  return <>
    {/*@ts-ignore*/}
    <SearchTree {...treeProps}/>
  </>
}


export default RightForm;
