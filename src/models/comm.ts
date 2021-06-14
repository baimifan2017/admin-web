// @ts-ignore
import {Reducer} from "@@/plugin-dva/connect";

export type commType = {
  state:any,
  reducers: {
    updateState: Reducer;
  };
};

const comm: commType = {
  // baseModel 必须配置state
  state:{},
  reducers: {
    updateState(state:any, {payload}:any) {
      return {
        ...state,
        payload,
      };
    },
  },
};


export default comm;
