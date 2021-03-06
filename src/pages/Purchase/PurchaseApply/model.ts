import type { Effect } from 'umi';
import { message } from 'antd';
import { fakeSubmitForm } from './service';

export type ModelType = {
  namespace: string;
  state: {};
  effects: {
    submitAdvancedForm: Effect;
  };
};

const Model: ModelType = {
  namespace: 'purchase',

  state: {},

  effects: {
    *submitAdvancedForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('ζδΊ€ζε');
    },
  },
};

export default Model;
