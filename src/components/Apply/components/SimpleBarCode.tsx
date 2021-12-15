import {Component} from 'react';
import * as Barcode from 'jsbarcode';


type BarcodeProps = {
  label?: string | undefined;
  displayValue?: boolean;
  labelClassName?: string;
  className?: string
}

/**
 * 简单生成条形码
 */
class SimpleBarCode extends Component<BarcodeProps> {
  componentDidMount() {
    this.createBarcode();
  }

  componentWillReceiveProps(nextProps: BarcodeProps) {
    if (this.props !== nextProps) {
      this.createBarcode();
    }
  }

  createBarcode = () => {
    // @ts-ignore
    if (!this.barcode) return;
    const {
      width = 1, height = 35, margin = 0, label, displayValue = true
    }: any = this.props;
    if (!label) {
      return;
    }
    // @ts-ignore
    Barcode(this.barcode, label, {
      displayValue, // 是否在下面显示具体文字
      width, // 线的宽度系数,1是正常,2是两倍,数越大越粗.
      height,// 条形码高度
      margin,
      // @ts-ignore
      fontSize:'14px'
    });
  };

  render() {
    const {labelClassName, label, className, displayValue = true} = this.props;
    return (
      <div className={className}>
        <svg
          ref={(ref) => {
            // @ts-ignore
            this.barcode = ref;
          }}
        />
        {displayValue ? null : <p className={labelClassName}>{label}</p>}
      </div>
    );
  }

}

export default SimpleBarCode;
