/**
 * @description:参考github https://github.com/antvis/X6/tree/master/examples/x6-app-draw
 */

import {useEffect, useState} from 'react'
import {Col, Row} from 'antd';
import {GithubOutlined} from '@ant-design/icons'
import FlowGraph from './components/Graph'
import ToolBar from './components/ToolBar'
import ConfigPanel from './components/ConfigPanel'
import styles from './style.less'


export default function () {
  const [isReady, setIsReady] = useState(false)

  const getContainerSize = () => {
    return {
      width: document.body.offsetWidth - 581,
      height: document.body.offsetHeight - 87,
    }
  }

  useEffect(() => {
    const graph = FlowGraph.init()
    setIsReady(true)

    const resizeFn = () => {
      const { width, height } = getContainerSize()
      graph.resize(width, height)
    }
    resizeFn()

    window.addEventListener('resize', resizeFn)
    return () => {
      window.removeEventListener('resize', resizeFn)
    }
  }, [])

  const openGithub = () => {
    window.open(
      'https://github.com/antvis/X6/tree/master/examples/x6-app-draw',
      '_blank',
    )
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span>流程图 Demo</span>
        <span>
          <GithubOutlined onClick={openGithub} />
        </span>
      </div>
      <div className={styles.content}>
        <Row>
          <Col span={4}>
            <div id="stencil" className={styles.sider} />
          </Col>
          <Col span={16}>
            <div className={styles.panel}>
              <div className={styles.toolbar}>{isReady && <ToolBar />}</div>
              <div id="graph-container" className="x6-graph" />
            </div>
          </Col>
          <Col span={4}>
            <div className={styles.config}>{isReady && <ConfigPanel />}</div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
