import {message} from "antd";
import {get} from 'lodash';

export type MessageProps = {
  success: boolean,
  msg?: string,
  data: any
}

/**
 * 操作提醒
 * @param v
 */
const myMessage = (v: MessageProps): any => {
  if (get(v, 'success')) {
    message.success(get(v, 'msg', '成功！'), 3)
  } else {
    message.error(get(v, 'msg', '失败！'), 3)
  }
}

/**
 * 等待执行
 * @param time
 */
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export {
  myMessage,
  waitTime
}
