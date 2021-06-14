import {OptionsType} from "@ant-design/pro-table/es/components/ToolBar";
import {SearchProps} from "antd/es/input";
import {Key} from "react";

export type OptionConfig = {
  density?: boolean;
  fullScreen?: OptionsType;
  reload?: OptionsType;
  setting?: boolean;
  search?: (SearchProps & { name?: string }) | boolean;
};


export interface ActionType {
  reload: (resetPageIndex?: boolean) => void;
  reloadAndRest: () => void;
  reset: () => void;
  clearSelected?: () => void;
  startEditable: (rowKey: string | undefined) => boolean;
  cancelEditable: (rowKey: string | undefined) => boolean;
}
