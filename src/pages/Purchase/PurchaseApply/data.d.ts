import {ApproveStatus} from "@/utils/commTypes";
import {column_status} from "@/utils/commColumn";

export type TableListItem = {
  id?: string,
  applyId?: any,
  key: number;
  name: string;
  applyNo: string;
  applicantId: string;
  applicantName: string;
  frozen?: boolean;
  orgId?: string;
  specification?: string;
  amount: number;
  supplier?: string;
  column_status?: ApproveStatus;
  updatedAt: Date;
  createdAt: Date;
  createBy?: string;
  approveRes?: string;
};

export type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type TableListData = {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
};

export type TableListParams = {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
