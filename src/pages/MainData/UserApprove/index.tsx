/**
 *@author:lzh
 *@describe:
 *@time:
 */
// @ts-ignore
import React, {useRef} from 'react';
import {connect, Dispatch} from 'dva';
import {PageContainer} from '@ant-design/pro-layout';
import ProTable, {ActionType, ProColumns} from '@ant-design/pro-table';
// @ts-ignore
import {findByPage} from './service.ts';

import {Action} from '../../../components/Action';


type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

export interface UserApproveProve {
  dispatch: Dispatch;
  loading: boolean;
}


class UserApprove extends React.Component<UserApproveProve> {
  private tableRef: ActionType | undefined;

  handleClick = (type: any, record: any) => {
    console.log(this.props)
    debugger
    const {dispatch} = this.props;
    switch (type) {
      case 'detail':
        break;
      case 'edit':
        break;
      case 'delete':
        dispatch({
          type: 'userDetail/del',
          payload: record,
          callback: (res: { success: boolean; }) => {
            const {success} = res;
            if (success) {
              // @ts-ignore
              this.tableRef.current.reload();
            }
          }
        })
        break;
      default:
        break
    }
  };

  render() {
    const itemArr = [
      {name: '详情', powerCode: 'detail'},
      {name: '编辑', powerCode: 'edit'},
      {name: '删除', powerCode: 'delete'},
    ]
    // @ts-ignore
    const columns: ProColumns<GithubIssueItem>[] = [
      {
        title: '用户名称',
        dataIndex: 'userName',
        key: 'userName',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
      },
      {
        title: '联系电话',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '身份证号',
        dataIndex: 'idNumber',
        key: 'idNumber',
      },
      {
        title: '银行户名称',
        dataIndex: 'bankAccountName',
        key: 'bankAccountName',
      },
      {
        title: '银行卡号',
        dataIndex: 'bankAccountNumber',
        key: 'bankAccountNumber',
      },
      {
        title: '操作',
        dataIndex: 'action',
        search: false, // 查询中不显示
        render: (_, record) => <Action onClick={this.handleClick} itemArr={itemArr} record={record}/>
      }
    ];


    return (
      <PageContainer>
        <ProTable
          <GithubIssueItem>
          columns={columns}
          request={async (params = {}, sort, filter) => {
            return findByPage(params)
          }}
          editable={{
            type: 'multiple',
          }}
          rowKey="id"
          actionRef={ref => this.tableRef = ref}
        />
      </PageContainer>
    );
  }
}

export default connect(({userDetail, loading}: any) => ({
  userDetail,
  loading: loading.effects['userDetail/del']
}))(UserApprove);


