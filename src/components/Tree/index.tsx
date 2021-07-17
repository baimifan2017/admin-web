import React from "react";
import {Input, message, Tree} from 'antd';
import {get} from 'lodash';
import request from "@/utils/request";
import cls from 'classnames';
import style from './style.less'

const {Search} = Input;

const x = 3;
const y = 2;
const z = 1;
const gData: never[] = [];

// @ts-ignore
const generateData = (_level: number, _preKey: string | undefined, _tns: any[] | undefined) => {
  const preKey = _preKey || '0';
  const tns = _tns || gData;

  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({title: key, key});
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
// @ts-ignore
generateData(z);

const dataList: { key: any; title: any; }[] = [];
const generateList = (data: string | any[], myKey = 'key', myTitle: string) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    // const key = node[myKey];
    let params = {};
    params[myKey] = node[myKey]
    params[myTitle] = node[myTitle]
    // dataList.push({key, title: key});
    // @ts-ignore
    dataList.push(params);
    if (node.children) {
      generateList(node.children, myKey, myTitle);
    }
  }
};
// generateList(gData);

// @ts-ignore
const getParentKey = (key: any, tree: string | any[], myKey) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item: { key: any; }) => item[myKey] === key)) {
        parentKey = node[myKey];
      } else if (getParentKey(key, node.children, myKey)) {
        parentKey = getParentKey(key, node.children, myKey);
      }
    }
  }
  return parentKey;
};

export interface TreeProps {
  myKey: string,
  title: string,
  extra?: any,
  renderExtra?: any,
  header?: {
    left?: any,
    right?: any,
  },
  store?: {
    url: string,
    option?: {
      method: 'get'
    }
  },
  onSelect: (e: any) => void,
  data?: object[]
}

class SearchTree extends React.Component<TreeProps> {
  state = {
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
    dataSource: []
  };


  static defaultProps = {
    myKey: 'key',
    title: 'title',
  }

  handleFindTree = () => {
    const {store = {}} = this.props;
    // @ts-ignore
    const {url, option} = store;
    if (url) {
      request(url, {
        method: get(option, 'method', 'get')
      }).then(r => {
        const {ok, success, data, statusText, msg} = r
        if (ok | success) {
          this.setState({
            dataSource: data
          })
          const {myKey, title} = this.props
          generateList(data, myKey, title);
        } else {
          message.error(statusText | msg, 3)
        }
      })
    }
  }

  componentDidMount() {
    this.handleFindTree()
  }

  onExpand = (expandedKeys: any) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onChange = (e: { target: { value: any; }; }) => {
    const {dataSource} = this.state;
    const {title, myKey} = this.props;
    const {value} = e.target;

    const expandedKeys = dataList
      .map(item => {
        if (item[title].indexOf(value) > -1) {
          return getParentKey(item[myKey], dataSource, myKey);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  };


  render() {
    const {searchValue, expandedKeys, autoExpandParent, dataSource} = this.state;
    const {header, title, myKey, renderExtra, onSelect} = this.props;

    // @ts-ignore
    const loop = (data: { title: {} | null | undefined; children: any; key: any; }[]) =>
      data.map((item: { title: {} | null | undefined; children: any; key: any; }) => {
        // @ts-ignore
        const index = item[title].indexOf(searchValue);
        // @ts-ignore
        const beforeStr = item[title].substr(0, index);
        // @ts-ignore
        const afterStr = item[title].substr(index + searchValue.length);
        // @ts-ignore
        const myTitle =
          index > -1 ? (
            <span style={{width: '100%'}} onClick={() => onSelect(item)}>
              {beforeStr}
              <span className="site-tree-search-value">{searchValue}</span>
              {afterStr}

              <span style={{marginLeft: 12}} className='operate'>
                {renderExtra && renderExtra(item)}
              </span>
            </span>
          ) : (
            <span>{item[title]}</span>
          );
        if (item.children) {
          return {title: myTitle, key: item[myKey], children: loop(item.children)};
        }

        return {
          title: myTitle,
          key: item[myKey],
        };
      });

    return (
      <div className={cls(style.container)}>
        <div className='search-box'>
          {
            get(header, 'left') ? header?.left :
              <Search style={!get(header, 'right') ? {marginBottom: 8} : {marginRight: 2, width: '80%'}}
                      placeholder="请输入查询" onChange={this.onChange}/>
          }
          {
            get(header, 'right') ? header?.right : null
          }
        </div>
        <Tree
          onExpand={this.onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          // treeData={loop(gData)}
          defaultExpandAll={true}
          // onSelect={onSelect}
          treeData={loop(dataSource)}
        />
      </div>
    );
  }
}

export default SearchTree;
