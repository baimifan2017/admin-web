export type TableListItem = {
  id?: any,
  key: number;
  disabled?: boolean;
  name: string;
  code: string;
  tel: string;
  email: string;
  frozen?:boolean;
  address?: string;
  socialCreditCode: string;
  linkName?: string;
  bankAccountNumber?: number;
  bankAccountName?: string;
  updatedAt: Date;
  createdAt: Date;
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
