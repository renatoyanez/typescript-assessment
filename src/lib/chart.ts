import { IEChartOptionBitcoin } from "types/models/bitcoinHistory";

export const buildChartOptions = (
  type: string,
  xAxisData?: any[],
  seriesData?: any[]
) => {
  let option: IEChartOptionBitcoin;
  switch (type) {
    case "line":
      option = {
        xAxis: {
          type: "category",
          data: xAxisData || [],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "name",
            data: seriesData || [],
            type: type,
          },
        ],
      };
      return option;
    case "scatter":
      option = {
        xAxis: {
          type: "category",
          data: xAxisData || [],
        },
        yAxis: {},
        series: [
          {
            name: "name",
            data: seriesData || [],
            type: type,
          },
        ],
      };
      return option;

    default:
      option = {
        xAxis: {
          type: "category",
          data: xAxisData || [],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "name",
            data: seriesData || [],
            type: "line",
          },
        ],
      };
      return option;
  }
};
