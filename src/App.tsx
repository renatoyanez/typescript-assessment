import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { TFakeApiDataList } from "types/models/fakeApi";
import { apiGet } from "./api/apiClient";
import { useGetBitcoinHistoryData, useGetBitcoinSixMonths } from "./hooks";
import ReactEcharts from "echarts-for-react";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import "./App.css";

const url =
  "https://fakerapi.it/api/v2/custom?_quantity=10&company=company_name&country=country&state=state&city=city&zipcode=postcode&employees=counter&revenue=number&website=website&sales_rep=first_name&last_contacted=date&purchased=boolean&notes=text";

const App = () => {
  const { bitcoinHistory } = useGetBitcoinHistoryData();
  const { bitcoinHistory: sixMonths } = useGetBitcoinSixMonths();

  const [data, setData] = useState<TFakeApiDataList | undefined>();
  console.log({ sixMonths });

  const fetchData = async () => {
    try {
      const response = await apiGet(url);
      const responseData: TFakeApiDataList = response.data.data;
      setData(responseData);
    } catch (error) {
      console.log(error);
    }
  };
  //VAS POR EL PUNTO 4

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  return (
    <Container>
      <ReactEcharts lazyUpdate={true} option={bitcoinHistory} />
      <ReactEcharts lazyUpdate={true} option={sixMonths} />
    </Container>
  );
};

export default App;
