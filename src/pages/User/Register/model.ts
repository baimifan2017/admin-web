// @ts-ignore
import { Effect, history } from 'umi';
import { message } from 'antd';
import { register } from './service';
import queryString, { StringifyOptions } from 'querystring';

export type RegisterModelType = {
  namespace: 'register';
  state: any;
  subscriptions: {};
  effects: {
    save: Effect;
    getDetail: Effect;
  };
};

const Register: RegisterModelType = {
  namespace: 'register',
  state: {
    status: undefined,
  },
  // subscriptions
  subscriptions: {
    setup({ dispatch, history }: any) {
      // 这里的方法名可以随便命名，当监听有变化的时候就会依次执行这的变化,这里的dispatch和history和之前说的是一样的
      // @ts-ignore
      const { id } = queryString(location.href);
      if (id) {
      }
    },
  },
  effects: {
    *save({ payload }: any, { put, select, call }: any) {
      const { success, msg } = yield call(register, payload);
      if (success) {
        message.success(msg, 500);
        history.replace('/user/login');
      } else {
        message.error(msg);
      }
    },
    *getDetail({ payload }, { call }) {
      // const { success, msg } = yield call(get);
    },
  },
};

export default Register;
