import request from '@/utils/request';

export type LoginParamsType = {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
};

export type LoginParams = {
  name: string;
  password: string;
  autoLogin: boolean;
  type: string;
}

export async function userLogin(params: LoginParams) {
  return request('/api/user/login', {
    method: 'POST',
    data: {
      ...params
    },
  });
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/user/login', {
    method: 'POST',
    data: params,
  });
}


export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
