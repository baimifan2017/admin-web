/**
 * @author lzh
 * @desc:
 * @date:2021-06-14
 */


import React from "react";
import {Tabs} from "antd";

const { TabPane } = Tabs;

const RightTabs = React.FC = () =>{
 return (<Tabs defaultActiveKey="1" onChange={this.toggleTab}>
   <TabPane tab="属性配置" key="1">
     Content of Tab Pane 1
   </TabPane>
   <TabPane tab="其它配置" key="2">
     Content of Tab Pane 2
   </TabPane>
 </Tabs>)
}


export default RightTabs

