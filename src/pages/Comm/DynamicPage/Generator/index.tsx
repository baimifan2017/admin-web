/**
 * @description Schema 生成器
 */

import React from 'react';
import Generator from 'fr-generator';
import { Table, Search, withTable } from 'table-render';

const defaultValue = {
  type: 'object',
  properties: {
    inputName: {
      title: '简单输入框',
      type: 'string',
    },
  },
};

const Generator = () => {
  return (
    <div style={{ height: '80vh' }}>
      <Generator defaultValue={defaultValue} />
    </div>
  );
};

export default Generator;
