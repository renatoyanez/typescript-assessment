import { useEffect, useState, useMemo } from "react";
import {
  TBitcoinHistoryList,
  IEChartOptionBitcoin,
} from "types/models/bitcoinHistory";
import { buildChartOptions } from "../lib/chart";
import { apiGet } from "../api/apiClient";
import moment from "moment";

const url = import.meta.env.VITE_API_BINANCE_URL;

export const useGetBitcoinHistoryData = (
  params?: Record<string, unknown>,
  typeOfChart?: string
) => {
  const [bitcoinHistory, setBitcoinHistory] = useState<IEChartOptionBitcoin>(
    {} as IEChartOptionBitcoin
  );

  const loadHistory = useMemo(
    () => async () => {
      try {
        const response = await apiGet(url, { params });
        const responseData: TBitcoinHistoryList = response.data;

        const dates = responseData.map((day) => {
          const dayDate = moment(day[0]).format("MM/DD/YYYY");
          return dayDate;
        });
        const closePrice = responseData.map((price) => {
          const priceData = price[5];
          return priceData;
        });
        const chartOptions = buildChartOptions(
          String(typeOfChart),
          dates,
          closePrice
        );
        setBitcoinHistory(chartOptions);
        // localStorage.setItem("30dayBitcoin", JSON.stringify(chartOptions));
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  useEffect(() => {
    // const getStorage = JSON.parse(localStorage.getItem("30dayBitcoin") || "{}");

    // if (Object.keys(getStorage).length === 0) {
    loadHistory();
    // } else {
    //   setBitcoinHistory(getStorage);
    // }
    return () => {
      setBitcoinHistory({} as IEChartOptionBitcoin);
    };
  }, [loadHistory]);

  return {
    bitcoinHistory,
  };
};
