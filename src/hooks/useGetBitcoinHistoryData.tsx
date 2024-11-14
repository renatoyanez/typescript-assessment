import { useEffect, useState, useMemo } from "react";
import {
  TBitcoinHistoryList,
  IEChartOptionBitcoin,
} from "types/models/bitcoinHistory";
import { apiGet } from "../api/apiClient";
import moment from "moment";

const url2 =
  "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=30";

export const useGetBitcoinHistoryData = () => {
  const [bitcoinHistory, setBitcoinHistory] = useState<IEChartOptionBitcoin>(
    {} as IEChartOptionBitcoin
  );

  const loadHistory = useMemo(
    () => async () => {
      try {
        const response = await apiGet(url2);
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
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "name",
              data: closePrice,
              type: "line",
            },
          ],
        };
        setBitcoinHistory(option);
        localStorage.setItem("30dayBitcoin", JSON.stringify(option));
      } catch (error) {
        console.error(error);
      }
    },
    [localStorage]
  );

  useEffect(() => {
    const getStorage = JSON.parse(localStorage.getItem("30dayBitcoin") || "{}");
    
    if (Object.keys(getStorage).length === 0) {
      loadHistory();
    } else {
      setBitcoinHistory(getStorage)
    }
    return () => {
      setBitcoinHistory({} as IEChartOptionBitcoin)
    }
  }, [loadHistory]);

  return {
    bitcoinHistory,
  };
};
