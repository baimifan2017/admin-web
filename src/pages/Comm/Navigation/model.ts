// @ts-ignore
import {Effect, history, Reducer} from 'umi';
import {deleteById, delPowerBtn, findOneById, save, savePower} from './service';
import {myMessage} from "@/utils/myUtils";
import {get, omit} from 'lodash';


export type NavigationModelType = {
  namespace: string;
  state: {
    entity: any,
    powerBtnArr: any[]
  };
  subscriptions: {};
  effects: {
    save: Effect;
    deleteById: Effect,
    findOneById: Effect;
    savePower: Effect;
    delPowerBtn: Effect;
  };
  reducers: {
    updateState: Reducer,
  }
};

const Navigation: NavigationModelType = {
  namespace: 'navigation',
  state: {
    entity: {},
    powerBtnArr: [],
  },
  // subscriptions
  subscriptions: {
    setup({dispatch, history}: any) {
      // 这里的方法名可以随便命名，当监听有变化的时候就会依次执行这的变化,这里的dispatch和history和之前说的是一样的

      const {query} = history?.location;
      // @ts-ignore
      if (query && query.id) {
        dispatch({
          type: 'fineById',
          payload: {id: query.id}
        })
      }
    },
  },

  effects: {
    * save({payload, callback}: any, {put, select, call}: any) {
      const re = yield call(save, payload);
      const {success, data} = re;
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            entity: omit(data, 'powerBtn')
          }
        })
      }
      myMessage(re);
      if (callback && callback instanceof Function) {
        callback(re)
      }
    },

    * savePower({payload, callback}: any, {put, select, call}: any) {
      // @ts-ignore
      const re = yield call(savePower, payload);
      if (re.success) {
        const {entity} = yield select((_: {
          navigation: any
        }) => _.navigation)
        yield put({
          type: 'findOneById',
          payload: {id: entity.id}
        })
      }
      myMessage(re);
      if (callback && callback instanceof Function) {
        callback(re)
      }
    },

    * delPowerBtn({payload, callback}: any, {put, select, call}: any) {
      const re = yield call(delPowerBtn, payload);
      const {entity} = yield select((_: {
        navigation: any
      }) => _.navigation)
      if (re.success) {
        yield put({
          type: 'findOneById',
          payload: {id: entity.id}
        })
      }
      myMessage(re);
      if (callback && callback instanceof Function) {
        callback(re)
      }
    },

    * deleteById({payload, callback}: any, {put, select, call}: any) {
      const re = yield call(deleteById, payload);
      if (re.success) {
        yield put({
          type: 'updateState',
          payload: {
            entity: {}
          }
        })
      }
      myMessage(re);
      if (callback && callback instanceof Function) {
        callback(re)
      }
    },

    * findOneById({payload, callback}, {call, put}) {
      const re = yield call(findOneById, payload);
      if (re && re.success) {
        yield put({
          type: 'updateState',
          payload: {
            entity: re.data,
            powerBtnArr: get(re.data, 'powerBtn'),
            showBlank: false,
          }
        })
      }
      if (callback && callback instanceof Function) {
        callback(re)
      }
    },
  },

  reducers: {
    updateState(state: any, {payload}: any) {
      return {
        ...state,
        ...payload,
      };
    },
  }
};

export default Navigation;
