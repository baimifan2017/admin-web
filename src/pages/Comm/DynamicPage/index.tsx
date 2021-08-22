/**
 * @description: 组织机构设计
 */

// @ts-ignore
import React, { PureComponent, useRef } from 'react';
import { Col, Result, Row } from 'antd';
import cls from 'classnames';
import { connect, Dispatch } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
// import ProCard from '@ant-design/pro-card';
// import LeftTree from "./components/LeftTree";
import styles from './styles.less';
import { waitTime } from '@/utils/myUtils';
import { treeUrl } from './service';

export type OrgProps = {
  dispatch: Dispatch;
};

class Index extends PureComponent<OrgProps> {
  private readonly myRef: React.Ref<any>;

  constructor(props: OrgProps | Readonly<OrgProps>) {
    super(props);

    this.myRef = React.createRef();
  }

  /**
   * 保存
   * @param v
   */
  handleSave = (v: any) => {
    const { dispatch } = this.props;
    return new Promise((resolve) => {
      dispatch({
        type: 'org/save',
        payload: v,
        callback: (res) => {
          if (this.myRef) {
            // @ts-ignore
            this.myRef.current.handleFindTree();
          }
          resolve(res);
        },
      });
    });
  };

  /**
   * 删除
   * @param row
   * @param callback
   */
  handleDel = (row: any, callback: any): any => {
    const { dispatch } = this.props;
    dispatch({
      type: 'org/deleteById',
      payload: { id: row.id },
      callback: (res) => {
        callback(res);
      },
    });
  };

  handleClick = (entity: any) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'org/updateState',
      payload: {
        entity: null,
      },
    });
    waitTime(200).then(() => {
      dispatch({
        type: 'org/updateState',
        payload: {
          entity,
          showBlank: false,
        },
      });
    });
  };

  render() {
    const { entity, showBlank }: any = this.props;
    const treeProps = {
      handleSave: this.handleSave,
      handleDel: this.handleDel,
      handleSelect: this.handleClick,
      url: treeUrl,
      myRef: this.myRef,
    };

    return (
      <PageContainer>
        <div className={cls(styles.container)}>
          <Row gutter={16}>
            <Col span={6} className="leftTree">
              <div>{/*<LeftTree {...treeProps}/>*/}</div>
            </Col>
            <Col span={18} className="rightForm">
              <div>
                {showBlank ? (
                  <Result
                    status="404"
                    title="暂无内容"
                    subTitle="抱歉，你视乎没选择击左侧的树装结构！"
                  />
                ) : null}
              </div>
            </Col>
          </Row>
        </div>
      </PageContainer>
    );
  }
}

export default connect(({ org }: any) => ({
  entity: org.entity,
  showBlank: org.showBlank,
}))(Index);
