// @ts-ignore
import { Effect, history, Reducer } from 'umi';
import { save, deleteById } from './service';
import { myMessage } from '@/utils/myUtils';

export type OrgModelType = {
  namespace: 'dynamicPage';
  state: any;
  subscriptions: {};
  effects: {
    save: Effect;
    deleteById: Effect;
    findOneById: Effect;
  };
  reducers: {
    updateState: Reducer;
  };
};

const Org: OrgModelType = {
  namespace: 'dynamicPage',
  state: {
    entity: undefined,
    showBlank: true,
  },
  // subscriptions
  subscriptions: {
    setup({ dispatch, history }: any) {
      // 这里的方法名可以随便命名，当监听有变化的时候就会依次执行这的变化,这里的dispatch和history和之前说的是一样的

      const { query } = history?.location;
      // @ts-ignore
      if (query && query.id) {
        dispatch({
          type: 'fineById',
          payload: { id: query.id },
        });
      }
    },
  },
  effects: {
    *save({ payload, callback }: any, { put, select, call }: any) {
      const re = yield call(save, payload);
      const { success, data } = re;
      if (success) {
        yield put({
          type: 'org',
          payload: {
            entity: data,
          },
        });
      }
      myMessage(re);
      if (callback && callback instanceof Function) {
        callback(re);
      }
    },

    *deleteById({ payload, callback }: any, { put, select, call }: any) {
      const re = yield call(deleteById, payload);
      if (re.success) {
        yield put({
          type: 'org',
          payload: {
            entity: {},
          },
        });
      }
      myMessage(re);
      if (callback && callback instanceof Function) {
        callback(re);
      }
    },
    *findOneById({ payload }, { call }) {
      // const { success, msg } = yield call(get);
    },
  },

  reducers: {
    updateState(state: any, { payload }: any) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default Org;
