import request from '@/utils/request';

export async function queryRule(params?: any) {
  return request('/api/rule', {
    params,
  });
}

export async function del(params: { key: number[] }) {
  return request('/api/user/deleteById', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function register(params:object) {
  return request('/api/user/register', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
