import { useEffect, useState, useMemo } from "react";
import { TFakeApiDataList, IFakeApiData } from "types/models/fakeApi";
import { apiGet } from "../api/apiClient";

const url =
  "https://fakerapi.it/api/v2/custom?_quantity=10&company=company_name&country=country&state=state&city=city&zipcode=postcode&employees=counter&revenue=number&website=website&sales_rep=first_name&last_contacted=date&purchased=boolean&notes=text";

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
