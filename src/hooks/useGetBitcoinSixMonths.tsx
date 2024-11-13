import { useEffect, useState, useMemo } from "react";
import {
  TBitcoinHistoryList,
  IEChartOptionBitcoin,
} from "types/models/bitcoinHistory";
import { apiGet } from "../api/apiClient";
import moment from "moment";

const url =
  "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=180";

export const useGetBitcoinSixMonths = () => {
  const [bitcoinHistory, setBitcoinHistory] = useState<IEChartOptionBitcoin>(
    {} as IEChartOptionBitcoin
  );

  const loadHistory = useMemo(
    () => async () => {
      try {
        const response = await apiGet(url);
        const responseData: TBitcoinHistoryList = response.data;

        const dates = responseData.map((day) => {
          const dayDate = moment(day[0]).format("MM/DD/YYYY");
          return dayDate;
        });
        const closePrice = responseData.map((price) => {
          const priceData = price[5];
          return priceData;
        });
        const option = {
          xAxis: {
            type: "category",
            data: dates,
          },
          yAxis: {},
          series: [
            {
              name: "name",
              data: closePrice,
              type: "scatter",
            },
          ],
        };
        setBitcoinHistory(option);
      } catch (error) {
        console.error(error);
      }
    },
    [url]
  );

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  return {
    bitcoinHistory,
  };
};
