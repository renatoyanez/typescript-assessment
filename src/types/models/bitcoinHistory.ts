export type TBitcoinHistoryModel = (string | number)[]

export type TBitcoinHistoryList = Array<TBitcoinHistoryModel>



export interface IEChartOptionBitcoin {
  xAxis: {
    type: string;
    data: any[],
  };
  yAxis: {
    type?: string,
  };
  series: {
    name?: string,
    data: any[],
    type: string,
  }[],
} 