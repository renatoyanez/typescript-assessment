import { useEffect, useState, useMemo } from "react";
import { TFakeApiDataList, IFakeApiData } from "types/models/fakeApi";
import { apiGet } from "../api/apiClient";

const url = import.meta.env.VITE_FAKE_API_BASE_URL;

export const useGetFakeApiData = () => {
  const [data, setData] = useState<IFakeApiData[]>([] as IFakeApiData[]);

  const loadData = useMemo(
    () => async () => {
      try {
        const response = await apiGet(url);
        const responseData: TFakeApiDataList = response.data.data;
        setData(responseData);
        localStorage.setItem("fakeApiData", JSON.stringify(responseData));
      } catch (error) {
        console.log(error);
      }
    },
    [localStorage]
  );

  useEffect(() => {
    const getStorage = JSON.parse(localStorage.getItem("fakeApiData") || "{}");
    if (Object.keys(getStorage).length === 0) {
      loadData();
    } else {
      console.log("no lo hace");
      setData(getStorage);
    }
    loadData();
  }, [loadData]);

  return {
    data,
  };
};
