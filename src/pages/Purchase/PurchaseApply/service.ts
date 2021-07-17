import { request } from 'umi';
import {TableListItem, TableListParams} from "@/pages/MainData/Supplier/data";

export async function fakeSubmitForm(params: any) {
  return request('/api/advancedForm', {
    method: 'POST',
    data: params,
  });
}


export async function findByPage(params?: TableListParams) {
  return request('/api/supplier/findHeaderByPage', {
    method:'POST',
    data:params,
  });
}

export async function del(params: any) {
  return request('/api/supplier/deleteById', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

/**
 * 新增供应商
 * @param params
 */
export async function save(params: TableListItem) {
  return request('/api/supplier/save', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/**
 * 供应商详情
 * @param params
 */
export async function findOneById(params: {id:string}) {
  return request('/api/supplier/findOneById', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
