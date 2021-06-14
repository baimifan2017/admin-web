/**
 *@author:lzh
 *@describe:
 *@time:
 */
// @ts-ignore
import modelExtend from 'dva-model-extend'
import comm from '../../../models/comm'
import {del} from './service';
// @ts-ignore
import type {Effect} from "umi";

export type UserModelType = {
  namespace: string;
  state: any,
  effects: {
    del: Effect;
  };
};

const User: UserModelType = modelExtend(comm, {
  namespace: 'userDetail',
  state: {
    status: undefined,
  },
  effects: {
    * del({payload, callback}: any, {put, select, call}: any) {
      // @ts-ignore
      const re = yield call(del, payload);
      console.log(re)
      debugger
      if (callback && callback instanceof Function) {
        callback(re)
      }
    }
  },
});

export default User;
