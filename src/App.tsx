import { useState, useEffect, useCallback } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { IFakeApiData } from "types/models/fakeApi";
import { useGetBitcoinHistoryData, useGetFakeApiData } from "./hooks";
import ReactEcharts from "echarts-for-react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, FirstDataRenderedEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import FormGroup from './components/Form'

const App = () => {
  const { bitcoinHistory } = useGetBitcoinHistoryData(
    {
      symbol: "BTCUSDT",
      interval: "1d",
      limit: 30,
    },
    "line"
  );

  const { bitcoinHistory: sixMonths } = useGetBitcoinHistoryData(
    {
      symbol: "BTCUSDT",
      interval: "1d",
      limit: 180,
    },
    "scatter"
  );

  const { data } = useGetFakeApiData();

  const [colDefs, setColDefs] = useState<ColDef<IFakeApiData>[]>(
    [] as ColDef<IFakeApiData>[]
  );

  const parseDataforGrid = () => {
    if (data.length) {
      const dataItem = data[0];
      const keys = Object.entries(dataItem).map(([key]) => ({
        field: key,
      }));
      setColDefs(keys as [] as ColDef<IFakeApiData>[]);
    }
  };

  const defaultColDef: ColDef = {
    flex: 1,
  };

  const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
    params.api.sizeColumnsToFit();
  }, []);

  useEffect(() => {
    parseDataforGrid();
    return () => {
      setColDefs([] as ColDef<IFakeApiData>[]);
    };
  }, [data]);

  return (
    <Container>
      <ReactEcharts lazyUpdate={true} option={bitcoinHistory} />
      <ReactEcharts lazyUpdate={true} option={sixMonths} />
      <div className="ag-theme-quartz-dark" style={{ height: "500px" }}>
        <AgGridReact<IFakeApiData>
          rowData={data}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          onFirstDataRendered={onFirstDataRendered}
        />
      </div>
      <FormGroup />
    </Container>
  );
};

export default App;
