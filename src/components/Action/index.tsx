import {Popconfirm, Space} from "antd";
import {TableDropdown} from '@ant-design/pro-table';

interface itemObj {
  // 按钮名称
  name: string,
  powerCode?: string,
}

interface actionProps {
  onClick: (code: string | undefined, record: object) => void,
  itemArr: itemObj[],
  record: any,
}

export const Action = (props: actionProps):JSX.Element => {
  const renderItem = (record: any): any => {
    const {itemArr, onClick} = props;
    let itemLines: Element[] = [];
    if (itemArr.length >= 2) {
      itemArr.slice(0, 2).forEach(item => {
        if (item.powerCode === 'delete') {
          // @ts-ignore
          itemLines.push(<Popconfirm title="确定删除？"
                                     okText="确定"
                                     cancelText="取消"
                                     onConfirm={() => onClick(item.powerCode, record)}
          >
            <a key={item.powerCode} onClick={() => onClick(item.powerCode, record)}>{item.name}</a>
          </Popconfirm>)
        } else {
          // @ts-ignore
          itemLines.push(<a key={item.powerCode} onClick={() => onClick(item.powerCode, record)}>{item.name}</a>)
        }
      })
    }

    if (itemArr.length > 2) {
      let items: any = []
      itemArr.slice(2).forEach(item => {
        items.push({key: item.powerCode, name: item.name})
      })
      return [
        itemLines,
        <TableDropdown
          key="actionGroup"
          onSelect={(type) => onClick(type, record)}
          menus={items}
        />
      ]
    }

  }
  return <Space size="middle">
    {renderItem(props.record)}
  </Space>
}

