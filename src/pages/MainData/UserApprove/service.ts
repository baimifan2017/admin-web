import request from "@/utils/request";

export const findByPageUrl = '/api/user/findByPage';


export async function findByPage(params:any) {
  return request('/api/user/findByPage', {
    method: 'POST',
    data: params,
  });
}


export async function del(record:any) {
  return request('/api/user/deleteById', {
    method: 'DELETE',
    data: record,
  });
}
