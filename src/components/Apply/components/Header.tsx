// @ts-ignore
import React from 'react';
import {ApproveStatus} from "@/utils/commTypes";
import {Tag} from "antd";
import SimpleBarcode from "@/components/Apply/components/SimpleBarCode";
import moment from "moment";

const renderStatus = (status: ApproveStatus | undefined): any => {
  switch (status) {
    case 'init':
      return <Tag>初始化</Tag>
      break;
    case 'process':
      return <Tag color="gold">流程中</Tag>
      break;
    case 'completed':
      return <Tag color="green">流程中</Tag>
      break;
    case 'refused':
      return <Tag color="red">已拒绝</Tag>
      break;
    default:
      break;
  }
};

export type Props = {
  title: string
  status?: ApproveStatus | undefined;
  applyNo?: string;
  createBy?: string;
  updateBy?: string;
  updatedAt?: Date;
  createdAt?: Date;
};

const headerStyle = {
  display: 'flex',
  flexDirection: 'row',
}

const Header: (props: Props) => JSX.Element = (props: Props) => {
  const {applyNo = '121312312312', status, title, createBy, createdAt} = props
  // @ts-ignore
  return <div style={headerStyle}>
    <SimpleBarcode label={applyNo}/>
    <div style={{margin: '0 12px', height: '20px', lineHeight: '20px'}}>
      <span>{title}</span>
      <div>{renderStatus(status)}</div>
      <div style={{fontSize: '12px', color: 'gray', fontWeight: 300}}>
        <span>制单人：{createBy}</span>
        <span>制单时间：{createdAt || moment(new Date()).format('YYY-MM-DD')}</span>
      </div>
    </div>
  </div>
}


export default Header
