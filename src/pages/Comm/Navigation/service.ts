import request from '@/utils/request';

export const treeUrl = '/api/navigation/findAll'

export async function deleteById(params: { id: string }) {
  return request('/api/navigation/deleteById', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function save(params: object) {
  return request('/api/navigation/save', {
    method: 'POST',
    data: params,
  });
}
