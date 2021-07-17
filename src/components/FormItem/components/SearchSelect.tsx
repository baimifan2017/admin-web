import React from "react";
import {Pagination, Select} from 'antd';
import type {SelectProps} from 'antd/es'
import {get} from 'lodash';
import request from "@/utils/request";

const {Option} = Select;

type SearchInputProps = {
  style?: React.CSSProperties;
  placeholder?: string;
  valueKey?: string;
  textKey?: string;
  renderItem?: (v: object) => string
  showPagination?: boolean; // 是否显示分页信息
  store: {
    url: string
  }
}

class SearchInput extends React.Component<SearchInputProps & SelectProps<any>, any> {
  state = {
    data: [],
    value: undefined,
    searchParams: {}
  };

  componentDidMount() {
    this.handleSearch({
      current: 0,
      pageSize: 10,
    })
  }

  fetch = (params: any, callback: any) => {
    const {store} = this.props;
    request(get(store, 'url',), {
      method: 'POST',
      data: params
    }).then(r => {
      if (r.success) {
        callback(get(r, 'data', []))
      }
    })
  }

  handleSearch = (params: any) => {
    if (params) {
      const {searchParams} = this.state;
      const temParams = {
        ...searchParams,
        ...params
      }

      this.setState({
        searchParams: temParams
      }, () => {
        this.fetch(temParams, (data: any) => this.setState({data}));
      })
    } else {
      this.setState({data: []});
    }
  };

  handleChange = (value: any) => {
    this.setState({value});
  };

  _onShowSizeChange = (current: any, size: any) => {
    this.handleSearch({current: current, size: size})
  }

  _onChange = (pageNumber: any) => {
    this.handleSearch({current: pageNumber})
  }

  // @ts-ignore
  renderOptions = (data: object[]) => {
    const {valueKey, renderItem, textKey} = this.props;
    if (data && data.length > 0) {
      return data.map((d: object) => <Option key={get(d, `${valueKey}`, 'code')}
                                             value={get(d, 'valueKey')}>{
        renderItem ? renderItem(d)
          : get(d, `${textKey}`, d['name'])

      }</Option>);
    }
  }

  onSearch = (v: any) => {
    const {textKey = 'name'} = this.props;
    let searchParams = {};
    searchParams[`${textKey}`] = v;

    this.handleSearch({
      where: [searchParams]
    })
  };

  render() {
    const {data = []} = this.state;
    const {showArrow = true, showPagination = true} = this.props;
    // @ts-ignore
    let options = this.renderOptions(data) || [];

    return (
      <Select
        showSearch
        value={this.state.value}
        placeholder={this.props.placeholder}
        style={this.props.style}
        defaultActiveFirstOption={false}
        showArrow={showArrow}
        filterOption={false}
        onSearch={this.onSearch}
        onChange={this.handleChange}
        notFoundContent={null}
        dropdownRender={menu => (
          <div>
            {menu}
            <div style={{
              display: showPagination ? 'inlineBlock' : 'none',
              margin: '5px 0px',
              textAlign: 'center',
            }}>
              <Pagination simple defaultCurrent={1} total={50}
                          onShowSizeChange={this._onShowSizeChange}
                          onChange={this._onChange}/>
            </div>
          </div>
        )}
      >
        {options}
      </Select>
    );
  }
}


export default SearchInput
