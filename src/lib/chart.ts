import { IEChartOptionBitcoin } from "types/models/bitcoinHistory";

export const buildChartOptions = (
  type: string,
  xAxisData?: any[],
  seriesData?: any[],
  title?: string
) => {
  let option: IEChartOptionBitcoin;
  switch (type) {
    case "line":
      option = {
        title: {
          text: title || "",
        },
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
        title: {
          text: title || "",
        },
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
        title: {
          text: title || "",
        },
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
