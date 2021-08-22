import request from '@/utils/request';
import { TableListParams } from '@/pages/MainData/Supplier/data';

/**
 * 新增申请单
 * @param params
 */
export async function save(params: any) {
  return request('/api/purchase/save', {
    method: 'POST',
    data: params,
  });
}

/**
 * 采购申请分页查询
 * @param params
 */
export async function findByPage(params?: TableListParams) {
  return request('/api/purchase/findByPage', {
    method: 'POST',
    data: params,
  });
}

export async function findPurchaseItems(params: any) {
  return request('/api/purchase/findItems', {
    method: 'POST',
    data: JSON.parse(params),
  });
}

export async function del(params: any) {
  return request('/api/purchase/deleteById', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

/**
 * 供应商详情
 * @param params
 */
export async function findOneById(params: { id: string | null }) {
  return request('/api/purchase/findOneById', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
