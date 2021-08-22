import request from '@/utils/request';

export const treeUrl = '/api/org/findTree';

export async function deleteById(params: { id: string }) {
  return request('/api/org/deleteById', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function save(params: object) {
  return request('/api/org/save', {
    method: 'POST',
    data: params,
  });
}
