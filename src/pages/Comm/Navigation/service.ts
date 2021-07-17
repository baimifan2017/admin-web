import request from '@/utils/request';

export const treeUrl = '/api/navigation/findTree'

export const findOneByIdUrl = '/api/navigation/findOneById'


export async function deleteById(data: { id: string }) {
  return request('/api/navigation/deleteById', {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    data
  });
}

export async function save(params: object) {
  return request('/api/navigation/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/**
 * 更新权限按钮
 * @param params
 */
export async function savePower(params: object) {
  return request('/api/navigation/savePowerBtn', {
    method: 'POST',
    data: params,
  });
}

/**
 * 删除权限按钮
 * @param params
 */
export async function delPowerBtn(params: object) {
  return request('/api/navigation/delPowerBtn', {
    method: 'delete',
    data: params,
  });
}


export async function findOneById(params: object) {
  return request('/api/navigation/findOneById', {
    method: 'GET',
    params,
  });
}
