import {stringify} from 'querystring';
import type {Effect, Reducer} from 'umi';
import {history} from 'umi';

import {userLogin} from '@/services/login';
import {setAuthority} from '@/utils/authority';
import {getPageQuery} from '@/utils/utils';
import {message} from 'antd';
import {waitTime} from '@/utils/myUtils';

export type StateType = {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
};

export type LoginResponse = {
  token: string;
  user: object;
};
export type LoginModelType = {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
};

const setGlobalInfo = (data: LoginResponse) => {
  sessionStorage.setItem('token', data.token);
  // @ts-ignore
  global.token = data.token;
  // @ts-ignore
  global.user = data.user;
};

const clearGlobalInfo = () => {
  sessionStorage.clear();
  // @ts-ignore
  global.token = undefined;
  // @ts-ignore
  global.user = undefined;
};

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    login: function* ({payload}, {call, put}) {
      const response = yield call(userLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.success) {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();

        message.success('🎉 🎉 🎉  登录成功！');
        waitTime(100).then(() => {
          let {redirect} = params as { redirect: string };
          if (redirect) {
            const redirectUrlParams = new URL(redirect);
            if (redirectUrlParams.origin === urlParams.origin) {
              redirect = redirect.substr(urlParams.origin.length);
              if (window.routerBase !== '/') {
                redirect = redirect.replace(window.routerBase, '/');
              }
              if (redirect.match(/^\/.*#/)) {
                redirect = redirect.substr(redirect.indexOf('#') + 1);
              }
            } else {
              window.location.href = '/';
              return;
            }
          }
          history.replace(redirect || '/');
          setGlobalInfo(response.data);
        });
      } else {
        message.error(response.msg);
      }
    },

    logout() {
      const {redirect} = getPageQuery();
      // Note: There may be security issues, please note
      clearGlobalInfo();
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(state, {payload}) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};

export default Model;
