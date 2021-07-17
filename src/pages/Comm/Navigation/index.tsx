// @ts-ignore
import React, {Component, useRef} from 'react';
import {connect, Dispatch} from "umi";
import {PageContainer} from "@ant-design/pro-layout";
import type {FormInstance} from 'antd'
import {Col, Row} from "antd";
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
  private readonly formRef: any;

  constructor(props: NavigationProps) {
    super(props);
    this.myRef = React.createRef();
    this.formRef = React.createRef<FormInstance>()
  }

  componentWillUnmount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'navigation/updateState',
      payload: {
        entity: null
      }
    })
  }

  handleSelect = (row: any) => {
    const {dispatch} = this.props;
    waitTime(100).then(() => {
      if (dispatch) {
        dispatch({
          type: 'navigation/findOneById',
          payload: {
            id: row.id
          },
        })

        if (this.formRef) {
          this.formRef.current?.setFieldsValue({
            id: row?.id,
            name: row.name,
            url: row.url,
            ico: row.icon,
            remark: row.remark
          })

          this.forceUpdate();
        }
      }
    })
  }

  /**
   * 新增功能权限按钮
   * @param v
   */
  handleSavePowerBtn = (v: object) => {
    const {dispatch, entity}: any = this.props;
    const params = {
      myNavigationId: entity.id,
      powerBtn: v
    }
    waitTime(150).then(() => {
      dispatch({
        type: 'navigation/savePower',
        payload: {
          ...params
        },
        callback: (res: any) => {
          if (res) {
            this.forceUpdate();
          }
        }
      })
    })
  }

  /**
   * 删除权限按钮
   * @param v
   */
  handleDelPowerBtn = (v: { id: any }) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'navigation/delPowerBtn',
      payload: {id: v.id}
    })
  }

  /**
   * 保存页面配置
   * @param v
   */
  handleSave = (v: any, row?: any) => {
    const {dispatch, powerBtnArr, entity}: any = this.props;

    if (entity) {
      v = {...entity, ...v}
    }

    if (powerBtnArr.length > 0) {
      // @ts-ignore
      v.powerBtn = powerBtnArr;
    } else {
      v.powerBtn = [];
    }
    if (row) {
      v.pid = row.id
    }
    dispatch({
      type: 'navigation/save',
      payload: v
    })
  }

  handleDel = (v: any) => {
    const {dispatch} = this.props
    dispatch({
      type: 'navigation/deleteById',
      payload: {id: v.id},
      callback: res => {
        if (res.success && this.myRef) {
          // @ts-ignore
          this.myRef?.current.handleFindTree()
        }
      }
    })
  };

  render() {
    const {loading, powerBtnArr}: any = this.props;
    const treeProps = {
      handleSelect: this.handleSelect,
      handleDel: this.handleDel,
      handleSave: this.handleSave,
      url: treeUrl,
      myRef: this.myRef,
      loading: loading
    }

    const formProps = {
      handleSave: this.handleSave,
      formRef: this.formRef
    };

    const powerBtnProps = {
      handleSavePowerBtn: this.handleSavePowerBtn,
      powerBtnArr: powerBtnArr,
      handleDelPowerBtn: this.handleDelPowerBtn
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
  entity: navigation.entity,
  powerBtnArr: navigation.powerBtnArr,
  navigation: navigation,
  loading: loading.effects['navigation/save']
}))(Index);
