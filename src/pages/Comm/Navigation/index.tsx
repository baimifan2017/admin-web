// @ts-ignore
import React, {Component} from 'react';
import {connect, Dispatch} from "umi";
import {PageContainer} from "@ant-design/pro-layout";
import {Col, message, Row} from "antd";
import cls from 'classnames';
import Form from './components/Form';
import LeftTree from './components/LeftTree';
import PowerBtn from './components/PowerBtn';
import {treeUrl} from "./service";
import {waitTime} from "@/utils/myUtils";
import style from './style.less'

type NavigationProps = {
  dispatch: Dispatch,
  entity: object,
  loading: boolean
}

class Index extends Component <NavigationProps> {
  private readonly myRef: React.Ref<any>;

  constructor(props: NavigationProps) {
    super(props);
    this.myRef = React.createRef();
  }

  handleClick = (entity: any) => {
    const {dispatch} = this.props;
    if (dispatch) {
      dispatch({
        type: 'navigation/updateState',
        payload: {
          entity: null
        }
      })
    }
    waitTime(200).then(() => {
      if (dispatch) {
        dispatch({
          type: 'navigation/updateState',
          payload: {
            entity,
            showBlank: false
          }
        })
      }
    })
  }

  /**
   * 新增功能权限按钮
   * @param v
   */
  handleAddPowerBtn = (v: object) => {
    debugger
    const {dispatch, powerBtnArr}: any = this.props;
    powerBtnArr.forEach((item: { powerCode: any; }) => {
      // @ts-ignore
      if (item.powerCode === v?.powerCode) {
        message.warn('页面路径不能相同，请检查！', 3);
        return;
      }
    })

    powerBtnArr.push(v)
    dispatch({
      type: 'navigation/updateState',
      payload: powerBtnArr,
    })
  }

  /**
   * 删除权限按钮
   * @param v
   */
  handleDelPowerBtn = (v: object) => {
    // const { dispatch, powerBtnArr } = this.props;
  }

  /**
   * 权限按钮冻结、解冻
   * @param v
   */
  handleFrozenBtn = (v: object) => {

  };

  /**
   * 保存页面配置
   * @param v
   */
  handleSave = (v: object) => {
    const {dispatch, powerBtnArr}: any = this.props;
    // @ts-ignore
    v.powerBtn = powerBtnArr;

    dispatch({
      type: 'navigation/save',
      payload: v
    })
  }

  handleDel = (v: object) => {
    console.log(v)
  };

  render() {
    const {entity}: any = this.props;
    const treeProps = {
      handleSelect: this.handleClick,
      handleDel: this.handleDel,
      url: treeUrl,
      myRef: this.myRef
    }

    const formProps = {
      handleSave: this.handleSave,
      id: entity?.id
    };

    const powerBtnProps = {
      handleAddPowerBtn: this.handleAddPowerBtn
    };
    return (
      <PageContainer
      >
        <div className={cls(style.container)}>
          <Row gutter={6}>
            <Col span={7}>
              <div className='tree'>
                <LeftTree {...treeProps}/>
              </div>
            </Col>
            <Col span={12}>
              <div className='form'>
                <Form {...formProps}/>
              </div>
            </Col>
            <Col span={5}>
              <div className='item'>
                <PowerBtn {...powerBtnProps}/>
              </div>
            </Col>
          </Row>
        </div>
      </PageContainer>
    );
  }
}

export default connect(({navigation, loading}: any) => ({
  entity: navigation?.entity,
  powerBtnArr: navigation?.powerBtnArr,
  loading: loading.effects['navigation/save']
}))(Index);
