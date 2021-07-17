import {OptionsType} from "@ant-design/pro-table/es/components/ToolBar";
import {SearchProps} from "antd/es/input";

export type OptionConfig = {
  density?: boolean;
  fullScreen?: OptionsType;
  reload?: OptionsType;
  setting?: boolean;
  search?: (SearchProps & { name?: string }) | boolean;
};

// 审批流状态
export type ApproveStatus = {
  status?: 'init' | 'process' | 'completed';
}

export interface ActionType {
  reload: (resetPageIndex?: boolean) => void;
  reloadAndRest: () => void;
  reset: () => void;
  clearSelected?: () => void;
  startEditable: (rowKey: string | undefined) => boolean;
  cancelEditable: (rowKey: string | undefined) => boolean;
}
